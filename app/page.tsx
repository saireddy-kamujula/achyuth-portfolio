"use client"

import { useState, useEffect } from "react"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Code,
  Database,
  Cloud,
  BookOpen,
  Award,
  User,
  Briefcase,
  MessageCircle,
  Building,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image" // Next.js Image component
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion" // Import Accordion components

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const skills = [
    { name: "HTML", level: 85, icon: Code },
    { name: "CSS", level: 80, icon: Code },
    { name: "Python", level: 60, icon: Code },
    { name: "SQL", level: 70, icon: Database },
    { name: "MS Office", level: 90, icon: BookOpen },
    { name: "AWS Cloud", level: 50, icon: Cloud },
  ]

  const education = [
    {
      degree: "Bachelor of Technology (CSE)",
      institution: "Sree Venkateswara College of Engineering",
      year: "2021 - 2025",
      grade: "73%",
      status: "Completed",
      description:
        "Currently pursuing Computer Science Engineering with focus on programming, web development, and emerging technologies.",
    },
    {
      degree: "Intermediate (MPC)",
      institution: "Sri Chaitanya Junior College",
      year: "2019 - 2021",
      grade: "89%",
      status: "Completed",
      description: "Completed intermediate education with Mathematics, Physics, and Chemistry.",
    },
    {
      degree: "Secondary School Certificate",
      institution: "Z.P.P. High School",
      year: "2018 - 2019",
      grade: "7.8 GPA",
      status: "Completed",
      description: "Completed secondary education with strong academic performance.",
    },
  ]

  const experience = [
    {
      title: "Web Development Intern",
      company: "Data Valley",
      year: "September 2024 - Present",
      description: "Currently gaining hands-on experience in web development and contributing to ongoing projects.",
      status: "Ongoing",
    },
    {
      title: "Web Development Intern",
      company: "Codtech Pvt Ltd",
      year: "August 2024 - September 2024",
      description: "Worked on various web development tasks, enhancing skills in front-end and back-end technologies.",
      status: "Completed",
    },
    {
      title: "Web Development Intern",
      company: "Cognifyz Technologies",
      year: "July 2024 - August 2024",
      description:
        "Gained practical experience in web development, contributing to various projects and learning industry best practices.",
      status: "Completed",
    },
  ]

  const certifications = [
    {
      name: "DevOps with AWS Cloud",
      issuer: "SVCN Nellore",
      icon: Cloud,
    },
    {
      name: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      icon: Cloud, // Using Cloud icon for Azure as well, can be changed if a specific Azure icon is available
    },
  ]

  const projects = [
    {
      title: "Sales Data Analysis Using Pandas And Matplotlib",
      description:
        "This project involves analyzing sales data using Python libraries like Pandas for data manipulation and Matplotlib for visualization.",
      tech: ["Python", "Pandas", "Matplotlib", "Data Analysis"],
      status: "Completed",
    },
    {
      title: "Personal Portfolio Website",
      description: "A responsive portfolio website built with React and Next.js showcasing my skills and projects.",
      tech: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
      status: "Completed",
    },
    {
      title: "Database Management System",
      description: "A comprehensive database project using SQL for managing student records and academic data.",
      tech: ["SQL", "Database Design", "MySQL"],
      status: "In Progress",
    },
    {
      title: "Web Development Projects",
      description: "Various web development projects using HTML, CSS, and JavaScript to practice frontend skills.",
      tech: ["HTML", "CSS", "JavaScript"],
      status: "Ongoing",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-xl border-b border-gray-200" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
              Achyuth Sai Kamujula
            </div>
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Education", "Experience", "Skills", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-6 bg-white min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
                  Achyuth Sai
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-700">Computer Science Engineering Student</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Passionate about technology and eager to learn new things. Currently pursuing B.Tech in CSE with a focus
                on web development, databases, and cloud technologies. Ready to contribute to innovative projects and
                grow in the tech industry.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 text-white"
                  asChild
                >
                  <a href="#contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-700 bg-transparent"
                >
                  <a href="/resume/KAMUJULA_ACHYUTH_SAI_Resume.pdf" download="KAMUJULA_ACHYUTH_SAI_Resume.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-gray-200 shadow-2xl ring-8 ring-teal-600/70 transition-transform duration-300 hover:scale-105">
                  <Image
                    src="/images/profile.jpg"
                    alt="Achyuth Sai Kamujula"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <Code className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                  <Database className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              About Me
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mt-4">
              A dedicated Computer Science student with a passion for learning and growth
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="h-full bg-white border-gray-200 text-gray-700 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-600">
                  <Briefcase className="h-5 w-5" />
                  Career Objective
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed mb-6">
                  To succeed in an environment of growth and excellence and earn a job which provides me job
                  satisfaction and self-development and help me achieve personal as well as organizational goals.
                </p>

                <h4 className="font-semibold text-gray-900 mb-3">My Strengths</h4>
                <div className="space-y-2">
                  {["Willing to learn new things", "Self-motivated & Self-disciplined", "Friendly nature"].map(
                    (strength) => (
                      <div key={strength} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                        <span className="text-gray-700">{strength}</span>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="h-full bg-white border-gray-200 text-gray-700 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-600">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200">
                    <Image
                      src="/images/profile.jpg"
                      alt="Achyuth Sai"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Kamujula Achyuth Sai</h3>
                    <p className="text-gray-600">CS Engineering Student</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-teal-600" />
                  <span className="text-gray-700">saireddy.kamajula.2004@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-teal-600" />
                  <span className="text-gray-700">+91 8106944175</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-teal-600" />
                  <span className="text-gray-700">Chejarla, Nellore, Andhra Pradesh</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-teal-600" />
                  <span className="text-gray-700">Telugu, English</span>
                </div>

                <div className="pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Hobbies & Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Browsing Internet", "Gaming", "Listening Music"].map((hobby) => (
                      <Badge key={hobby} variant="secondary" className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                        {hobby}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              Education
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-700 mt-4">My academic journey</p>
          </div>

          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {education.map((edu, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="flex justify-between items-center py-4 px-6 text-left hover:no-underline hover:bg-gray-100 transition-colors duration-200 rounded-t-lg">
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">
                      {edu.institution} - {edu.year}
                    </p>
                  </div>
                  <Badge
                    variant={edu.status === "Completed" ? "default" : "secondary"}
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    {edu.status}
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 p-6 rounded-b-lg border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-teal-600">{edu.grade}</div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Workshop & Certifications Section */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Workshops & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <cert.icon className="h-8 w-8 text-white" />
                    <div>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="opacity-90">Issued by {cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              Experience
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-700 mt-4">My professional journey</p>
          </div>

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300 bg-white border-gray-200 text-gray-700 shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{exp.title}</h3>
                      <p className="text-gray-600 mb-2 flex items-center gap-2">
                        <Building className="h-4 w-4 text-teal-600" />
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-600">{exp.year}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <Badge
                        variant={exp.status === "Completed" ? "default" : "secondary"}
                        className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                      >
                        {exp.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-4 leading-relaxed">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              Technical Skills
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-700 mt-4">Technologies and tools I work with</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card
                key={skill.name}
                className="hover:shadow-lg transition-shadow duration-300 bg-gray-50 border-gray-200 text-gray-700 shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <skill.icon className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                  </div>
                  <Progress
                    value={skill.level}
                    className="h-2 bg-gray-200 [&>*]:bg-gradient-to-r [&>*]:from-teal-600 [&>*]:to-cyan-700"
                  />
                  <p className="text-sm text-gray-600 mt-2">{skill.level}% proficiency</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              Projects
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-700 mt-4">Some of my recent work and ongoing projects</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="h-full hover:shadow-lg transition-shadow duration-300 bg-white border-gray-200 text-gray-700 shadow-md"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">{project.title}</CardTitle>
                  <CardDescription className="text-gray-600">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge
                      variant={project.status === "Completed" ? "default" : "secondary"}
                      className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                      {project.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-teal-600 hover:bg-gray-100">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              Get In Touch
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mt-4">
              I'm always open to discussing new opportunities and interesting projects. Let's connect and explore how we
              can work together!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-50 border-gray-200 text-gray-700 shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:saireddy.kamajula.2004@gmail.com" className="text-teal-600 hover:underline">
                      saireddy.kamajula.2004@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a href="tel:+918106944175" className="text-teal-600 hover:underline">
                      +91 8106944175
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">Chejarla, Nellore, Andhra Pradesh</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-gray-200 text-gray-700 shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-900">Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    className="w-full justify-start bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200"
                    variant="outline"
                    asChild
                  >
                    <a
                      href="https://linkedin.com/in/achyuth-sai-kamujula-4707a4268"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-2 h-4 w-4 text-teal-600" />
                      LinkedIn Profile
                    </a>
                  </Button>
                  <Button
                    className="w-full justify-start bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200"
                    variant="outline"
                    asChild
                  >
                    <a href="https://github.com/saireddy-kamujula" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub Profile
                    </a>
                  </Button>
                  <Button
                    className="w-full justify-start bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 text-white"
                    asChild
                  >
                    <a href="mailto:saireddy.kamajula.2004@gmail.com">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-700 py-8 px-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-700">© 2024 Achyuth Sai Kamujula. All rights reserved.</p>
          <p className="text-gray-600 text-sm mt-2">Built with React, Next.js, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}
