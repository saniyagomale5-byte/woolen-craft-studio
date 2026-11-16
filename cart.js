// ==========================
// Quantity Increase & Decrease
// ==========================

const plusBtns = document.querySelectorAll(".plus");
const minusBtns = document.querySelectorAll(".minus");
const qtyInputs = document.querySelectorAll(".qty");
const prices = document.querySelectorAll(".price");
const totalPrice = document.getElementById("total-price");

function updateTotal() {
    let total = 0;

    qtyInputs.forEach((qty, index) => {
        const price = parseInt(prices[index].dataset.price);
        total += price * parseInt(qty.value);
    });

    if (totalPrice) {
        totalPrice.innerHTML = "₹" + total;
    }
}

plusBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        qtyInputs[index].value++;
        updateTotal();
    });
});

minusBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        if (qtyInputs[index].value > 1) {
            qtyInputs[index].value--;
            updateTotal();
        }
    });
});

// ==========================
// Remove Item
// ==========================

const removeBtns = document.querySelectorAll(".remove-btn");

removeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".cart-item").remove();
        updateTotal();
    });
});

updateTotal();