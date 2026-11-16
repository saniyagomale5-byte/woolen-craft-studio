// =============================
// Woolen Craft Studio
// craft.js
// =============================

// Mobile Menu
const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");

if (menu) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// Sticky Header
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (header) {
        if (window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
});

// Search
const search = document.getElementById("search");

if (search) {

    search.addEventListener("keyup", () => {

        const value = search.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            card.style.display =
                title.includes(value) ? "block" : "none";

        });

    });

}

// Newsletter Form
const newsletter = document.getElementById("newsletterForm");

if (newsletter) {

    newsletter.addEventListener("submit", (e) => {

        e.preventDefault();

        alert("Thank you for subscribing!");

        newsletter.reset();

    });

}

// Scroll To Top
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (topBtn) {

        topBtn.style.display =
            window.scrollY > 300 ? "block" : "none";

    }

});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}