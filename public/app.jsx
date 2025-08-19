// Global variables
let currentUser = null
const API_BASE_URL = "/api"

// DOM elements
const loginModal = document.getElementById("loginModal")
const registerModal = document.getElementById("registerModal")
const loginBtn = document.getElementById("loginBtn")
const registerBtn = document.getElementById("registerBtn")
const closeLoginModal = document.getElementById("closeLoginModal")
const closeRegisterModal = document.getElementById("closeRegisterModal")
const switchToRegister = document.getElementById("switchToRegister")
const switchToLogin = document.getElementById("switchToLogin")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const roleSelect = document.getElementById("role")
const studentFields = document.getElementById("studentFields")

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is already logged in
  const token = localStorage.getItem("token")
  if (token) {
    fetchCurrentUser()
  }

  // Modal event listeners
  loginBtn.addEventListener("click", () => showModal(loginModal))
  registerBtn.addEventListener("click", () => showModal(registerModal))
  closeLoginModal.addEventListener("click", () => hideModal(loginModal))
  closeRegisterModal.addEventListener("click", () => hideModal(registerModal))
  switchToRegister.addEventListener("click", () => {
    hideModal(loginModal)
    showModal(registerModal)
  })
  switchToLogin.addEventListener("click", () => {
    hideModal(registerModal)
    showModal(loginModal)
  })

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
  })

  // Role-based form fields
  roleSelect.addEventListener("change", function () {
    if (this.value === "student") {
      studentFields.classList.remove("hidden")
    } else {
      studentFields.classList.add("hidden")
    }
  })

  // Form submissions
  document.getElementById("loginForm").addEventListener("submit", handleLogin)
  document.getElementById("registerForm").addEventListener("submit", handleRegister)

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) hideModal(loginModal)
    if (e.target === registerModal) hideModal(registerModal)
  })
})

// Modal functions
function showModal(modal) {
  modal.classList.remove("hidden")
  modal.classList.add("flex")
}

function hideModal(modal) {
  modal.classList.add("hidden")
  modal.classList.remove("flex")
}

// Authentication functions
async function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem("token", data.token)
      currentUser = data.user
      hideModal(loginModal)
      showSuccessMessage("Login successful!")
      updateNavigation()
      redirectToDashboard()
    } else {
      showErrorMessage(data.message || "Login failed")
    }
  } catch (error) {
    console.error("Login error:", error)
    showErrorMessage("Network error. Please try again.")
  }
}

async function handleRegister(e) {
  e.preventDefault()

  const formData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("registerEmail").value,
    password: document.getElementById("registerPassword").value,
    role: document.getElementById("role").value,
  }

  // Add student-specific fields if role is student
  if (formData.role === "student") {
    formData.grade = document.getElementById("grade").value
    formData.dateOfBirth = document.getElementById("dateOfBirth").value
    formData.parentEmail = document.getElementById("parentEmail").value
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem("token", data.token)
      currentUser = data.user
      hideModal(registerModal)
      showSuccessMessage("Registration successful!")
      updateNavigation()
      redirectToDashboard()
    } else {
      showErrorMessage(data.message || "Registration failed")
    }
  } catch (error) {
    console.error("Registration error:", error)
    showErrorMessage("Network error. Please try again.")
  }
}

async function fetchCurrentUser() {
  const token = localStorage.getItem("token")
  if (!token) return

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      const user = await response.json()
      currentUser = user
      updateNavigation()
    } else {
      localStorage.removeItem("token")
    }
  } catch (error) {
    console.error("Fetch user error:", error)
    localStorage.removeItem("token")
  }
}

function logout() {
  localStorage.removeItem("token")
  currentUser = null
  updateNavigation()
  window.location.href = "/"
}

function updateNavigation() {
  const navbar = document.querySelector("#navbar .flex")
  const rightSection = navbar.querySelector(".hidden.md\\:flex")

  if (currentUser) {
    rightSection.innerHTML = `
            <span class="text-gray-600">Welcome, ${currentUser.firstName}!</span>
            <button onclick="redirectToDashboard()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Dashboard</button>
            <button onclick="logout()" class="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">Logout</button>
        `
  } else {
    rightSection.innerHTML = `
            <a href="#home" class="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
            <a href="#features" class="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#about" class="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <button id="loginBtn" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Login</button>
            <button id="registerBtn" class="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">Register</button>
        `

    // Re-attach event listeners
    document.getElementById("loginBtn").addEventListener("click", () => showModal(loginModal))
    document.getElementById("registerBtn").addEventListener("click", () => showModal(registerModal))
  }
}

function redirectToDashboard() {
  if (currentUser) {
    // In a real application, you would redirect to different dashboard pages
    // based on the user's role
    showSuccessMessage(`Redirecting to ${currentUser.role} dashboard...`)

    // For demo purposes, we'll just show a message
    setTimeout(() => {
      alert(`Welcome to your ${currentUser.role} dashboard! This would normally redirect to a dashboard page.`)
    }, 1000)
  }
}

// Utility functions
function showSuccessMessage(message) {
  showNotification(message, "success")
}

function showErrorMessage(message) {
  showNotification(message, "error")
}

function showNotification(message, type) {
  const notification = document.createElement("div")
  notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
