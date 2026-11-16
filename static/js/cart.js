let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

let grandTotal = 0;

cart.forEach((item) => {

    grandTotal += item.price * item.quantity;

    cartItems.innerHTML += `
        <div>
            <img src="${item.image}" width="120">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
        </div>
        <hr>
    `;
});

total.innerHTML = "Total: ₹" + grandTotal;