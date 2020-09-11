const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter an exercise type"
        },
        name: {
          type: String,
          trim: true,
          required: "Enter an exercise name"
        },
        duration: {
          type: Number,
          required: "Enter a duration for the cardio or resistance exercise, in minutes"
        },
        distance: {
          type: Number,
        },
        weight: {
          type: Number,
        },
        sets: {
          type: Number
        },
        reps: {
          type: Number
        }
      }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;