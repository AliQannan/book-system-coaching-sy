// routes/clerkWebhookRoute.js
import express from "express";
import rawBody from "body-parser";
import { Webhook } from "svix";
import { handleClerkWebhook } from "../controllers/clerkWebhookController.js";

const router = express.Router();

router.post(
  "/clerk/webhook",
  rawBody.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const payload = req.body; // Buffer
      const headers = req.headers;

      const svixSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
      if (!svixSecret) {
        console.error("Missing CLERK_WEBHOOK_SIGNING_SECRET env");
        return res.status(500).send("Webhook signing secret not configured");
      }

      const wh = new Webhook(svixSecret);
      const svixHeaders = {
        "svix-id": headers["svix-id"],
        "svix-timestamp": headers["svix-timestamp"],
        "svix-signature": headers["svix-signature"] || headers["svix-signature-1"],
      };

      let evt;
      try {
        evt = wh.verify(payload, svixHeaders); // throws if invalid
      } catch (err) {
        console.error("Svix verification failed:", err?.message || err);
        return res.status(400).send("Invalid webhook signature");
      }

      // attach verified event for controller
      req.clerkEvent = evt; // evt.type, evt.data ...
      return handleClerkWebhook(req, res);
    } catch (err) {
      console.error("Webhook route error:", err);
      return res.status(500).send("Webhook processing error");
    }
  }
);

export default router;
