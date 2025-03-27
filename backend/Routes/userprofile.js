import express from "express";
import ensureAuthenticated from "../Middlewares/Auth.js";
import { deleteUserProfile, getUserProfile, updateUserPassword, updateUserProfile } from "../Controllers/userprofile.js";

const router = express.Router();

router.get("/", ensureAuthenticated,getUserProfile);
router.put("/", ensureAuthenticated,updateUserProfile);
router.delete("/", ensureAuthenticated,deleteUserProfile);
router.put("/", ensureAuthenticated,updateUserPassword);

export default router;