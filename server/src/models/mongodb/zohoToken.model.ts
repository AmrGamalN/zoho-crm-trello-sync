import mongoose from "mongoose";
const zohoTokenSchema = new mongoose.Schema({
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  expires_in: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

export const ZohoToken = mongoose.model("ZohoToken", zohoTokenSchema);
