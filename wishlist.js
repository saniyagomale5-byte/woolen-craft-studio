// ==========================
// Remove Wishlist Item
// ==========================

const removeButtons = document.querySelectorAll(".remove");

removeButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.closest(".card").remove();

        alert("Item removed from Wishlist");

    });

});

// ==========================
// Move To Cart
// ==========================

const cartButtons = document.querySelectorAll(".cart");

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert("Product added to Cart");

    });

});