// --- DOM Elements
const loginSection = document.getElementById("loginSection");
const signupSection = document.getElementById("signupSection");
const forgotSection = document.getElementById("forgotSection");
const dashboardSection = document.getElementById("dashboardSection");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const togglePassword = document.getElementById("togglePassword");

// --- Form Validation
function validateForm() {
  const isUsernameValid = usernameInput.value.trim().length > 0;
  const isPasswordValid = passwordInput.value.trim().length > 0;
  loginButton.disabled = !(isUsernameValid && isPasswordValid);
}
usernameInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);

// --- Toggle password
togglePassword.addEventListener("click", function () {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  this.textContent = type === "password" ? "Show" : "Hide";
});

// --- Login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  if (usernameInput.value === storedUsername && passwordInput.value === storedPassword) {
    localStorage.setItem("loggedInUser", storedUsername);
    showSection("dashboard");
  } else {
    alert("❌ Invalid credentials");
  }
});

// --- Signup
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const newUsername = document.getElementById("newUsername").value;
  const newPassword = document.getElementById("newPassword").value;

  localStorage.setItem("username", newUsername);
  localStorage.setItem("password", newPassword);

  alert("✅ Signup successful! Please login.");
  showSection("login");
});

// --- Forgot Password
document.getElementById("forgotForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const user = document.getElementById("forgotUsername").value;
  const newPass = document.getElementById("newPassword").value;

  if (user === localStorage.getItem("username")) {
    localStorage.setItem("password", newPass);
    alert("✅ Password updated! Please login.");
    showSection("login");
  } else {
    alert("⚠ Username not found!");
  }
});

// --- Navigation Links
document.getElementById("signupLink").addEventListener("click", () => showSection("signup"));
document.getElementById("forgotLink").addEventListener("click", () => showSection("forgot"));
document.getElementById("backToLogin1").addEventListener("click", () => showSection("login"));
document.getElementById("backToLogin2").addEventListener("click", () => showSection("login"));

// --- Show Sections
function showSection(section) {
  loginSection.classList.add("hidden");
  signupSection.classList.add("hidden");
  forgotSection.classList.add("hidden");
  dashboardSection.classList.add("hidden");

  if (section === "login") loginSection.classList.remove("hidden");
  if (section === "signup") signupSection.classList.remove("hidden");
  if (section === "forgot") forgotSection.classList.remove("hidden");
  if (section === "dashboard") {
    document.getElementById("usernameDisplay").textContent =
      localStorage.getItem("loggedInUser") || "Guest";
    dashboardSection.classList.remove("hidden");
  }
}

// --- Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  showSection("login");
}

// --- Auto-check login session
if (localStorage.getItem("loggedInUser")) {
  showSection("dashboard");
} else {
  showSection("login");
}
