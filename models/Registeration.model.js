import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  status: {
    type: String,
    enum: ["registered", "attended"],
    default: "registered"
  },

  ticketId: {
    type: String,
    unique: true
  },

  qrCode: {
    type: String
  }

}, { timestamps: true });

registrationSchema.index({ user: 1, event: 1 }, { unique: true });
 const Registration = mongoose.model("Registration", registrationSchema);

 export default Registration