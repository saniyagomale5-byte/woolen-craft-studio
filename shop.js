// ===============================
// Product Search
// ===============================

const search = document.getElementById("search");
const products = document.querySelectorAll(".product-card");

if (search) {
    search.addEventListener("keyup", function () {

        const value = search.value.toLowerCase();

        products.forEach(product => {

            const title = product.querySelector("h3").textContent.toLowerCase();

            if (title.includes(value)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }

        });

    });
}

// ===============================
// Category Filter
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.filter;

        products.forEach(product => {

            if (
                category === "all" ||
                product.dataset.category === category
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

});

// ===============================
// Wishlist
// ===============================

const wishlistBtns = document.querySelectorAll(".wishlist-btn");

wishlistBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        btn.classList.toggle("active");

        if (btn.classList.contains("active")) {

            btn.innerHTML = "❤️";

            alert("Added to Wishlist");

        } else {

            btn.innerHTML = "🤍";

            alert("Removed from Wishlist");

        }

    });

});

// ===============================
// Add To Cart
// ===============================

const cartBtns = document.querySelectorAll(".cart-btn");

cartBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        alert("Product Added To Cart");

    });

});

// ===============================
// Product Details
// ===============================

const viewBtns = document.querySelectorAll(".view-btn");

viewBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        window.location.href = "product.html";

    });

});