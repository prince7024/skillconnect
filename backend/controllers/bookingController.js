import Booking from "../models/Booking.js";
import Service from "../models/Service.js";

// Create Booking
export const createBooking = async (req, res, next) => {
  try {
    const { serviceId, address } = req.body;
    if (!serviceId || !address) {
      return res.status(400).json({ message: "serviceId and address are required" });
    }

    const svc = await Service.findById(serviceId);
    if (!svc) {
      return res.status(404).json({ message: "Service not found" });
    }

    const booking = await Booking.create({
      service: svc._id,
      user: req.user._id,
      provider: svc.provider,
      address,
      price: svc.price,
    });

    const populatedBooking = await booking.populate("service provider", "title name email");

    res.status(201).json(populatedBooking);
  } catch (err) {
    next(err);
  }
};

// Get bookings for a user
export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("service provider", "title name email");
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// Get bookings for a provider
export const getProviderBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ provider: req.user._id })
      .populate("service user", "title name email");
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// Accept Booking
export const acceptBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not the provider of this booking" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Only pending bookings can be accepted" });
    }

    booking.status = "accepted";
    await booking.save();
    res.json(await booking.populate("service user", "title name email"));
  } catch (err) {
    next(err);
  }
};

// Reject Booking
export const rejectBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not the provider of this booking" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Only pending bookings can be rejected" });
    }

    booking.status = "rejected";
    await booking.save();
    res.json(await booking.populate("service user", "title name email"));
  } catch (err) {
    next(err);
  }
};

// Complete Booking
export const completeBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not the provider of this booking" });
    }

    if (booking.status !== "accepted") {
      return res.status(400).json({ message: "Only accepted bookings can be completed" });
    }

    booking.status = "completed";
    await booking.save();
    res.json(await booking.populate("service user", "title name email"));
  } catch (err) {
    next(err);
  }
};

// Cancel Booking
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only cancel your own bookings" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Only pending bookings can be cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();
    res.json(await booking.populate("service provider", "title name email"));
  } catch (err) {
    next(err);
  }
};
