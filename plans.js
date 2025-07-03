function selectPlan(planName) {
  const currentUser = localStorage.getItem("loggedInUser");
  if (!currentUser) {
    alert("Session expired. Please log in again.");
    window.location.href = "login.html";
    return;
  }

  let projects = JSON.parse(localStorage.getItem("user_projects")) || [];

  // Find the latest project for this user (last submitted one)
  const index = projects
    .map((p, i) => ({ ...p, i }))
    .reverse()
    .find(p => p.email === currentUser)?.i;

  if (index !== undefined) {
    projects[index].plan = planName;
    localStorage.setItem("user_projects", JSON.stringify(projects));
    alert(`You have selected the ${planName}. Payment Successful!`);
    window.location.href = "dashboard.html";
  } else {
    alert("No project found to attach plan. Please apply for a project first.");
    window.location.href = "dashboard.html";
  }
}
