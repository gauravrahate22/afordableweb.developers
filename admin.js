document.addEventListener('DOMContentLoaded', () => {
  const adminLoggedIn = localStorage.getItem('adminLoggedIn');
  if (!adminLoggedIn) {
    window.location.href = 'login.html';
  }
});

function logout() {
  localStorage.removeItem('adminLoggedIn');
  window.location.href = 'login.html';
}

document.addEventListener("DOMContentLoaded", () => {
  const adminEmail = localStorage.getItem("loggedInAdmin");
  if (adminEmail !== "admin@awd.com") {
    alert("Unauthorized access.");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInAdmin");
    window.location.href = "login.html";
  });

  renderProjects();
});

function renderProjects() {
  const projects = JSON.parse(localStorage.getItem("user_projects")) || [];
  const container = document.getElementById("projectList");
  container.innerHTML = "";

  projects.forEach((p, index) => {
    container.innerHTML += `
      <div class="project-box">
        <p><strong>Email:</strong> ${p.email}</p>
        <p><strong>Website Type:</strong> ${p.type}</p>
        <p><strong>Plan:</strong> ${p.plan}</p>
        <p><strong>Details:</strong> ${p.details}</p>
        <label>Update Progress:</label>
        <select onchange="updateProgress(${index}, this.value)">
          <option value="">Select</option>
          <option value="Pending" ${p.progress === "Pending" ? "selected" : ""}>Pending</option>
          <option value="In Progress" ${p.progress === "In Progress" ? "selected" : ""}>In Progress</option>
          <option value="Completed" ${p.progress === "Completed" ? "selected" : ""}>Completed</option>
        </select>
      </div>
    `;
  });
}

function updateProgress(index, status) {
  const projects = JSON.parse(localStorage.getItem("user_projects")) || [];
  projects[index].progress = status;
  localStorage.setItem("user_projects", JSON.stringify(projects));
  renderProjects();
}

function filterProjects() {
  const emailSearch = document.getElementById("searchEmail").value.toLowerCase();
  const typeFilter = document.getElementById("filterType").value;
  const progressFilter = document.getElementById("filterProgress").value;

  const allProjects = JSON.parse(localStorage.getItem("user_projects")) || [];
  const filtered = allProjects.filter(p => {
    return (
      (emailSearch === "" || p.email.toLowerCase().includes(emailSearch)) &&
      (typeFilter === "" || p.type === typeFilter) &&
      (progressFilter === "" || p.progress === progressFilter)
    );
  });

  const container = document.getElementById("projectList");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `<p>No matching projects found.</p>`;
  } else {
    filtered.forEach((p, index) => {
      container.innerHTML += `
        <div class="project-box">
          <p><strong>Email:</strong> ${p.email}</p>
          <p><strong>Website Type:</strong> ${p.type}</p>
          <p><strong>Plan:</strong> ${p.plan}</p>
          <p><strong>Details:</strong> ${p.details}</p>
          <label>Update Progress:</label>
          <select onchange="updateProgress(${index}, this.value)">
            <option value="">Select</option>
            <option value="Pending" ${p.progress === "Pending" ? "selected" : ""}>Pending</option>
            <option value="In Progress" ${p.progress === "In Progress" ? "selected" : ""}>In Progress</option>
            <option value="Completed" ${p.progress === "Completed" ? "selected" : ""}>Completed</option>
          </select>
        </div>
      `;
    });
  }
}

function exportCSV() {
  const projects = JSON.parse(localStorage.getItem("user_projects")) || [];
  let csv = "Email,Type,Plan,Details,Progress\n";
  projects.forEach(p => {
    csv += `${p.email},${p.type},${p.plan},${p.details},${p.progress || "Pending"}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "project_report.csv";
  a.click();
  URL.revokeObjectURL(url);
}
let logoutTimer;

function resetLogoutTimer() {
  clearTimeout(logoutTimer);
  logoutTimer = setTimeout(() => {
    alert('Session expired due to inactivity. Logging out...');
    logout();
  }, 10 * 60 * 1000); // 10 minutes
}

// Reset timer on activity
['click', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
  document.addEventListener(event, resetLogoutTimer);
});

resetLogoutTimer(); // Start timer on load
