document.addEventListener("DOMContentLoaded", function () {
    let selectedRating = 0; // Variable to store the selected rating

    // Select all stars, the review button, the review input field, and the name input field
    const stars = document.querySelectorAll(".star-rating .fa-star");
    const reviewButton = document.querySelector(".review-input-body button");
    const reviewInput = document.querySelector(".review-input-body input:nth-of-type(2)");
    const nameInput = document.getElementById("full");
    const reviewSection = document.querySelector(".reviews-main");

    // Function to update star appearance based on rating
    function updateStars(rating) {
        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute("data-value"));
            star.classList.toggle("filled", starValue <= rating);
        });
    }

    // Load reviews from localStorage on page load
    loadReviews();

    // Add click event listener for each star to set the rating
    stars.forEach(star => {
        star.addEventListener("click", function () {
            const ratingValue = parseInt(this.getAttribute("data-value"));
            selectedRating = (selectedRating === ratingValue) ? 0 : ratingValue;
            updateStars(selectedRating);
        });
    });

    // Click event for the review submission button
    reviewButton.addEventListener("click", function () {
        const reviewText = reviewInput.value.trim();
        const userName = nameInput.value.trim();

        // Validate that a rating, name, and review text are provided
        if (selectedRating === 0) {
            alert("Please select a star rating.");
            return;
        }
        if (!userName) {
            alert("Please enter your full name.");
            return;
        }
        if (!reviewText) {
            alert("Please enter a review description.");
            return;
        }

        // Create the review object
        const review = {
            name: userName,
            rating: selectedRating,
            description: reviewText,
        };

        // Save the review to localStorage
        saveReview(review);

        // Display the review in the reviews section
        displayReview(review);

        // Reset the form fields
        selectedRating = 0;
        nameInput.value = "";
        reviewInput.value = "";
        updateStars(0);
    });

    // Function to display a single review on the page
    function displayReview(review) {
        const reviewEntry = document.createElement("div");
        reviewEntry.classList.add("review-entry");

        // Add the review content with name, rating stars, and description
        reviewEntry.innerHTML = `<p><strong>${review.name}</strong></p>
                                 <div id="review-divider" class="divider"></div>
                                 <p id="rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
                                 <p id="review-description">${review.description}</p>`;

        reviewSection.appendChild(reviewEntry);
    }

    // Function to save a review to localStorage
    function saveReview(review) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push(review);
        localStorage.setItem("reviews", JSON.stringify(reviews));
    }

    // Function to load and display all reviews from localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.forEach(displayReview);
    }
});
// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function() {
    // Select the purchase button and add an event listener to handle purchase click
    const purchaseButton = document.querySelector(".btn-purchase");
    purchaseButton.addEventListener("click", handlePurchaseClicked);
    
    // Select all 'Add to Order' buttons for individual items and add event listeners
    const addToOrderButtons = document.querySelectorAll(".add-to-order");
    addToOrderButtons.forEach(button => {
        button.addEventListener("click", addToCartClicked);  // Trigger adding item to the cart
    });

    // Select all 'Add Meal to Order' buttons for meal sections and add event listeners
    const addMealToOrderButtons = document.querySelectorAll(".meal-header .add-to-order");
    addMealToOrderButtons.forEach(button => {
        button.addEventListener("click", addMealToCartClicked);  // Trigger adding meal to the cart
    });
});

// Function to handle the purchase button click
function handlePurchaseClicked() {
    // Capture the cart items container and its rows
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartRows = cartItemsContainer.querySelectorAll(".cart-row");

    let orderDetails = ''; // Store the details of the items in the order
    let totalAmount = 0;  // Initialize the total amount to 0

    // Loop through each cart row to extract item details (name, price, and quantity)
    cartRows.forEach(row => {
        const itemName = row.querySelector(".cart-item-title").innerText;
        const itemPrice = parseFloat(row.querySelector(".cart-price").innerText.replace('$', '')); // Price of the item
        const quantity = parseInt(row.querySelector(".cart-quantity-input").value); // Quantity selected by the user

        const itemTotal = itemPrice * quantity; // Calculate total for this item
        totalAmount += itemTotal; // Add item total to the overall total amount

        // Add item details to the orderDetails string
        orderDetails += `<p>${itemName} - $${itemPrice.toFixed(2)} x ${quantity} = $${itemTotal.toFixed(2)}</p>`;
    });

    // Generate the receipt HTML content to display the order details
    const receiptPage = `
        <html>
            <head>
                <title>Receipt</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 40px;
                    }
                    h1 {
                        color: #333;
                    }
                    .receipt-container {
                        border: 1px solid #ccc;
                        padding: 20px;
                        width: 60%;
                        margin: 0 auto;
                    }
                    .total {
                        font-weight: bold;
                        font-size: 1.2em;
                    }
                </style>
            </head>
            <body>
                <div class="receipt-container">
                    <h1>Your Receipt</h1>
                    <div class="order-details">
                        ${orderDetails}
                    </div>
                    <div class="total">
                        Total: $${totalAmount.toFixed(2)}
                    </div>
                </div>
            </body>
        </html>
    `;

    // Open a new window or tab to display the receipt page
    const newWindow = window.open();
    newWindow.document.write(receiptPage);
    newWindow.document.close();

    // Clear the cart after the purchase and update the cart total
    cartItemsContainer.innerHTML = ''; // Empty the cart items
    updateCartTotal(); // Recalculate the total after clearing the cart
}

