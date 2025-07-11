"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Github,
  Linkedin,
  GraduationCap,
  Award,
  Code,
  User,
  Briefcase,
  Heart,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "education", "skills", "experience", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-slate-800">Achyuth Sai</div>
            <div className="hidden md:flex space-x-8">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "education", label: "Education" },
                { id: "skills", label: "Skills" },
                { id: "experience", label: "Experience" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    activeSection === item.id ? "text-blue-600" : "text-slate-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-8 flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">Kamujula Achyuth Sai</h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8">Computer Science Engineering Student</p>
            <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
              Passionate about technology and eager to explore new opportunities in software development. Currently
              pursuing B.Tech in Computer Science Engineering with a focus on building strong technical foundations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => scrollToSection("contact")} size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Button>
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">About Me</h2>
            <p className="text-lg text-slate-600">Get to know more about my journey and aspirations</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Career Objective</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                To succeed in an environment of growth and excellence and earn a job which provides me job satisfaction
                and self-development and help me achieve personal as well as organizational goals.
              </p>

              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Personal Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-slate-600">
                  <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                  <span>Chejarla, Nellore, Andhra Pradesh</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <span className="w-5 h-5 mr-3 text-blue-600 flex items-center justify-center text-sm font-semibold">
                    DOB
                  </span>
                  <span>April 22, 2004</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <span className="w-5 h-5 mr-3 text-blue-600 flex items-center justify-center text-sm font-semibold">
                    Lang
                  </span>
                  <span>Telugu, English</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Strengths</h3>
              <div className="space-y-4 mb-6">
                {["Willing to learn new things", "Self-motivated & Self-disciplined", "Friendly nature"].map(
                  (strength, index) => (
                    <div key={index} className="flex items-center">
                      <Award className="w-5 h-5 mr-3 text-green-600" />
                      <span className="text-slate-600">{strength}</span>
                    </div>
                  ),
                )}
              </div>

              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Hobbies</h3>
              <div className="space-y-4">
                {["Browsing internet to acquire new things", "Playing games", "Listening music"].map((hobby, index) => (
                  <div key={index} className="flex items-center">
                    <Heart className="w-5 h-5 mr-3 text-red-500" />
                    <span className="text-slate-600">{hobby}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Education</h2>
            <p className="text-lg text-slate-600">My academic journey and achievements</p>
          </div>

          <div className="space-y-6">
            {[
              {
                degree: "B.Tech in Computer Science Engineering",
                institution: "Sree Venkateswara College of Engineering",
                year: "2021-2025",
                grade: "73%",
                status: "Pursuing",
              },
              {
                degree: "Intermediate (MPC)",
                institution: "Sri Chaitanya Junior College",
                year: "2019-2021",
                grade: "87%",
                status: "Completed",
              },
              {
                degree: "Secondary School Certificate",
                institution: "Z.P.P.High School",
                year: "2018-2019",
                grade: "7.8 GPA",
                status: "Completed",
              },
            ].map((edu, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <GraduationCap className="w-6 h-6 mr-3 text-blue-600" />
                      <div>
                        <CardTitle className="text-xl">{edu.degree}</CardTitle>
                        <CardDescription className="text-base">{edu.institution}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={edu.status === "Pursuing" ? "default" : "secondary"}>{edu.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">{edu.year}</span>
                    <span className="font-semibold text-green-600">{edu.grade}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Technical Skills</h2>
            <p className="text-lg text-slate-600">Technologies and tools I work with</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2 text-blue-600" />
                  Programming Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["HTML", "CSS", "SQL", "Python (Basics)"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                  Office Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["MS Word", "MS Excel", "MS PowerPoint"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Workshops & Experience</h2>
            <p className="text-lg text-slate-600">Learning experiences and professional development</p>
          </div>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center">
                <Award className="w-6 h-6 mr-3 text-orange-600" />
                <div>
                  <CardTitle className="text-xl">DevOps with AWS Cloud</CardTitle>
                  <CardDescription className="text-base">SVCN Nellore</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Attended comprehensive workshop on DevOps practices and AWS Cloud services, gaining insights into modern
                deployment strategies and cloud infrastructure management.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Get In Touch</h2>
            <p className="text-lg text-slate-600">Let's connect and discuss opportunities</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-blue-600" />
                  <a
                    href="mailto:saireddy.kamajula.2004@gmail.com"
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    saireddy.kamajula.2004@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-green-600" />
                  <a href="tel:+918106944175" className="text-slate-600 hover:text-green-600 transition-colors">
                    +91 8106944175
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-red-600" />
                  <span className="text-slate-600">Chejarla, Nellore District, Andhra Pradesh</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>I'd love to hear from you</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your message..."
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">© 2024 Kamujula Achyuth Sai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
