const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      enum: [
        "Mathematics",
        "Science",
        "English",
        "History",
        "Geography",
        "Art",
        "Music",
        "Physical Education",
        "Computer Science",
      ],
    },
    grade: {
      type: String,
      required: true,
      enum: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    assignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    thumbnail: {
      type: String,
      default: "",
    },
    duration: {
      type: Number, // in weeks
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Virtual for enrolled students count
courseSchema.virtual("enrollmentCount").get(function () {
  return this.enrolledStudents.length
})

module.exports = mongoose.model("Course", courseSchema)
