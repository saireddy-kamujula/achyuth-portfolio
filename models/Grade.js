const mongoose = require("mongoose")

const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
    type: {
      type: String,
      enum: ["assignment", "quiz", "exam", "participation"],
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    maxPoints: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    letterGrade: {
      type: String,
      enum: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"],
    },
    feedback: {
      type: String,
    },
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Calculate letter grade based on percentage
gradeSchema.pre("save", function (next) {
  this.percentage = (this.points / this.maxPoints) * 100

  if (this.percentage >= 97) this.letterGrade = "A+"
  else if (this.percentage >= 93) this.letterGrade = "A"
  else if (this.percentage >= 90) this.letterGrade = "A-"
  else if (this.percentage >= 87) this.letterGrade = "B+"
  else if (this.percentage >= 83) this.letterGrade = "B"
  else if (this.percentage >= 80) this.letterGrade = "B-"
  else if (this.percentage >= 77) this.letterGrade = "C+"
  else if (this.percentage >= 73) this.letterGrade = "C"
  else if (this.percentage >= 70) this.letterGrade = "C-"
  else if (this.percentage >= 67) this.letterGrade = "D+"
  else if (this.percentage >= 60) this.letterGrade = "D"
  else this.letterGrade = "F"

  next()
})

module.exports = mongoose.model("Grade", gradeSchema)
