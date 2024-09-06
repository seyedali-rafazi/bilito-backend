const { default: mongoose } = require("mongoose");

const FlightTypeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    englishTitle: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["product", "comment", "post", "ticket", "flightType"],
      default: "flightType",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

FlightTypeSchema.index({ title: "text", englishTitle: "text" });

module.exports = {
  FlightTypeSchemaModel: mongoose.model("flightType", FlightTypeSchema),
};
