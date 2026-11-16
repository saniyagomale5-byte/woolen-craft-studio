// =============================
// Edit Profile
// =============================

const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");

const inputs = document.querySelectorAll(".profile-input");

if (editBtn) {

    editBtn.addEventListener("click", () => {

        inputs.forEach(input => {

            input.removeAttribute("readonly");

        });

        alert("You can now edit your profile.");

    });

}

// =============================
// Save Profile
// =============================

if (saveBtn) {

    saveBtn.addEventListener("click", () => {

        let isEmpty = false;

        inputs.forEach(input => {

            if (input.value.trim() === "") {

                isEmpty = true;

            }

            input.setAttribute("readonly", true);

        });

        if (isEmpty) {

            alert("Please fill all fields.");

            return;

        }

        alert("Profile Updated Successfully!");

    });

}

// =============================
// Change Profile Picture
// =============================

const profileImage = document.getElementById("profileImage");
const imageInput = document.getElementById("imageInput");

if (imageInput) {

    imageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (file) {

            const reader = new FileReader();

            reader.onload = function (e) {

                profileImage.src = e.target.result;

            };

            reader.readAsDataURL(file);

        }

    });

}

// =============================
// Logout
// =============================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            window.location.href = "signin.html";

        }

    });

}