// Function to handle adding an individual item to the cart
function addToCartClicked(event) {
    const button = event.target; // Get the button that was clicked
    const menuItem = button.closest(".menu-item, .drink-item, .side-item"); // Find the closest item (menu, drink, or side)

    const itemImageSrc = menuItem.querySelector("img").src; // Get the image source of the item
    const itemName = menuItem.querySelector("h3").innerText; // Get the name of the item
    const priceText = menuItem.querySelector("#price").innerText; // Get the price text of the item
    const itemPrice = parseFloat(priceText.replace("Price: $", "")); // Convert the price to a number

    // Add the item to the cart and update the cart total
    addItemToCart(itemImageSrc, itemName, itemPrice);
    updateCartTotal();
}

// Function to handle adding a meal (with multiple items) to the cart
function addMealToCartClicked(event) {
    const button = event.target; // Get the button that was clicked
    const mealSection = button.closest(".meal-header"); // Find the closest meal section

    const mealName = mealSection.querySelector("h3").innerText; // Get the name of the meal
    const priceText = mealSection.querySelector("#price").innerText; // Get the price text for the meal
    const mealPrice = parseFloat(priceText.replace("Price for all items: $", "")); // Extract the price as a number

    // Placeholder image for the meal (replace with actual image if needed)
    const placeholderImage = "https://via.placeholder.com/150";

    // Add the meal to the cart and update the cart total
    addMealToCart(placeholderImage, mealName, mealPrice);
    updateCartTotal();
}

// Function to add an individual item to the cart
function addItemToCart(imageSrc, name, price) {
    const cartItemsContainer = document.querySelector(".cart-items"); // Get the cart container
    const cartItemNames = cartItemsContainer.querySelectorAll(".cart-item-title"); // Get all the item names in the cart

    // Check if the item is already in the cart, if so, don't add it again
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === name) {
            alert("This item is already added to the cart");
            return; // Exit the function if item already in cart
        }
    }

    // Create a new row for the item in the cart
    const cartRow = document.createElement("div");
    cartRow.classList.add("cart-row"); // Add the class for cart row styling

    const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100"> <!-- Item image -->
            <span class="cart-item-title">${name}</span> <!-- Item name -->
        </div>
        <span class="cart-price cart-column">$${price.toFixed(2)}</span> <!-- Item price -->
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1"> <!-- Quantity input -->
            <button class="btn btn-danger" type="button">REMOVE</button> <!-- Remove button -->
        </div>
    `;
    cartRow.innerHTML = cartRowContents;
    cartItemsContainer.append(cartRow); // Append the new row to the cart

    // Add event listeners to the quantity input and remove button
    cartRow.querySelector(".cart-quantity-input").addEventListener("change", quantityChanged);
    cartRow.querySelector(".btn-danger").addEventListener("click", removeCartItem);
}

// Function to add a meal to the cart
function addMealToCart(imageSrc, name, price) {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartItemNames = cartItemsContainer.querySelectorAll(".cart-item-title");

    // Check if the meal is already in the cart
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === name) {
            alert("This meal is already added to the cart");
            return;
        }
    }

    // Add the meal to the cart as a new row
    const cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");

    const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${name}</span>
        </div>
        <span class="cart-price cart-column">$${price.toFixed(2)}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `;
    cartRow.innerHTML = cartRowContents;
    cartItemsContainer.append(cartRow);

    // Add event listeners for the quantity input and remove button
    cartRow.querySelector(".cart-quantity-input").addEventListener("change", quantityChanged);
    cartRow.querySelector(".btn-danger").addEventListener("click", removeCartItem);
}

// Function to update the cart total price
function updateCartTotal() {
    const cartItemContainer = document.querySelector(".cart-items"); // Get the cart container
    const cartRows = cartItemContainer.querySelectorAll(".cart-row"); // Get all cart rows
    let total = 0; // Initialize total price to 0

    // Loop through each cart row to calculate the total price
    cartRows.forEach(row => {
        const priceElement = row.querySelector(".cart-price");
        const quantityElement = row.querySelector(".cart-quantity-input");

        const price = parseFloat(priceElement.innerText.replace('$', '')); // Get the item price
        const quantity = quantityElement.value; // Get the item quantity

        total += price * quantity; // Add the price times quantity to the total
    });

    // Update the cart total price on the page
    document.querySelector(".cart-total-price").innerText = `$${total.toFixed(2)}`;
}

// Function to handle quantity change
function quantityChanged(event) {
    const input = event.target;
    if (input.value <= 0) {
        input.value = 1; // Prevent the quantity from being 0 or negative
    }
    updateCartTotal(); // Recalculate the cart total after the quantity change
}

// Function to remove an item from the cart
function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest(".cart-row").remove(); // Remove the item row from the cart
    updateCartTotal(); // Recalculate the cart total after removal
}
