// Hamburger menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

function closeMobile() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
}

// About tabs
function switchTab(name) {
  document
    .querySelectorAll(".tab-panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById("tab-" + name).classList.add("active");
  event.target.classList.add("active");
  if (name === "skills") animateSkills();
}

// Skill bars animation
function animateSkills() {
  document.querySelectorAll(".skill-fill").forEach((el) => {
    el.style.width = el.dataset.width + "%";
  });
}

// Portfolio filter
function filterWork(cat, btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".project-card").forEach((card) => {
    card.style.display =
      cat === "all" || card.dataset.cat === cat ? "" : "none";
  });
}

// Contact form submission
async function handleSubmit() {
  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const email = document.getElementById("femail").value.trim();
  const subject = document.getElementById("fsubject").value.trim();
  const message = document.getElementById("fmessage").value.trim();
  const msgEl = document.getElementById("formMsg");

  if (!email || !message) {
    msgEl.textContent = "Please fill in your email and message.";
    msgEl.className = "form-msg error";
    return;
  }

  const btn = document.querySelector(".btn-submit");
  btn.textContent = "Sending...";
  btn.disabled = true;

  try {
    const response = await fetch("https://formspree.io/f/mrerloyz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fname, lname, email, subject, message }),
    });

    if (response.ok) {
      msgEl.textContent = "Message sent! I'll get back to you soon.";
      msgEl.className = "form-msg success";
      ["fname", "lname", "femail", "fsubject", "fmessage"].forEach((id) => {
        document.getElementById(id).value = "";
      });
    } else {
      msgEl.textContent = "Something went wrong. Please try again.";
      msgEl.className = "form-msg error";
    }
  } catch (err) {
    msgEl.textContent = "Network error. Please try again.";
    msgEl.className = "form-msg error";
  }

  btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send message';
  btn.disabled = false;
  setTimeout(() => {
    msgEl.className = "form-msg";
  }, 5000);
}

// Scroll to top button
const backTop = document.getElementById("back-top");
window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 400);
});

// Intersection Observer for fade-up animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.closest("#tab-skills")) animateSkills();
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

// Animate skills on initial load
window.addEventListener("load", () => {
  animateSkills();
});
