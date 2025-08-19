const express = require("express")
const Grade = require("../models/Grade")
const Assignment = require("../models/Assignment")
const { auth, authorize } = require("../middleware/auth")

const router = express.Router()

// Get grades for a student
router.get("/student/:studentId", auth, async (req, res) => {
  try {
    // Students can only view their own grades
    if (req.user.role === "student" && req.params.studentId !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" })
    }

    const grades = await Grade.find({ student: req.params.studentId })
      .populate("course", "title subject")
      .populate("assignment", "title")
      .populate("gradedBy", "firstName lastName")
      .sort({ createdAt: -1 })

    res.json(grades)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Grade assignment submission (teachers only)
router.post("/assignment/:assignmentId/student/:studentId", [auth, authorize("teacher", "admin")], async (req, res) => {
  try {
    const { points, feedback } = req.body
    const assignment = await Assignment.findById(req.params.assignmentId)

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" })
    }

    // Find the submission
    const submission = assignment.submissions.find((sub) => sub.student.toString() === req.params.studentId)

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" })
    }

    // Update submission with grade
    submission.grade = {
      points,
      feedback,
      gradedAt: new Date(),
      gradedBy: req.user._id,
    }

    await assignment.save()

    // Create grade record
    const grade = new Grade({
      student: req.params.studentId,
      course: assignment.course,
      assignment: assignment._id,
      type: "assignment",
      points,
      maxPoints: assignment.maxPoints,
      feedback,
      gradedBy: req.user._id,
    })

    await grade.save()

    res.json({
      message: "Assignment graded successfully",
      grade,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
