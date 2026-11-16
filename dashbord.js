// ===============================
// Dashboard Search
// ===============================

const searchInput = document.getElementById("search");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = searchInput.value.toLowerCase();

        const rows = document.querySelectorAll("tbody tr");

        rows.forEach(row => {

            const text = row.textContent.toLowerCase();

            if (text.includes(value)) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });

}

// ===============================
// Sidebar Active Menu
// ===============================

const menuItems = document.querySelectorAll(".sidebar ul li");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(i => i.classList.remove("active"));

        item.classList.add("active");

    });

});

// ===============================
// Notification Button
// ===============================

const notify = document.getElementById("notification");

if (notify) {

    notify.addEventListener("click", () => {

        alert("No new notifications.");

    });

}

// ===============================
// Dashboard Cards Animation
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";
        card.style.transition = "0.3s";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

// ===============================
// Logout
// ===============================

const logoutBtn = document.getElementById("logout");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        const confirmLogout = confirm("Do you want to logout?");

        if (confirmLogout) {

            window.location.href = "signin.html";

        }

    });

}

// ===============================
// Welcome Message
// ===============================

window.addEventListener("load", () => {

    console.log("Welcome to Woolen Craft Studio Admin Dashboard");

});