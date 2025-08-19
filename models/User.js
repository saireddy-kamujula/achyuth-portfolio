const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin", "parent"],
      default: "student",
    },
    grade: {
      type: String,
      enum: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      required: function () {
        return this.role === "student"
      },
    },
    dateOfBirth: {
      type: Date,
      required: function () {
        return this.role === "student"
      },
    },
    parentEmail: {
      type: String,
      required: function () {
        return this.role === "student"
      },
    },
    subjects: [
      {
        type: String,
        required: function () {
          return this.role === "teacher"
        },
      },
    ],
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    avatar: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Get full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

module.exports = mongoose.model("User", userSchema)
