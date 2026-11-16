// ==========================
// Checkout Form Validation
// ==========================

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = form.querySelector("input[type='text']").value;
        const email = form.querySelector("input[type='email']").value;
        const phone = form.querySelector("input[placeholder='Phone Number']").value;
        const address = form.querySelector("textarea").value;

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            address === ""
        ) {

            alert("Please fill all required fields.");

            return;
        }

        alert("Order Placed Successfully!");

        window.location.href = "order-confirmation.html";

    });

}