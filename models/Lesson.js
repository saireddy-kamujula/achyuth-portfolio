const mongoose = require("mongoose")

const lessonSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    resources: [
      {
        title: String,
        url: String,
        type: {
          type: String,
          enum: ["pdf", "video", "link", "image"],
        },
      },
    ],
    quiz: {
      questions: [
        {
          question: String,
          options: [String],
          correctAnswer: Number,
          explanation: String,
        },
      ],
      passingScore: {
        type: Number,
        default: 70,
      },
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Lesson", lessonSchema)
