const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const formTitle = document.getElementById("form-title");
const toggleText = document.getElementById("toggle-text");

function toggleForms() {
  const isLogin = loginForm.classList.contains("active");

  if (isLogin) {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
    formTitle.textContent = "Sign Up";
    toggleText.innerHTML = Already have an account? <a id="toggle-link">Login</a>;
  } else {
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
    formTitle.textContent = "Login";
    toggleText.innerHTML = Don't have an account? <a id="toggle-link">Sign Up</a>;
  }

  document.getElementById("toggle-link").addEventListener("click", toggleForms);
}

document.getElementById("toggle-link").addEventListener("click", toggleForms);
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
//........................................
const apiKey = "bc8dae7bc6051f6a68aaa29e31b5dcef";
const weatherEl = document.getElementById("weather");
const timeEl = document.getElementById("time");

function fetchWeather(lat, lon) {
  const url = https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric;
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch weather");
      return res.json();
    })
    .then(data => {
      const { name, main, weather } = data;
      weatherEl.textContent = Weather in ${name}: ${main.temp}°C, ${weather[0].description};
    })
    .catch(() => {
      weatherEl.textContent = "Unable to fetch weather data.";
    });
}

function fetchPuneWeather() {
  fetchWeather(18.5204, 73.8567); // Pune coords
}

function updateTime() {
  const now = new Date();
  timeEl.textContent = Local Time: ${now.toLocaleTimeString()};
}

updateTime();
setInterval(updateTime, 1000);

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      fetchWeather(pos.coords.latitude, pos.coords.longitude);
    },
    err => {
      fetchPuneWeather();
    },
    { timeout: 10000 }
  );
} else {
  fetchPuneWeather();
}
// Scroll animation (AOS-like fade-in)
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(30px)';
});

const revealSections = () => {
  document.querySelectorAll('.section').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
      section.style.transition = 'all 0.8s ease';
    }
  });
};

window.addEventListener('scroll', revealSections);
revealSections();

// Counter Animation
const animateCounter = (id, target) => {
  let i = 0;
  const step = target / 100;
  const el = document.getElementById(id);
  const interval = setInterval(() => {
    i += step;
    if (i >= target) {
      el.textContent = target;
      clearInterval(interval);
    } else {
      el.textContent = Math.floor(i);
    }
  }, 20);
};

window.addEventListener('load', () => {
  animateCounter("projects", 120);
  animateCounter("clients", 80);
  animateCounter("years", 5);
});
document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {
      title: "E-Commerce Website",
      description: "A full-featured online store with cart and payment gateway.",
      link: "#"
    },
    {
      title: "Portfolio Site",
      description: "Personal portfolio with modern animations and responsive layout.",
      link: "#"
    },
    {
      title: "Restaurant Website",
      description: "Dynamic menu system and online booking for a local restaurant.",
      link: "#"
    }
    // Add more projects here
  ];

  const projectList = document.getElementById("project-list");

  projects.forEach(project => {
    const item = document.createElement("div");
    item.className = "portfolio-item";

    item.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a href="${project.link}" target="_blank">View Project</a>
    `;

    projectList.appendChild(item);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {
      title: "Project 1: E-Commerce Website",
      description: "Online store with cart and payments.",
      link: "project1.html"
    },
    {
      title: "Project 2: Portfolio Site",
      description: "Responsive personal portfolio website.",
      link: "project2.html"
    },
    {
      title: "Project 3: Restaurant Site",
      description: "Menu and booking system.",
      link: "project3.html"
    }
  ];

  const projectList = document.getElementById("project-list");

  projects.forEach(project => {
    const item = document.createElement("div");
    item.className = "portfolio-item";

    item.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a href="${project.link}" target="_blank">View Project</a>
    `;

    projectList.appendChild(item);
  });
});
// TIME
document.addEventListener("DOMContentLoaded", () => {
  // Update Time
  const timeEl = document.getElementById("time");
  const updateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    timeEl.textContent = `Current Time: ${timeString}`;
  };
  updateTime();
  setInterval(updateTime, 1000);

  // Fetch Weather
  const weatherEl = document.getElementById("weather");
  const apiKey = "012d783a5853e40dbe53169e2524f24a"; // Replace with your OpenWeatherMap API key

  function fetchWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].description;
        const city = data.name;
        weatherEl.textContent = `Weather in ${city}: ${temp}°C, ${condition}`;
      })
      .catch(() => {
        weatherEl.textContent = "Weather data unavailable";
      });
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      () => {
        weatherEl.textContent = "Location access denied. Showing Pune weather.";
        fetchWeather(18.5204, 73.8567); // Pune as fallback
      }
    );
  } else {
    weatherEl.textContent = "Geolocation not supported. Showing Pune weather.";
    fetchWeather(18.5204, 73.8567);
  }
});
function animateValue(id, end, duration) {
  const el = document.getElementById(id);
  let start = 0;
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));

  const timer = setInterval(() => {
    start += increment;
    el.textContent = start;
    if (start === end) clearInterval(timer);
  }, stepTime);
}

window.addEventListener("DOMContentLoaded", () => {
  animateValue("projects", 24, 1000);
  animateValue("clients", 12, 1000);
  animateValue("years", 3, 1000);
});
// JS for any interactivity if needed in the future
console.log("Pricing page loaded.");
