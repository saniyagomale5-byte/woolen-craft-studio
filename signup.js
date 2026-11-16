// ==========================
// Show / Hide Password
// ==========================

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("togglePassword");

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";
            confirmPassword.type = "text";

            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");

        } else {

            password.type = "password";
            confirmPassword.type = "password";

            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");

        }

    });

}

// ==========================
// Signup Validation
// ==========================

const form = document.getElementById("signupForm");

if (form) {

    form.addEventListener("submit", function (e) {

        //e.preventDefault();

        const name = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const pass = document.getElementById("password").value.trim();
        const confirm = document.getElementById("confirmPassword").value.trim();

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            pass === "" ||
            confirm === ""
        ) {

            alert("Please fill all fields.");
            return;

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Enter a valid email address.");
            return;

        }

        const phonePattern = /^[0-9]{10}$/;

        if (!phonePattern.test(phone)) {

            alert("Enter a valid 10-digit mobile number.");
            return;

        }

        if (pass.length < 6) {

            alert("Password must be at least 6 characters.");
            return;

        }

        if (pass !== confirm) {

            alert("Passwords do not match.");
            return;

        }

        alert("Account Created Successfully!");

        window.location.href = "signin.html";

    });

}