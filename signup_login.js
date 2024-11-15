document.addEventListener("DOMContentLoaded", function () {
    // Sign-up form functionality
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Store user data in localStorage
            const userData = { email, password };
            localStorage.setItem(email, JSON.stringify(userData));
            alert("Sign-up successful! You can now log in.");
            window.location.href = 'login.html';
        });
    }
    
    // Initialize login state to 'false'
    localStorage.setItem('isLoggedIn', 'false');
    
    // Login form functionality
    const loginForm = document.querySelector(".input-boxes button");
    if (loginForm) {
        loginForm.addEventListener("click", function () {
            const email = document.getElementById('first').value;
            const password = document.getElementById('last').value;

            // Retrieve user data from localStorage
            const storedUserData = JSON.parse(localStorage.getItem(email));

            if (storedUserData && storedUserData.password === password) {
                // Set the login status to true and store email in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('loggedInEmail', email);  // Store the email of the logged-in user
                location.replace("index.html"); // Redirect to the main page after successful login
            } else {
                alert("Invalid email or password.");
            }
        });
    }
});
