import express from "express";
import { uploadProfilePhoto } from "../controllers/userController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/uploadProfilePhoto",
  protect,
  upload.single("image"), 
  uploadProfilePhoto
);

export default router;
