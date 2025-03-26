const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The user providing the service
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true, // Indicates if the service is currently available
    },
    availabilityDates: {
      type: [Date], // Array of dates when the service is available
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);