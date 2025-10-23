// models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, index: true, unique: true, sparse: true }, // Clerk user id (when synced)
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: {
    type: String,
    default:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAACXBIWXMAABCcAAAQnAEmzTo0..."
  },
  address: { type: Object, default: { line1: "", line2: "" } },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
  phone: { type: String, default: "0000000000" },
  deleted: { type: Boolean, default: false }, // recommended soft-delete
}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
