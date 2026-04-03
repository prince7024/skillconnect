import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import mongoose from "mongoose";

export const createReview = async (req, res, next) => {
  try {
    const { bookingId, rating, comment } = req.body;

    if (!bookingId || !rating) {
      return res.status(400).json({ message: "bookingId and rating required" });
    }

   
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not your booking" });
    if (booking.status !== "completed")
      return res.status(400).json({ message: "Only completed bookings can be reviewed" });
    if (booking.reviewed)
      return res.status(400).json({ message: "Already reviewed" });

    // Create review
    const review = await Review.create({
      service: booking.service,
      booking: booking._id,
      user: req.user._id,
      rating,
      comment,
    });

    // Mark booking as reviewed
    booking.reviewed = true;
    await booking.save();

    const agg = await Review.aggregate([
      { $match: { service: new mongoose.Types.ObjectId(booking.service) } },
      {
        $group: {
          _id: "$service",
          avgRating: { $avg: "$rating" },
          ratingsCount: { $sum: 1 },
        },
      },
    ]);

    let serviceStats = { avgRating: null, ratingsCount: 0 };
    if (agg.length) {
      serviceStats = { avgRating: agg[0].avgRating, ratingsCount: agg[0].ratingsCount };
      await Service.findByIdAndUpdate(booking.service, serviceStats);
    }

    res.status(201).json({
      review,
      updatedBooking: booking,
      serviceStats,
    });

  } catch (err) {
    next(err);
  }
};

export const getServiceReviews = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const reviews = await Review.find({ service: serviceId }).populate(
      "user",
      "name"
    );
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};
