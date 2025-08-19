const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const User = require("../models/User")
const Course = require("../models/Course")
const Lesson = require("../models/Lesson")

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/k12_learning", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function seedData() {
  try {
    // Clear existing data
    await User.deleteMany({})
    await Course.deleteMany({})
    await Lesson.deleteMany({})

    console.log("Cleared existing data")

    // Create admin user
    const adminUser = new User({
      firstName: "Admin",
      lastName: "User",
      email: "admin@k12learning.com",
      password: "admin123",
      role: "admin",
    })
    await adminUser.save()

    // Create teacher users
    const teacher1 = new User({
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@k12learning.com",
      password: "teacher123",
      role: "teacher",
      subjects: ["Mathematics", "Science"],
    })
    await teacher1.save()

    const teacher2 = new User({
      firstName: "Michael",
      lastName: "Davis",
      email: "michael.davis@k12learning.com",
      password: "teacher123",
      role: "teacher",
      subjects: ["English", "History"],
    })
    await teacher2.save()

    // Create student users
    const student1 = new User({
      firstName: "Emma",
      lastName: "Wilson",
      email: "emma.wilson@student.com",
      password: "student123",
      role: "student",
      grade: "5",
      dateOfBirth: new Date("2014-03-15"),
      parentEmail: "parent1@example.com",
    })
    await student1.save()

    const student2 = new User({
      firstName: "James",
      lastName: "Brown",
      email: "james.brown@student.com",
      password: "student123",
      role: "student",
      grade: "8",
      dateOfBirth: new Date("2011-07-22"),
      parentEmail: "parent2@example.com",
    })
    await student2.save()

    // Create courses
    const mathCourse = new Course({
      title: "Elementary Mathematics",
      description: "Comprehensive mathematics course covering basic arithmetic, fractions, and problem-solving skills.",
      subject: "Mathematics",
      grade: "5",
      teacher: teacher1._id,
      duration: 12,
      difficulty: "Beginner",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-04-15"),
      enrolledStudents: [student1._id],
    })
    await mathCourse.save()

    const scienceCourse = new Course({
      title: "Introduction to Science",
      description: "Explore the wonders of science through hands-on experiments and interactive lessons.",
      subject: "Science",
      grade: "5",
      teacher: teacher1._id,
      duration: 10,
      difficulty: "Beginner",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-04-01"),
      enrolledStudents: [student1._id],
    })
    await scienceCourse.save()

    const englishCourse = new Course({
      title: "Middle School English",
      description: "Develop reading comprehension, writing skills, and literary analysis.",
      subject: "English",
      grade: "8",
      teacher: teacher2._id,
      duration: 16,
      difficulty: "Intermediate",
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-05-10"),
      enrolledStudents: [student2._id],
    })
    await englishCourse.save()

    // Create lessons for math course
    const mathLesson1 = new Lesson({
      title: "Introduction to Fractions",
      description: "Learn the basics of fractions and how to identify numerators and denominators.",
      content:
        "In this lesson, we will explore what fractions are and how they represent parts of a whole. A fraction consists of two parts: the numerator (top number) and the denominator (bottom number).",
      course: mathCourse._id,
      order: 1,
      duration: 45,
      quiz: {
        questions: [
          {
            question: "What is the numerator in the fraction 3/4?",
            options: ["3", "4", "7", "1"],
            correctAnswer: 0,
            explanation: "The numerator is the top number in a fraction, which represents the number of parts we have.",
          },
          {
            question: "What does the denominator represent?",
            options: ["Parts we have", "Total parts", "Addition", "Subtraction"],
            correctAnswer: 1,
            explanation:
              "The denominator is the bottom number that shows how many equal parts the whole is divided into.",
          },
        ],
        passingScore: 70,
      },
      isPublished: true,
    })
    await mathLesson1.save()

    const mathLesson2 = new Lesson({
      title: "Adding Fractions",
      description: "Learn how to add fractions with the same and different denominators.",
      content:
        "Adding fractions requires understanding common denominators. When fractions have the same denominator, we add the numerators and keep the denominator the same.",
      course: mathCourse._id,
      order: 2,
      duration: 50,
      quiz: {
        questions: [
          {
            question: "What is 1/4 + 2/4?",
            options: ["3/4", "3/8", "1/2", "2/3"],
            correctAnswer: 0,
            explanation:
              "When adding fractions with the same denominator, add the numerators: 1 + 2 = 3, so the answer is 3/4.",
          },
        ],
        passingScore: 70,
      },
      isPublished: true,
    })
    await mathLesson2.save()

    // Create lessons for science course
    const scienceLesson1 = new Lesson({
      title: "The Scientific Method",
      description: "Understanding the steps of scientific inquiry and experimentation.",
      content:
        "The scientific method is a systematic approach to understanding the natural world. It involves observation, hypothesis formation, experimentation, and conclusion.",
      course: scienceCourse._id,
      order: 1,
      duration: 40,
      quiz: {
        questions: [
          {
            question: "What is the first step in the scientific method?",
            options: ["Hypothesis", "Observation", "Experiment", "Conclusion"],
            correctAnswer: 1,
            explanation: "The scientific method begins with careful observation of phenomena in the natural world.",
          },
        ],
        passingScore: 70,
      },
      isPublished: true,
    })
    await scienceLesson1.save()

    // Update courses with lesson references
    mathCourse.lessons = [mathLesson1._id, mathLesson2._id]
    await mathCourse.save()

    scienceCourse.lessons = [scienceLesson1._id]
    await scienceCourse.save()

    // Update users with enrolled courses
    student1.enrolledCourses = [mathCourse._id, scienceCourse._id]
    await student1.save()

    student2.enrolledCourses = [englishCourse._id]
    await student2.save()

    console.log("Seed data created successfully!")
    console.log("Admin User: admin@k12learning.com / admin123")
    console.log("Teacher 1: sarah.johnson@k12learning.com / teacher123")
    console.log("Teacher 2: michael.davis@k12learning.com / teacher123")
    console.log("Student 1: emma.wilson@student.com / student123")
    console.log("Student 2: james.brown@student.com / student123")
  } catch (error) {
    console.error("Error seeding data:", error)
  } finally {
    mongoose.connection.close()
  }
}

seedData()
