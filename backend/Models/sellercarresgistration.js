import mongoose from "mongoose";

const sellercarregistrationStructure = mongoose.Schema({
  email: String,
  phoneno: Number,
  address: String,
  city: String,
  province: String,
  postalcode: String,
  nameofoffering: String,
  estimatedvalue: String,
  brand: String,
  make: String,
  model: String,
  variant: String,
  chassisNumber: String,
  color: String,
  imageUrl: String,
  numberplate: String,
  detaildescription: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    },
  ],
  status: { type: String, default: "available" },
  biddingDuration: { type: Number, required: true }, // Bidding duration in hours
  biddingEndTime: { type: Date }, // Auction end time
  highestBid: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" }, // Reference to the highest bid
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the winning user
});

const sellercarregistrationModel = mongoose.model(
  "CarInformation",
  sellercarregistrationStructure
);

export default sellercarregistrationModel;
