import express from "express";
import {
  createBooking,
  getUserBookings,
  getProviderBookings,
  acceptBooking,
  rejectBooking,
  completeBooking,
  cancelBooking,
} from "../controllers/bookingController.js";
import { protect, restrictTo } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createBooking); // user creates booking
router.get("/user", protect, getUserBookings);
router.get("/provider", protect, restrictTo("provider"), getProviderBookings);
router.put("/:id/accept", protect, restrictTo("provider"), acceptBooking);
router.put("/:id/reject", protect, restrictTo("provider"), rejectBooking);
router.put("/:id/complete", protect, restrictTo("provider"), completeBooking);
router.put("/:id/cancel", protect, cancelBooking);

export default router;
