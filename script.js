document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu")
  const navLinks = document.querySelector(".nav-links")
  const header = document.querySelector(".header")
  const sections = document.querySelectorAll("section[id]")
  const navItems = document.querySelectorAll(".nav-links a")

  // Toggle mobile menu
  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    mobileMenu.classList.toggle("is-active")
  })

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active")
      mobileMenu.classList.remove("is-active")
    })
  })

  // Smooth scrolling for navigation links
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault()
      const targetId = e.target.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - header.offsetHeight, // Adjust for fixed header
          behavior: "smooth",
        })
      }
    }
  })

  // Highlight active navigation link on scroll
  window.addEventListener("scroll", () => {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - header.offsetHeight
      const sectionHeight = section.clientHeight
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href").includes(current)) {
        item.classList.add("active")
      }
    })
  })

  // Initial active link set (for when page loads at top)
  if (window.pageYOffset === 0) {
    document.querySelector('.nav-links a[href="#home"]').classList.add("active")
  }
})
