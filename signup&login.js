// This section handles the form submission process for the sign-up page.
// It listens for the form's 'submit' event, prevents the default page reload,
// and allows us to process the form data with JavaScript instead of sending it to a server.

// Add an event listener to the sign-up form that listens for the 'submit' event
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior (which would refresh the page)

    // This section retrieves the input values entered by the user in the form fields.
    // It gathers the name, email, password, and confirm password values to use for sign-up validation and storage.
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate that the password and confirm password fields match
    if (password !== confirmPassword) {
        // If the passwords do not match, alert the user
        alert("Passwords do not match."); 
        return; // Exit the function early to prevent further execution
    }

    // Create a userData object to store the user's sign-up information
    const userData = {
        name: name, // Store the user's full name
        email: email, // Store the user's email
        password: password // Store the user's password (In a real application, you would hash this password)
    };

    // Store the userData object in local storage
    // Use the user's email as the key and convert the object to a JSON string for storage
    /*JavaScript Object Notation, is a lightweight data format that is easy for both humans and machines to read and write.
      JavaScript objects cannot be stored directly in localStorage because localStorage can only store data as strings.
      The JSON string is simply a representation of the object with keys and values in quotes, making it easier to store as text. */
    localStorage.setItem(email, JSON.stringify(userData));

    // Notify the user that the sign-up was successful
    alert("Sign-up successful! You can now log in."); 
    // Redirect the user to the login page after successful sign-up
    window.location.href = 'login.html'; 
});

document.addEventListener("DOMContentLoaded", function () {
    // Declare globally accessible variables for sign-up and login
    let signUp_email = null;
    let signUp_password = null;

    async function getemailPassword(filePath) {
        try {
            const response = await fetch(filePath);
            const text = await response.text();

            const parser = new DOMParser();
            const externalDoc = parser.parseFromString(text, "text/html");

            // Assign values directly to the global variables
            signUp_email = externalDoc.getElementById("email").value;
            signUp_password = externalDoc.getElementById("password").value;

            return [signUp_email, signUp_password];
        } catch (error) {
            console.error("Error fetching or parsing the file:", error);
            return null;
        }
    }

    // Fetch and set the sign-up values
    getemailPassword("signup.html").then(() => {
        console.log("Sign-up Email:", signUp_email);
        console.log("Sign-up Password:", signUp_password);
    });

    function signup(){
        if (signUp_email && signUp_password) {
            // Store password with email as the key in local storage
            localStorage.setItem(signUp_email, signUp_password);
            console.log("User signed up successfully");
        } else {
            console.log("Sign-up fields are empty or not yet fetched");
        }
    }

    let login_email = null;
    let login_password = null;

    async function loginEmailPassword(filePath2) {
        try {
            const response = await fetch(filePath2);
            const text = await response.text();

            const parser = new DOMParser();
            const externalDoc = parser.parseFromString(text, "text/html");

            // Assign values directly to the global variables
            login_email = externalDoc.getElementById("first").value;
            login_password = externalDoc.getElementById("last").value;

            return [login_email, login_password];
        } catch (error) {
            console.error("Error fetching or parsing the file:", error);
            return null;
        }
    }

    // Fetch and set the login values
    loginEmailPassword("login.html").then(() => {
        console.log("Login Email:", login_email);
        console.log("Login Password:", login_password);
    });

    function login(){
        // Check if the email exists in local storage
        if (localStorage.getItem(login_email)) {
            const storedPassword = localStorage.getItem(login_email);
            if (login_password === storedPassword) {
                // Redirect to the home page
                location.replace("index.html");
            } else {
                alert("Wrong password");
            }
        } else {
            alert("User not found");
        }
    }
});
