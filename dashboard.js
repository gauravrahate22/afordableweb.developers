document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    window.location.href = 'login.html';
  } else {
    const welcome = document.getElementById('welcome-user');
    if (welcome) {
      welcome.textContent = `Welcome, ${loggedInUser}`;
    }
  }
});

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  const toggleModeBtn = document.getElementById('toggleMode');

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
  });

  toggleModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  showSection('view');
});

function showSection(section) {
  const email = localStorage.getItem('loggedInUser');
  if (!email) {
    alert("Session expired. Please login again.");
    window.location.href = "login.html";
    return;
  }

  if (section === 'view') renderProjects(email);
  else if (section === 'apply') renderApplyForm();
  else if (section === 'payment') window.location.href = "plans.html";
  else if (section === 'progress') renderProjectProgress(email);
}

function renderProjects(email) {
  const projects = JSON.parse(localStorage.getItem("user_projects") || "[]");
  const userProjects = projects.filter(p => p.email === email);

  let html = `<h2>Your Projects</h2>`;
  if (!userProjects.length) html += `<p>No projects found.</p>`;
  else userProjects.forEach(proj => {
    html += `
      <div class="project-box">
        <p><strong>Type:</strong> ${proj.type}</p>
        <p><strong>Plan:</strong> ${proj.plan}</p>
        <p><strong>Details:</strong> ${proj.details}</p>
        <p><strong>Progress:</strong> ${proj.progress || 'Pending'}</p>
      </div>`;
  });

  document.getElementById("mainContent").innerHTML = html;
}

// Apply for new project with plan selection
function renderApplyForm() {
  const html = `
    <h2>Apply for a New Project</h2>
    <form class="project-form" onsubmit="submitProjectForm(event)">
      <label for="websiteType">Website Type</label>
      <select id="websiteType" required>
        <option value="">Select a type</option>
        <option value="Commercial">Commercial</option>
        <option value="Portfolio">Portfolio</option>
        <option value="Personal">Personal</option>
        <option value="eCommerce">eCommerce</option>
        <option value="Blog">Blog</option>
        <option value="Educational">Educational</option>
        <option value="Non-profit">Non-profit</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Landing Page">Landing Page</option>
      </select>

      <label for="projectDetails">Describe Your Project</label>
      <textarea id="projectDetails" rows="4" required placeholder="Tell us how you want your website to look and function..."></textarea>

      <label for="mediaUpload">Upload Reference Files (Optional)</label>
      <input type="file" id="mediaUpload" accept="image/*,.pdf,.doc,.docx" />

      <label for="planSelect">Select Plan</label>
      <select id="planSelect" required>
        <option value="">Choose a plan</option>
        <option value="Basic">Basic</option>
        <option value="Standard">Standard</option>
        <option value="Premium">Premium</option>
      </select>

      <button class="btn" type="submit">Proceed to Payment</button>
    </form>
  `;
  document.getElementById("mainContent").innerHTML = html;
}

// Handle submission with plan
function submitProjectForm(e) {
  e.preventDefault();
  const websiteType = document.getElementById('websiteType').value;
  const projectDetails = document.getElementById('projectDetails').value;
  const media = document.getElementById('mediaUpload').files[0];
  const plan = document.getElementById('planSelect').value;
  const email = localStorage.getItem('loggedInUser');

  const data = {
    type: websiteType,
    details: projectDetails,
    mediaName: media ? media.name : null,
    plan: plan,
    email: email,
    progress: "Pending"
  };

  localStorage.setItem('project_form_data', JSON.stringify(data));
  window.location.href = 'plans.html';
}


function renderProjectProgress(email) {
  const projects = JSON.parse(localStorage.getItem("user_projects") || "[]");
  const userProjects = projects.filter(p => p.email === email);

  let html = `<h2>Project Progress</h2>`;
  if (!userProjects.length) html += `<p>No projects found.</p>`;
  else userProjects.forEach(p => {
    html += `
      <div class="project-box">
        <p><strong>Type:</strong> ${p.type}</p>
        <p><strong>Plan:</strong> ${p.plan}</p>
        <p><strong>Status:</strong> ${p.progress || 'Pending'}</p>
      </div>`;
  });

  document.getElementById("mainContent").innerHTML = html;
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
