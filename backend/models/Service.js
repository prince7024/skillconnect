import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    avgRating: { type: Number, default: null },
    ratingsCount: { type: Number, default: 0 },
    address: { // new
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
