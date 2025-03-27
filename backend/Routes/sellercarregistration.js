import express from "express";
import {
  createCarRegistration,
  deleteCarRegistration,
  getCarRegistration,
  getCarRegistrationAll,
} from "../Controllers/sellercarregistration.js";
import ensureAuthenticated from "../Middlewares/Auth.js";

const router = express.Router();
router.get("/carslookbook", ensureAuthenticated, getCarRegistration);
router.post("/register", ensureAuthenticated, createCarRegistration);
router.delete("/:id", deleteCarRegistration);
router.get("/all", getCarRegistrationAll);

export default router;
