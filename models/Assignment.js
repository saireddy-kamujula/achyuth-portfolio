const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema(
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
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    maxPoints: {
      type: Number,
      required: true,
      default: 100,
    },
    instructions: {
      type: String,
      required: true,
    },
    attachments: [
      {
        filename: String,
        url: String,
      },
    ],
    submissions: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        submittedAt: {
          type: Date,
          default: Date.now,
        },
        content: String,
        attachments: [
          {
            filename: String,
            url: String,
          },
        ],
        grade: {
          points: Number,
          feedback: String,
          gradedAt: Date,
          gradedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        },
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Assignment", assignmentSchema)
