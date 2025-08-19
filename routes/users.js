const express = require("express")
const User = require("../models/User")
const { auth, authorize } = require("../middleware/auth")

const router = express.Router()

// Get all users (admin only)
router.get("/", auth, authorize("admin"), async (req, res) => {
  try {
    const { role, grade, search } = req.query
    const query = {}

    if (role) query.role = role
    if (grade) query.grade = grade
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    }

    const users = await User.find(query)
      .select("-password")
      .populate("enrolledCourses", "title subject")
      .sort({ createdAt: -1 })

    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get user profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("enrolledCourses", "title subject grade teacher")

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update user profile
router.put("/profile", auth, async (req, res) => {
  try {
    const allowedUpdates = ["firstName", "lastName", "avatar"]
    const updates = {}

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field]
      }
    })

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-password")

    res.json({
      message: "Profile updated successfully",
      user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
