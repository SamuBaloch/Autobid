import express from "express";
import { acceptBid, getAcceptedBids, placeBid } from "../Controllers/Bid.js";
import ensureAuthenticated from "../Middlewares/Auth.js";
const router = express.Router();

// POST request to place a bid
router.post("/placebid", ensureAuthenticated, placeBid);
router.put("/acceptbid", ensureAuthenticated, acceptBid);
router.get("/accepted", ensureAuthenticated, getAcceptedBids);

export default router; // Use export default for ES module syntax
