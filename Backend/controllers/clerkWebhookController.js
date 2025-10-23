// controllers/clerkWebhookController.js
import userModel from "../models/userModel.js";

/**
 * Extract usable fields safely from Clerk user object.
 */
function parseClerkUser(payload) {
  const clerkId = payload?.id || "";
  let email = "";
  if (Array.isArray(payload?.email_addresses) && payload.email_addresses.length) {
    const primary = payload.email_addresses.find((e) => e.primary) || payload.email_addresses[0];
    email = primary?.email || "";
  }
  email = email || payload?.email || "";

  const firstName = payload?.first_name || "";
  const lastName = payload?.last_name || "";
  const name = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : (payload?.full_name || payload?.name || "Unnamed User");

  const image = payload?.profile_image_url || payload?.profile_image || payload?.image_url || "";

  return { clerkId, email, name, image };
}

export const handleClerkWebhook = async (req, res) => {
  try {
    const evt = req.clerkEvent;
    if (!evt) return res.status(400).json({ success: false, message: "Missing verified event" });

    const eventType = evt.type; // e.g. "user.created"
    const data = evt.data; // Clerk user object
    if (!eventType.startsWith("user.")) {
      return res.status(200).json({ success: true, message: "Ignored non-user event" });
    }

    const { clerkId, email, name, image } = parseClerkUser(data);

    // find by clerkId first; fallback to email to merge legacy users
    let existing = null;
    if (clerkId) existing = await userModel.findOne({ clerkId });
    if (!existing && email) existing = await userModel.findOne({ email });

    if (eventType === "user.created") {
      if (existing) {
        existing.clerkId = clerkId || existing.clerkId;
        existing.name = name || existing.name;
        existing.image = image || existing.image;
        existing.deleted = false;
        await existing.save();
        return res.status(200).json({ success: true, message: "Merged existing user and attached clerkId" });
      }

      const newUser = new userModel({
        clerkId,
        name,
        email: email || `no-email-${clerkId}@noemail.local`,
        image,
      });
      await newUser.save();
      return res.status(201).json({ success: true, message: "User created in Mongo" });
    }

    if (eventType === "user.updated") {
      if (!existing) {
        // Upsert if not found
        const upsertDoc = { clerkId, name, email: email || `no-email-${clerkId}@noemail.local`, image, deleted: false };
        await userModel.findOneAndUpdate({ clerkId }, upsertDoc, { upsert: true, new: true, setDefaultsOnInsert: true });
        return res.status(200).json({ success: true, message: "Upserted user" });
      }
      existing.name = name || existing.name;
      existing.email = email || existing.email;
      existing.image = image || existing.image;
      existing.deleted = false;
      await existing.save();
      return res.status(200).json({ success: true, message: "User updated" });
    }

    if (eventType === "user.deleted") {
      if (!existing) return res.status(200).json({ success: true, message: "No user to delete" });

      // Soft delete (recommended). If you want hard delete, replace with deleteOne.
      existing.deleted = true;
      await existing.save();
      return res.status(200).json({ success: true, message: "User marked deleted" });
    }

    return res.status(200).json({ success: true, message: "Event ignored" });
  } catch (err) {
    console.error("clerk webhook handler error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
