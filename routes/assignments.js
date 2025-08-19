const express = require("express")
const { body, validationResult } = require("express-validator")
const Assignment = require("../models/Assignment")
const Course = require("../models/Course")
const { auth, authorize } = require("../middleware/auth")

const router = express.Router()

// Get assignments for a course
router.get("/course/:courseId", auth, async (req, res) => {
  try {
    const assignments = await Assignment.find({
      course: req.params.courseId,
      isPublished: true,
    })
      .populate("teacher", "firstName lastName")
      .sort({ dueDate: 1 })

    res.json(assignments)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single assignment
router.get("/:id", auth, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate("course", "title enrolledStudents")
      .populate("teacher", "firstName lastName")
      .populate("submissions.student", "firstName lastName")

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" })
    }

    // Filter submissions based on user role
    if (req.user.role === "student") {
      assignment.submissions = assignment.submissions.filter(
        (sub) => sub.student._id.toString() === req.user._id.toString(),
      )
    }

    res.json(assignment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create assignment (teachers and admins only)
router.post(
  "/",
  [
    auth,
    authorize("teacher", "admin"),
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("course").notEmpty().withMessage("Course is required"),
    body("dueDate").isISO8601().withMessage("Valid due date is required"),
    body("maxPoints").isNumeric().withMessage("Max points must be a number"),
    body("instructions").notEmpty().withMessage("Instructions are required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const assignmentData = {
        ...req.body,
        teacher: req.user._id,
      }

      const assignment = new Assignment(assignmentData)
      await assignment.save()

      // Add assignment to course
      await Course.findByIdAndUpdate(req.body.course, {
        $push: { assignments: assignment._id },
      })

      const populatedAssignment = await Assignment.findById(assignment._id)
        .populate("teacher", "firstName lastName")
        .populate("course", "title")

      res.status(201).json({
        message: "Assignment created successfully",
        assignment: populatedAssignment,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Submit assignment (students only)
router.post(
  "/:id/submit",
  [auth, authorize("student"), body("content").notEmpty().withMessage("Submission content is required")],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const assignment = await Assignment.findById(req.params.id)
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" })
      }

      // Check if assignment is past due
      if (new Date() > assignment.dueDate) {
        return res.status(400).json({ message: "Assignment is past due" })
      }

      // Check if student already submitted
      const existingSubmission = assignment.submissions.find(
        (sub) => sub.student.toString() === req.user._id.toString(),
      )

      if (existingSubmission) {
        return res.status(400).json({ message: "Assignment already submitted" })
      }

      // Add submission
      assignment.submissions.push({
        student: req.user._id,
        content: req.body.content,
        attachments: req.body.attachments || [],
      })

      await assignment.save()

      res.json({ message: "Assignment submitted successfully" })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

module.exports = router
