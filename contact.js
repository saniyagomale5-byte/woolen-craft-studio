// ==========================
// Contact Form Validation
// ==========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Check Empty Fields
        if (name === "" || email === "" || subject === "" || message === "") {

            alert("Please fill all fields.");
            return;
        }

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");
            return;
        }

        // Success Message
        alert("Message sent successfully!");

        // Reset Form
        contactForm.reset();

    });

}

// ==========================
// Character Counter
// ==========================

const messageBox = document.getElementById("message");
const counter = document.getElementById("counter");

if (messageBox && counter) {

    messageBox.addEventListener("input", () => {

        counter.innerHTML =
            messageBox.value.length + " / 500 Characters";

    });

}