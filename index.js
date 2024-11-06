// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function() {
    // Select all 'Add to Order' buttons for individual items and add event listeners to them
    const addToOrderButtons = document.querySelectorAll(".add-to-order");
    addToOrderButtons.forEach(button => {
        button.addEventListener("click", addToCartClicked);  // Add event listener to add items to the cart
    });

    // Select all 'Add Meal to Order' buttons for meal sections and add event listeners to them
    const addMealToOrderButtons = document.querySelectorAll(".meal-header .add-to-order");
    addMealToOrderButtons.forEach(button => {
        button.addEventListener("click", addMealToCartClicked);  // Add event listener for adding meals to cart
    });
});

// Function to add individual item to the cart when the 'Add to Order' button is clicked
function addToCartClicked(event) {
    const button = event.target;  // Get the clicked button
    const menuItem = button.closest(".menu-item, .drink-item, .side-item");  // Find the closest menu item element

    // Extract relevant information from the item
    const itemImageSrc = menuItem.querySelector("img").src;
    const itemName = menuItem.querySelector("h3").innerText;
    const priceText = menuItem.querySelector("#price").innerText;
    const itemPrice = parseFloat(priceText.replace("Price: $", ""));  // Parse the price as a number

    // Add the item to the cart and update the cart total
    addItemToCart(itemImageSrc, itemName, itemPrice);
    updateCartTotal();
}

// Function to add a meal to the cart when the 'Add Meal to Order' button is clicked
function addMealToCartClicked(event) {
    const button = event.target;  // Get the clicked button
    const mealSection = button.closest(".meal-header");  // Find the closest meal section element

    // Extract relevant information from the meal section
    const mealName = mealSection.querySelector("h3").innerText;
    const priceText = mealSection.querySelector("#price").innerText;
    const mealPrice = parseFloat(priceText.replace("Price for all items: $", ""));  // Parse the price as a number

    // Placeholder image for the meal (you can replace this with a specific image URL)
    const placeholderImage = "https://via.placeholder.com/150";

    // Add the meal to the cart and update the cart total
    addMealToCart(placeholderImage, mealName, mealPrice);
    updateCartTotal();
}

// Function to create and add an individual item to the cart
function addItemToCart(imageSrc, name, price) {
    const cartItemsContainer = document.querySelector(".cart-items");  // Find the cart container
    const cartItemNames = cartItemsContainer.querySelectorAll(".cart-item-title");  // Get all item titles in the cart

    // Check if the item is already in the cart
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === name) {
            alert("This item is already added to the cart");  // Alert if the item is already in the cart
            return;
        }
    }

    // Create a new cart row for the item
    const cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");  // Add class to the cart row

    // Add the item details (image, name, price, quantity input, and remove button) to the cart row
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
    cartItemsContainer.append(cartRow);  // Append the cart row to the cart container

    // Add event listeners for quantity changes and item removal
    cartRow.querySelector(".cart-quantity-input").addEventListener("change", quantityChanged);
    cartRow.querySelector(".btn-danger").addEventListener("click", removeCartItem);
}

// Function to create and add a meal to the cart
function addMealToCart(imageSrc, name, price) {
    const cartItemsContainer = document.querySelector(".cart-items");  // Find the cart container
    const cartItemNames = cartItemsContainer.querySelectorAll(".cart-item-title");  // Get all item titles in the cart

    // Check if the meal is already in the cart
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === name) {
            alert("This meal is already added to the cart");  // Alert if the meal is already in the cart
            return;
        }
    }

    // Create a new cart row for the meal
    const cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");  // Add class to the cart row

    // Add the meal details (image, name, price, quantity input, and remove button) to the cart row
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
    cartItemsContainer.append(cartRow);  // Append the cart row to the cart container

    // Add event listeners for quantity changes and item removal
    cartRow.querySelector(".cart-quantity-input").addEventListener("change", quantityChanged);
    cartRow.querySelector(".btn-danger").addEventListener("click", removeCartItem);
}

// Function to update the cart total price based on the cart items
function updateCartTotal() {
    const cartItemContainer = document.querySelector(".cart-items");  // Find the cart items container
    const cartRows = cartItemContainer.querySelectorAll(".cart-row");  // Get all cart rows
    let total = 0;  // Initialize total to 0

    // Calculate the total by summing up the price * quantity for each item in the cart
    cartRows.forEach(row => {
        const priceElement = row.querySelector(".cart-price");
        const quantityElement = row.querySelector(".cart-quantity-input");

        const price = parseFloat(priceElement.innerText.replace('$', ''));  // Get the price for the item
        const quantity = quantityElement.value;  // Get the quantity for the item

        total += price * quantity;  // Add the price * quantity to the total
    });

    // Display the total price in the cart
    document.querySelector(".cart-total-price").innerText = `$${total.toFixed(2)}`;
}

// Function to handle quantity change (ensures quantity is always at least 1)
function quantityChanged(event) {
    const input = event.target;  // Get the changed input
    if (input.value <= 0) {
        input.value = 1;  // If quantity is 0 or less, set it to 1
    }
    updateCartTotal();  // Update the cart total after quantity change
}

// Function to remove an item from the cart when the 'REMOVE' button is clicked
function removeCartItem(event) {
    const buttonClicked = event.target;  // Get the clicked button
    buttonClicked.closest(".cart-row").remove();  // Remove the entire cart row
    updateCartTotal();  // Update the cart total after item removal
}
