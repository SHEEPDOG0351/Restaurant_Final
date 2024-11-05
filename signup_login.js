// // This section handles the form submission process for the sign-up page.
// // It listens for the form's 'submit' event, prevents the default page reload,
// // and allows us to process the form data with JavaScript instead of sending it to a server.

// // Add an event listener to the sign-up form that listens for the 'submit' event
// document.getElementById('signupForm').addEventListener('submit', function (e) {
//     e.preventDefault(); // Prevent the default form submission behavior (which would refresh the page)

//     // This section retrieves the input values entered by the user in the form fields.
//     // It gathers the name, email, password, and confirm password values to use for sign-up validation and storage.
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;

//     // Validate that the password and confirm password fields match
//     if (password !== confirmPassword) {
//         // If the passwords do not match, alert the user
//         alert("Passwords do not match."); 
//         return; // Exit the function early to prevent further execution
//     }

//     // Create a userData object to store the user's sign-up information
//     const userData = {
//         name: name, // Store the user's full name
//         email: email, // Store the user's email
//         password: password // Store the user's password (In a real application, you would hash this password)
//     };

//     // Store the userData object in local storage
//     // Use the user's email as the key and convert the object to a JSON string for storage
//     /*JavaScript Object Notation, is a lightweight data format that is easy for both humans and machines to read and write.
//       JavaScript objects cannot be stored directly in localStorage because localStorage can only store data as strings.
//       The JSON string is simply a representation of the object with keys and values in quotes, making it easier to store as text. */
//     localStorage.setItem(email, JSON.stringify(userData));

//     // Notify the user that the sign-up was successful
//     alert("Sign-up successful! You can now log in."); 
//     // Redirect the user to the login page after successful sign-up
//     window.location.href = 'login.html'; 
// });

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
            } else {
                alert("Invalid email or password.");
            }
        });
    }
});

