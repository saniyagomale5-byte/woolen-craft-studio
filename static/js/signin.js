// ==========================
// Show / Hide Password
// ==========================

const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

if (toggle) {

    toggle.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";
            toggle.classList.remove("fa-eye");
            toggle.classList.add("fa-eye-slash");

        } else {

            password.type = "password";
            toggle.classList.remove("fa-eye-slash");
            toggle.classList.add("fa-eye");

        }

    });

}

// ==========================
// Login Validation
// ==========================

const form = document.getElementById("signinForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const pass = document.getElementById("password").value.trim();

        if (email === "" || pass === "") {

            alert("Please fill all fields.");
            return;

        }

        const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email.");
            return;

        }

        alert("Login Successful!");

        window.location.href = "index.html";

    });

}