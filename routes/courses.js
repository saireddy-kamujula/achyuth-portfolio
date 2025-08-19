const express = require("express")
const { body, validationResult } = require("express-validator")
const Course = require("../models/Course")
const User = require("../models/User")
const { auth, authorize } = require("../middleware/auth")

const router = express.Router()

// Get all courses
router.get("/", auth, async (req, res) => {
  try {
    const { grade, subject, search } = req.query
    const query = { isActive: true }

    if (grade) query.grade = grade
    if (subject) query.subject = subject
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    const courses = await Course.find(query).populate("teacher", "firstName lastName").sort({ createdAt: -1 })

    res.json(courses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get course by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("teacher", "firstName lastName email")
      .populate("lessons", "title description order duration")
      .populate("assignments", "title description dueDate maxPoints")
      .populate("enrolledStudents", "firstName lastName email")

    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    res.json(course)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create course (teachers and admins only)
router.post(
  "/",
  [
    auth,
    authorize("teacher", "admin"),
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("subject").notEmpty().withMessage("Subject is required"),
    body("grade").notEmpty().withMessage("Grade is required"),
    body("duration").isNumeric().withMessage("Duration must be a number"),
    body("startDate").isISO8601().withMessage("Valid start date is required"),
    body("endDate").isISO8601().withMessage("Valid end date is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const courseData = {
        ...req.body,
        teacher: req.user._id,
      }

      const course = new Course(courseData)
      await course.save()

      const populatedCourse = await Course.findById(course._id).populate("teacher", "firstName lastName")

      res.status(201).json({
        message: "Course created successfully",
        course: populatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Enroll in course
router.post("/:id/enroll", auth, authorize("student"), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Check if student is already enrolled
    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ message: "Already enrolled in this course" })
    }

    // Add student to course
    course.enrolledStudents.push(req.user._id)
    await course.save()

    // Add course to user's enrolled courses
    await User.findByIdAndUpdate(req.user._id, {
      $push: { enrolledCourses: course._id },
    })

    res.json({ message: "Successfully enrolled in course" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update course
router.put("/:id", [auth, authorize("teacher", "admin")], async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Check if user is the teacher of this course or admin
    if (req.user.role !== "admin" && course.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" })
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(
      "teacher",
      "firstName lastName",
    )

    res.json({
      message: "Course updated successfully",
      course: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
