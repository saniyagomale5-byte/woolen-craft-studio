// ==========================
// Order Confirmation
// ==========================

window.addEventListener("load", () => {

    // Random Order ID
    const orderId = document.getElementById("order-id");

    if (orderId) {
        const id = "#WC" + Math.floor(Math.random() * 100000);
        orderId.innerHTML = id;
    }

    // Current Date
    const orderDate = document.getElementById("order-date");

    if (orderDate) {
        const today = new Date();

        orderDate.innerHTML = today.toLocaleDateString();
    }

    // Estimated Delivery
    const delivery = document.getElementById("delivery-date");

    if (delivery) {

        const date = new Date();

        date.setDate(date.getDate() + 5);

        delivery.innerHTML = date.toLocaleDateString();
    }

});

// ==========================
// Continue Shopping
// ==========================

const shopBtn = document.getElementById("shop-btn");

if (shopBtn) {

    shopBtn.addEventListener("click", () => {

        window.location.href = "shop.html";

    });

}

// ==========================
// Go To Home
// ==========================

const homeBtn = document.getElementById("home-btn");

if (homeBtn) {

    homeBtn.addEventListener("click", () => {

        window.location.href = "index.html";

    });

}

// ==========================
// Print Order
// ==========================

const printBtn = document.getElementById("print-btn");

if (printBtn) {

    printBtn.addEventListener("click", () => {

        window.print();

    });

}

// ==========================
// Download Invoice
// ==========================

const invoiceBtn = document.getElementById("invoice-btn");

if (invoiceBtn) {

    invoiceBtn.addEventListener("click", () => {

        alert("Invoice Download Started!");

    });

}