const express = require("express")
const Course = require("../models/Course")
const Assignment = require("../models/Assignment")
const Grade = require("../models/Grade")
const User = require("../models/User")
const { auth } = require("../middleware/auth")

const router = express.Router()

// Get dashboard data
router.get("/", auth, async (req, res) => {
  try {
    let dashboardData = {}

    if (req.user.role === "student") {
      // Student dashboard
      const enrolledCourses = await Course.find({
        enrolledStudents: req.user._id,
        isActive: true,
      }).populate("teacher", "firstName lastName")

      const upcomingAssignments = await Assignment.find({
        course: { $in: enrolledCourses.map((c) => c._id) },
        dueDate: { $gte: new Date() },
        isPublished: true,
      })
        .populate("course", "title")
        .sort({ dueDate: 1 })
        .limit(5)

      const recentGrades = await Grade.find({
        student: req.user._id,
      })
        .populate("course", "title")
        .populate("assignment", "title")
        .sort({ createdAt: -1 })
        .limit(5)

      dashboardData = {
        enrolledCourses,
        upcomingAssignments,
        recentGrades,
        stats: {
          totalCourses: enrolledCourses.length,
          pendingAssignments: upcomingAssignments.length,
          averageGrade:
            recentGrades.length > 0
              ? (recentGrades.reduce((sum, grade) => sum + grade.percentage, 0) / recentGrades.length).toFixed(1)
              : 0,
        },
      }
    } else if (req.user.role === "teacher") {
      // Teacher dashboard
      const teachingCourses = await Course.find({
        teacher: req.user._id,
        isActive: true,
      }).populate("enrolledStudents", "firstName lastName")

      const pendingGrading = await Assignment.find({
        teacher: req.user._id,
        "submissions.grade": { $exists: false },
      }).populate("course", "title")

      const totalStudents = teachingCourses.reduce((sum, course) => sum + course.enrolledStudents.length, 0)

      dashboardData = {
        teachingCourses,
        pendingGrading,
        stats: {
          totalCourses: teachingCourses.length,
          totalStudents,
          pendingGrading: pendingGrading.length,
        },
      }
    } else if (req.user.role === "admin") {
      // Admin dashboard
      const totalUsers = await User.countDocuments()
      const totalStudents = await User.countDocuments({ role: "student" })
      const totalTeachers = await User.countDocuments({ role: "teacher" })
      const totalCourses = await Course.countDocuments({ isActive: true })

      const recentUsers = await User.find().select("-password").sort({ createdAt: -1 }).limit(5)

      dashboardData = {
        stats: {
          totalUsers,
          totalStudents,
          totalTeachers,
          totalCourses,
        },
        recentUsers,
      }
    }

    res.json(dashboardData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
