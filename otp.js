document.getElementById("forgot-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("forgot-email").value;

  const res = await fetch("http://localhost:3000/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  const data = await res.json();
  if (data.success) {
    alert("OTP sent to your email.");
    document.getElementById("forgot-form").classList.remove("active");
    document.getElementById("otp-form").classList.add("active");
  } else {
    alert("Error sending OTP: " + data.message);
  }
});

document.getElementById("otp-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("forgot-email").value;
  const otp = document.getElementById("otp-code").value;
  const newPassword = document.getElementById("new-password").value;

  const res = await fetch("http://localhost:3000/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, newPassword })
  });

  const data = await res.json();
  if (data.success) {
    alert("Password updated successfully. You can now log in.");
    document.getElementById("otp-form").classList.remove("active");
    document.getElementById("login-form").classList.add("active");
  } else {
    alert("OTP verification failed: " + data.message);
  }
});
