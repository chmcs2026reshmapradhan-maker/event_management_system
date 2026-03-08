import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventTitle: {
      type: String,
      required: true,
      trim: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    eventLocation: {
      type: String,
      required: true,
    },

    eventCategory: {
      type: String,
      required: true,
    },

    organizerName: {
      type: String,
      required: true,
    },

    eventStatus: {
      type: String,
      enum: ["Upcoming", "Completed", "Cancelled", "Ongoing"],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", eventSchema);