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
    
    // This is a tracker to see if the user is logged in
    // Used for places where the user must be logged in to do something
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
                location.replace("index.html");
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                alert("Invalid email or password.");
            }
        });
    }

});

