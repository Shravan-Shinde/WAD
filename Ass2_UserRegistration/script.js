document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        phone: document.getElementById("phone").value,
        city: document.getElementById("city").value,
        password: document.getElementById("password").value
    };

    // Save to localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // AJAX POST (Dummy API)
    fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            alert("User Registered Successfully!");
            document.getElementById("userForm").reset();
        })
        .catch(err => console.log(err));
});