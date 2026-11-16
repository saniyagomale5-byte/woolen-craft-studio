const addBtn = document.getElementById("add-cart");

if (addBtn) {
    addBtn.addEventListener("click", () => {

        const product = {
            name: "Rainbow Wall Hanging",
            price: 799,
            image: "/static/images/il_fullxfull.2499740868_qlia.avif",
            quantity: Number(document.getElementById("quantity").value)
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Product Added to Cart!");
    });
}
// ===============================
// Product Image Gallery
// ===============================

const thumbnails = document.querySelectorAll(".product-icons img");
const mainImage = document.getElementById("main-image");

thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        mainImage.src = thumb.src;
    });
});

// ===============================
// Quantity Increase & Decrease
// ===============================

const quantity = document.getElementById("quantity");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");

if (plus) {
    plus.addEventListener("click", () => {
        quantity.value = parseInt(quantity.value) + 1;
    });
}

if (minus) {
    minus.addEventListener("click", () => {
        if (parseInt(quantity.value) > 1) {
            quantity.value = parseInt(quantity.value) - 1;
        }
    });
}

// ===============================
// Product Color Selection
// ===============================

const colors = document.querySelectorAll(".option");

colors.forEach((color) => {

    color.addEventListener("click", () => {

        colors.forEach(item => item.classList.remove("active"));

        color.classList.add("active");

    });

});

// ===============================
// Wishlist Button
// ===============================

const wishlistBtn = document.getElementById("wishlist-btn");

if (wishlistBtn) {

    wishlistBtn.addEventListener("click", () => {

        if (wishlistBtn.classList.contains("added")) {

            wishlistBtn.classList.remove("added");
            wishlistBtn.innerHTML = "♡ Wishlist";

            alert("Removed from Wishlist");

        } else {

            wishlistBtn.classList.add("added");
            wishlistBtn.innerHTML = "❤️ Added";

            alert("Added to Wishlist");

        }

    });

}

// ===============================
// Buy Now
// ===============================

const buyBtn = document.getElementById("buy-btn");

if (buyBtn) {

    buyBtn.addEventListener("click", () => {

        window.location.href = "checkout.html";

    });

}