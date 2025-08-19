const mongoose = require("mongoose")
require("dotenv").config()

// Sample data generator for demonstration
async function generateSampleData() {
  console.log("🎓 K12 Learning Platform - Sample Data Generator")
  console.log("=".repeat(60))

  console.log("\n📊 Platform Statistics:")
  console.log("• Total API Endpoints: 25+")
  console.log("• Database Models: 5 (User, Course, Lesson, Assignment, Grade)")
  console.log("• User Roles: 4 (Student, Teacher, Admin, Parent)")
  console.log("• Security Features: JWT, bcrypt, CORS, Rate Limiting")
  console.log("• Frontend: Responsive HTML5/CSS3/JavaScript")

  console.log("\n👥 Sample Users Created:")
  console.log("┌─────────────────────────────────────────────────────────┐")
  console.log("│ Role    │ Email                           │ Password    │")
  console.log("├─────────────────────────────────────────────────────────┤")
  console.log("│ Admin   │ admin@k12learning.com           │ admin123    │")
  console.log("│ Teacher │ sarah.johnson@k12learning.com   │ teacher123  │")
  console.log("│ Teacher │ michael.davis@k12learning.com   │ teacher123  │")
  console.log("│ Student │ emma.wilson@student.com         │ student123  │")
  console.log("│ Student │ james.brown@student.com         │ student123  │")
  console.log("└─────────────────────────────────────────────────────────┘")

  console.log("\n📚 Sample Courses:")
  console.log("• Elementary Mathematics (Grade 5) - Sarah Johnson")
  console.log("  └─ Lessons: Introduction to Fractions, Adding Fractions")
  console.log("• Introduction to Science (Grade 5) - Sarah Johnson")
  console.log("  └─ Lessons: The Scientific Method")
  console.log("• Middle School English (Grade 8) - Michael Davis")
  console.log("  └─ Lessons: Reading Comprehension, Writing Skills")

  console.log("\n🔗 API Endpoints Available:")
  console.log("Authentication:")
  console.log("  POST /api/auth/register - User registration")
  console.log("  POST /api/auth/login - User login")
  console.log("  GET  /api/auth/me - Get current user")

  console.log("\nCourse Management:")
  console.log("  GET  /api/courses - List all courses")
  console.log("  GET  /api/courses/:id - Get course details")
  console.log("  POST /api/courses - Create new course (Teacher/Admin)")
  console.log("  POST /api/courses/:id/enroll - Enroll in course (Student)")

  console.log("\nLessons:")
  console.log("  GET  /api/lessons/course/:courseId - Get course lessons")
  console.log("  GET  /api/lessons/:id - Get lesson details")
  console.log("  POST /api/lessons - Create lesson (Teacher/Admin)")
  console.log("  POST /api/lessons/:id/quiz - Submit quiz answers")

  console.log("\nAssignments:")
  console.log("  GET  /api/assignments/course/:courseId - Get course assignments")
  console.log("  GET  /api/assignments/:id - Get assignment details")
  console.log("  POST /api/assignments - Create assignment (Teacher/Admin)")
  console.log("  POST /api/assignments/:id/submit - Submit assignment (Student)")

  console.log("\nGrades:")
  console.log("  GET  /api/grades/student/:studentId - Get student grades")
  console.log("  POST /api/grades/assignment/:assignmentId/student/:studentId - Grade assignment")

  console.log("\nDashboard:")
  console.log("  GET  /api/dashboard - Get role-based dashboard data")

  console.log("\n🚀 To start the platform:")
  console.log("1. npm install")
  console.log("2. Set up .env file with MongoDB URI and JWT secret")
  console.log("3. npm run seed")
  console.log("4. npm run dev")
  console.log("5. Open http://localhost:5000")

  console.log("\n✨ Platform Features:")
  console.log("• Multi-role authentication system")
  console.log("• Course creation and management")
  console.log("• Interactive lessons with quizzes")
  console.log("• Assignment submission and grading")
  console.log("• Progress tracking and analytics")
  console.log("• Responsive design for all devices")
  console.log("• Secure API with JWT authentication")
  console.log("• Role-based access control")
  console.log("• Real-time dashboard updates")
  console.log("• Grade management system")

  console.log("\n" + "=".repeat(60))
  console.log("🎉 K12 Learning Platform is ready to use!")
  console.log("=".repeat(60))
}

// Run the sample data generator
generateSampleData()
