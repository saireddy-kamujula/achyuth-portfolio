const express = require("express")
const { body, validationResult } = require("express-validator")
const Lesson = require("../models/Lesson")
const Course = require("../models/Course")
const { auth, authorize } = require("../middleware/auth")

const router = express.Router()

// Get lessons for a course
router.get("/course/:courseId", auth, async (req, res) => {
  try {
    const lessons = await Lesson.find({
      course: req.params.courseId,
      isPublished: true,
    }).sort({ order: 1 })

    res.json(lessons)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single lesson
router.get("/:id", auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate("course", "title teacher enrolledStudents")

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" })
    }

    // Check if user has access to this lesson
    if (req.user.role === "student" && !lesson.course.enrolledStudents.includes(req.user._id)) {
      return res.status(403).json({ message: "Access denied" })
    }

    res.json(lesson)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create lesson (teachers and admins only)
router.post(
  "/",
  [
    auth,
    authorize("teacher", "admin"),
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("course").notEmpty().withMessage("Course is required"),
    body("order").isNumeric().withMessage("Order must be a number"),
    body("duration").isNumeric().withMessage("Duration must be a number"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      // Check if course exists and user has permission
      const course = await Course.findById(req.body.course)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }

      if (req.user.role !== "admin" && course.teacher.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied" })
      }

      const lesson = new Lesson(req.body)
      await lesson.save()

      // Add lesson to course
      course.lessons.push(lesson._id)
      await course.save()

      res.status(201).json({
        message: "Lesson created successfully",
        lesson,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Submit quiz answer
router.post("/:id/quiz", auth, authorize("student"), async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" })
    }

    const { answers } = req.body
    let score = 0
    const totalQuestions = lesson.quiz.questions.length

    // Calculate score
    lesson.quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++
      }
    })

    const percentage = (score / totalQuestions) * 100
    const passed = percentage >= lesson.quiz.passingScore

    res.json({
      score,
      totalQuestions,
      percentage,
      passed,
      passingScore: lesson.quiz.passingScore,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
