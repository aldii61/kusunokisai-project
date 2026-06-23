// js/page1.js

// Check if user is logged in & display user status
window.addEventListener("load", function () {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // Tampilkan nama user jika berhasil login
  displayCurrentUser(currentUser);
});

// Tampilkan info user aktif
function displayCurrentUser(currentUser) {
  const userDisplayEl = document.getElementById("user-display");
  if (userDisplayEl) {
    const formattedUser =
      currentUser.charAt(0).toUpperCase() + currentUser.slice(1);
    userDisplayEl.textContent = `👤  ${formattedUser}`;
  }
}

// Fungsi logout (Sama persis dengan halaman index dan normal)
function handleLogout() {
  if (confirm("ログアウトしますか？")) {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }
}

// Mode selection function - 🔥 VERSI AMAN PRIVASI
function startApp(mode) {
  const currentUser = localStorage.getItem("currentUser") || "guest";
  const storageKey = `expenses_${currentUser}`;

  if (!localStorage.getItem(storageKey)) {
    localStorage.setItem(storageKey, JSON.stringify([]));
  }

  if (mode === "easy") {
    window.location.href = "index.html";
  } else if (mode === "normal") {
    window.location.href = "normal.html";
  }
}
