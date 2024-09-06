const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true, unique: true },
    airline: { type: String, required: true },
    departure: {
      airport: { type: String, required: true },
      city: { type: String, required: true },
      dateTime: { type: Date, required: true },
    },
    flightType: { type: ObjectId, ref: "flightType", required: true },
    arrival: {
      airport: { type: String, required: true }, // e.g., 'LAX'
      city: { type: String, required: true }, // e.g., 'Los Angeles'
      dateTime: { type: Date, required: true },
    },
    duration: { type: Number, required: true }, // in minutes
    price: {
      economy: { type: Number, required: true },
      business: { type: Number, required: true },
    },
    availableSeats: {
      economy: { type: Number, required: true },
      business: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ["scheduled", "canceled", "delayed"],
      default: "scheduled",
      required: true,
    },

    category: { type: ObjectId, ref: "Category", required: true },
  },
  {
    timestamps: true,
  }
);

// Create a text index on the 'title' and 'description' fields
ProductSchema.index({ title: 'text', description: 'text' });

module.exports = {
  ProductModel: mongoose.model("Product", ProductSchema),
};
