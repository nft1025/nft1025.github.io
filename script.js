const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const revealItems = document.querySelectorAll(".reveal");
const skillBars = document.querySelectorAll(".skill-bar div");
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotPanel = document.getElementById("chatbot-panel");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");
const suggestionButtons = document.querySelectorAll(".chip");
const chatbotTyping = document.getElementById("chatbot-typing");
const contactForm = document.getElementById("contact-form");
const contactName = document.getElementById("contact-name");
const contactSubject = document.getElementById("contact-subject");
const contactMessage = document.getElementById("contact-message");
const liveCards = document.querySelectorAll(".hero-content, .hero-side, .intro-card, .project-card");

const storageKey = "portfolio-theme";
const savedTheme = localStorage.getItem(storageKey);

if (savedTheme === "light" || savedTheme === "dark") {
  body.dataset.theme = savedTheme;
}

const setThemeButtonState = () => {
  const isLight = body.dataset.theme === "light";
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("title", isLight ? "Switch to dark mode" : "Switch to sun mode");
};

setThemeButtonState();

themeToggle?.addEventListener("click", () => {
  body.dataset.theme = body.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem(storageKey, body.dataset.theme);
  setThemeButtonState();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add("visible");

    if (entry.target.id === "skills") {
      skillBars.forEach((bar) => {
        bar.style.width = bar.dataset.width;
      });
    }

    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.2 });

revealItems.forEach((item) => revealObserver.observe(item));

const openChatbot = () => {
  chatbotPanel.hidden = false;
  chatbotToggle.setAttribute("aria-expanded", "true");
  chatbotInput.focus();
};

const closeChatbot = () => {
  chatbotPanel.hidden = true;
  chatbotToggle.setAttribute("aria-expanded", "false");
};

chatbotToggle?.addEventListener("click", () => {
  if (chatbotPanel.hidden) {
    openChatbot();
  } else {
    closeChatbot();
  }
});

chatbotClose?.addEventListener("click", closeChatbot);

const addMessage = (text, sender) => {
  const message = document.createElement("div");
  message.className = `chat-message ${sender}`;
  message.textContent = text;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

const setTyping = (show) => {
  chatbotTyping.hidden = !show;
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

const getBotReply = (question) => {
  const normalized = question.toLowerCase();

  if (normalized.includes("project")) {
    return "Neil's featured projects include AI activities, an event management system, web development activities, and a React-based time manager website.";
  }

  if (normalized.includes("skill") || normalized.includes("tech") || normalized.includes("stack")) {
    return "Neil works with Python, Cisco Packet Tracer routing, database management, HTML, JavaScript, PHP, C++, and React, with strong interest in AI and full stack development.";
  }

  if (normalized.includes("contact") || normalized.includes("email") || normalized.includes("linkedin") || normalized.includes("facebook")) {
    return "You can reach Neil through email at neilfrancisteresa22@gmail.com or through the contact icons for Facebook, GitHub, and LinkedIn in the contact section.";
  }

  if (normalized.includes("about") || normalized.includes("who") || normalized.includes("neil")) {
    return "Neil Francis A. Teresa is a Computer Engineer and aspiring AI Engineer who also works across full stack development, data analysis, and networking.";
  }

  if (normalized.includes("hello") || normalized.includes("hi")) {
    return "Hello! Ask me about Neil's projects, skills, or how to get in touch.";
  }

  return "I can help with portfolio questions about projects, skills, background, and contact details. Try asking about projects, skills, or how to contact Neil.";
};

const submitChat = (question) => {
  const text = question.trim();
  if (!text) {
    return;
  }

  addMessage(text, "user");
  chatbotInput.value = "";
  setTyping(true);

  window.setTimeout(() => {
    setTyping(false);
    addMessage(getBotReply(text), "bot");
  }, 650);
};

chatbotForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  submitChat(chatbotInput.value);
});

suggestionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (chatbotPanel.hidden) {
      openChatbot();
    }
    submitChat(button.dataset.question || button.textContent || "");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !chatbotPanel.hidden) {
    closeChatbot();
  }
});

liveCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactName.value.trim();
  const subject = contactSubject.value.trim();
  const message = contactMessage.value.trim();

  if (!name || !subject || !message) {
    return;
  }

  const bodyText = encodeURIComponent(`Hello Neil,\n\n${message}\n\nFrom,\n${name}`);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=neilfrancisteresa22@gmail.com&su=${encodeURIComponent(subject)}&body=${bodyText}`;

  window.open(gmailUrl, "_blank", "noopener");
});
