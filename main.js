document.addEventListener("DOMContentLoaded", () => {
  const aboutMeBtn = document.getElementById("about-me-btn")
  const aboutSkillsBtn = document.getElementById("about-skills-btn")
  const aboutCertBtn = document.getElementById("about-cert-btn")

  const aboutText = document.getElementById("about-text-placeholder")
  const aboutExtra = document.getElementById("about-me-extra")
  const skillsContainer = document.getElementById("skills-container")
  const allButtons = [aboutMeBtn, aboutSkillsBtn, aboutCertBtn]

  const activeColor = "#F5EBE0"
  const inactiveColor = "rgba(245, 235, 224, 0.6)"

  const certContent = `
    <div class="cert-cards-container">
      <a href="#" target="_blank" class="cert-card">
        <img src="assets/me/unicef.jpeg" alt="Programación y diseño Web" class="cert-image">
        <h4 class="cert-title left-align">Programación y diseño Web</h4>
        <p class="cert-issuer">Unicef - Crack the Code</p>
      </a>
      <a href="#l" target="_blank" class="cert-card">
        <img src="assets/me/carabaylllo.jpeg" alt="Gestión de Aplicación y manejo de datos" class="cert-image">
        <h4 class="cert-title">IT Specialist: Gestión de Aplicación y manejo de datos</h4>
        <p class="cert-issuer">Cetpro Carabayllo</p>
      </a>
      <a href="#l" target="_blank" class="cert-card">
        <img src="assets/me/santander.png" alt="Gestión de Proyectos y Fundamentos de metologia agile" class="cert-image">
        <h4 class="cert-title"> Gestión de Proyectos y Fundamentos de metologia agile</h4>
        <p class="cert-issuer">Santander Open Academy</p>
      </a>
      <a href="#" target="_blank" class="cert-card">
        <img src="assets/me/java completo.png" alt="Java Fundamentals" class="cert-image">
        <h4 class="cert-title">Java Fundamentals</h4>
        <p class="cert-issuer">Oracle Academy</p>
      </a>
      </a>
      <a href="#" target="_blank" class="cert-card">
        <img src="assets/me/database completo.png" alt="Certificado de Database Design" class="cert-image">
        <h4 class="cert-title">Database Design</h4>
        <p class="cert-issuer">Oracle Academy</p>
      </a>
    </div>
  `

  const aboutMeContent = `
      Soy Ingeniera de Software con IA y Desarrolladora de paginas Web, 
      aprendizaje automático, especializado en diseño de paginas, 
      y cuento con una trayectoria en el desarrollo de soluciones de de frontend y 
      backend listas para producción con las que interactúan usuarios a gran escala.
    `

  function swapMain(content, showSkills = false) {
    aboutText.style.opacity = 0
    skillsContainer.style.display = showSkills ? "block" : "none"
    setTimeout(() => {
      aboutText.innerHTML = content
      aboutText.style.opacity = 1
    }, 200)
  }

  function toggleExtra(show) {
    if (!aboutExtra) return;  // add this line
    if (show) {
      aboutExtra.style.maxHeight = aboutExtra.scrollHeight + "px"
      aboutExtra.style.opacity = 1
    } else {
      aboutExtra.style.maxHeight = 0
      aboutExtra.style.opacity = 0
    }
  }

  function setActive(btn) {
    allButtons.forEach((b) => {
      b.style.color = b === btn ? activeColor : inactiveColor
      b.style.backgroundColor = b === btn ? "rgba(255, 255, 255, 0.1)" : "transparent"
    })
  }

  aboutMeBtn.onclick = () => {
    setActive(aboutMeBtn)
    swapMain(aboutMeContent, false)
    toggleExtra(true)
  }

  aboutSkillsBtn.onclick = () => {
    setActive(aboutSkillsBtn)
    swapMain("", true)
    toggleExtra(false)
  }

  aboutCertBtn.onclick = () => {
    setActive(aboutCertBtn)
    swapMain(certContent, false)
    toggleExtra(false)
  }

  setActive(aboutMeBtn)
  toggleExtra(true)

  const options = {
    threshold: 0.1, // Reduced from 0.2 to trigger earlier on mobile
    rootMargin: "0px 0px -50px 0px", // Added margin to trigger before element fully enters viewport
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show")
      } else {
        entry.target.classList.remove("show")
      }
    })
  }, options)

  document.querySelectorAll(".hidden").forEach((el) => revealObserver.observe(el))

  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".work-card")

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter

      filterButtons.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      projectCards.forEach((card) => {
        const status = card.querySelector(".project-status")
        const statusText = status ? status.textContent.toLowerCase() : ""

        if (filter === "all") {
          card.classList.remove("filter-hidden")
        } else if (filter === "completed" && statusText === "completed") {
          card.classList.remove("filter-hidden")
        } else if (filter === "ongoing" && statusText === "ongoing") {
          card.classList.remove("filter-hidden")
        } else {
          card.classList.add("filter-hidden")
        }
      })
    })
  })
})

document.querySelectorAll(".view-project-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {

        e.stopPropagation();

        const card = this.closest(".work-card");
        const url = card.dataset.link;

        window.open(url, "_blank");
    });
});