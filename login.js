document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const forgotForm = document.getElementById("forgot-form");
  const formTitle = document.getElementById("form-title");

  // Admin credentials (static)
  const ADMIN_EMAIL = "admin@awd.com";
  const ADMIN_PASSWORD = "admin123";

  const getUsers = () => JSON.parse(localStorage.getItem("awd_users")) || [];
  const setUsers = (users) => localStorage.setItem("awd_users", JSON.stringify(users));

  const showForm = (formType) => {
    loginForm.classList.remove("active");
    signupForm.classList.remove("active");
    forgotForm.classList.remove("active");

    if (formType === "login") {
      loginForm.classList.add("active");
      formTitle.textContent = "Login";
    } else if (formType === "signup") {
      signupForm.classList.add("active");
      formTitle.textContent = "Sign Up";
    } else {
      forgotForm.classList.add("active");
      formTitle.textContent = "Forgot Password";
    }
  };

  // Nav Events
  document.getElementById("show-signup").addEventListener("click", (e) => {
    e.preventDefault();
    showForm("signup");
  });

  document.getElementById("show-login").addEventListener("click", (e) => {
    e.preventDefault();
    showForm("login");
  });

  document.getElementById("show-forgot").addEventListener("click", (e) => {
    e.preventDefault();
    showForm("forgot");
  });

  document.getElementById("back-to-login").addEventListener("click", (e) => {
    e.preventDefault();
    showForm("login");
  });

  // LOGIN
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const role = document.getElementById("login-role").value;

    if (!role) return alert("Please select a role.");

    if (role === "admin") {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("loggedInAdmin", ADMIN_EMAIL);
        window.location.href = "admin.html";
      } else {
        alert("Invalid admin credentials.");
      }
      return;
    }

    // USER login
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("loggedInUser", email);
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid user credentials.");
    }
  });

  // SIGNUP
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const role = document.getElementById("signup-role").value;

    if (!role) return alert("Please select a role.");
    if (role === "admin") {
      alert("Admin account already exists.");
      return;
    }

    const users = getUsers();
    const exists = users.some(u => u.email === email);
    if (exists) {
      alert("Email already registered.");
      showForm("login");
    } else {
      users.push({ name, email, password });
      setUsers(users);
      alert("Signup successful. Please login.");
      showForm("login");
    }
  });

  // FORGOT PASSWORD
  forgotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("forgot-email").value.trim();
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (email === ADMIN_EMAIL) {
      alert(`Admin password is: ${ADMIN_PASSWORD}`);
    } else if (user) {
      alert(`Your password is: ${user.password}`);
    } else {
      alert("No account found.");
    }

    showForm("login");
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const forgotForm = document.getElementById('forgot-form');
  const otpForm = document.getElementById('otp-form');

  const showForm = (form) => {
    [loginForm, signupForm, forgotForm, otpForm].forEach(f => f.classList.remove('active'));
    form.classList.add('active');
  };

  document.getElementById('show-signup').onclick = () => showForm(signupForm);
  document.getElementById('show-login').onclick = () => showForm(loginForm);
  document.getElementById('show-forgot').onclick = () => showForm(forgotForm);
  document.getElementById('back-to-login').onclick = () => showForm(loginForm);
  document.getElementById('back-to-login-from-otp').onclick = () => showForm(loginForm);

  forgotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;

    const res = await fetch('/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    alert(data.message);
    showForm(otpForm);
  });

  otpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;
    const otp = document.getElementById('otp-code').value;
    const newPass = document.getElementById('new-password').value;

    const res = await fetch('/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });

    const result = await res.json();

    if (result.valid) {
      alert(`Password changed successfully for ${email} to: ${newPass}`);
      showForm(loginForm);
    } else {
      alert("Invalid OTP. Try again.");
    }
  });
});
document.getElementById("show-forgot").onclick = () => {
  toggleForms("forgot-form");
};

document.getElementById("back-to-login").onclick = () => {
  toggleForms("login-form");
};

document.getElementById("back-to-login-from-otp").onclick = () => {
  toggleForms("login-form");
};

document.getElementById("show-signup").onclick = () => {
  toggleForms("signup-form");
};

document.getElementById("show-login").onclick = () => {
  toggleForms("login-form");
};

function toggleForms(showId) {
  document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));
  document.getElementById(showId).classList.add("active");
}
