
// DOM Manipulation
const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");

const successMessage = document.getElementById("successMessage");

// Form Submit Event
form.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();

    // Clear previous errors
    nameError.innerText = "";
    emailError.innerText = "";
    passwordError.innerText = "";
    confirmError.innerText = "";
    successMessage.innerText = "";

    // Get input values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    let isValid = true;

    // Name Validation
    if (name === "") {
        nameError.innerText = "Name is required";
        isValid = false;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.innerText = "Email is required";
        isValid = false;
    }
    else if (!emailPattern.test(email)) {
        emailError.innerText = "Enter a valid email";
        isValid = false;
    }

    // Password Validation
    if (password.length < 6) {
        passwordError.innerText =
            "Password must contain at least 6 characters";
        isValid = false;
    }

    // Confirm Password Validation
    if (confirmPassword === "") {
        confirmError.innerText = "Confirm your password";
        isValid = false;
    }
    else if (password !== confirmPassword) {
        confirmError.innerText = "Passwords do not match";
        isValid = false;
    }

    // If validation fails
    if (!isValid) {
        return;
    }

    // Check existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        emailError.innerText = "Email already registered";
        return;
    }

    // Create user object
    const user = {
        name: name,
        email: email,
        password: password
    };

    // Save user in Local Storage
    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    // Success message
    successMessage.innerText = "Signup successful!";

    // Reset form
    form.reset();

    console.log("User Registered Successfully!");
});
