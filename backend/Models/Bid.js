import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  carid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CarInformation",
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: Number,
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Accepted", "Rejected", "Pending"],
    default: "Pending",
  },
});

const Bid = mongoose.model("Bid", bidSchema);
export default Bid;
