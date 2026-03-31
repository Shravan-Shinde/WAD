const API = "https://jsonplaceholder.typicode.com/users";

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  loadUsers();
  document.getElementById("userForm").addEventListener("submit", handleSubmit);
});

// ================= LOAD USERS =================
function loadUsers() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("users", JSON.stringify(data));
      renderUsers();
    })
    .catch(err => console.error("Error:", err));
}

// ================= RENDER USERS =================
function renderUsers() {
  const table = document.getElementById("userTable");
  table.innerHTML = "";

  const users = JSON.parse(localStorage.getItem("users")) || [];

  users.forEach((user, i) => {
    const row = `
      <tr>
        <td>${i + 1}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.address?.city || "N/A"}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

// ================= HANDLE FORM =================
function handleSubmit(e) {
  e.preventDefault();

  const user = getFormData();

  sendToAPI(user);
}

// ================= GET FORM DATA =================
function getFormData() {
  return {
    name: document.getElementById("name").value,
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
    address: {
      city: document.getElementById("city").value
    }
  };
}

// ================= API POST =================
function sendToAPI(user) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(() => {
      saveToLocal(user);
      renderUsers();
      clearForm();
      alert("User Added Successfully ✅");
    })
    .catch(err => console.error("Error:", err));
}

// ================= LOCAL STORAGE =================
function saveToLocal(user) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.unshift(user);
  localStorage.setItem("users", JSON.stringify(users));
}

// ================= CLEAR FORM =================
function clearForm() {
  document.getElementById("userForm").reset();
}