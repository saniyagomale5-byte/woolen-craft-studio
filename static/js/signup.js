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

    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirmPassword").value.trim();

    if (name === "" || email === "" || pass === "" || confirm === "") {
        e.preventDefault();
        alert("Please fill all fields.");
        return;
    }

    if (pass !== confirm) {
        e.preventDefault();
        alert("Passwords do not match.");
        return;
    }

});

}