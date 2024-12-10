
const nav = document.querySelector("nav");
window.addEventListener("scroll", function () {
  const navHeight = nav.offsetHeight;
  if (window.scrollY > navHeight) {
    nav.classList.add("scrolled");
    console.log("Scrolled class added");
  } else {
    nav.classList.remove("scrolled");
    console.log("Scrolled class removed");
  }
});

function renderMenu() {
  const menuContainer = document.getElementById('menu-container'); // Get the menu container
  const menuData = JSON.parse(localStorage.getItem('menu')) || []; // Retrieve menu data from local storage

  menuContainer.innerHTML = ''; // Clear any existing content in the menu container

  menuData.forEach(meal => {
    const mealElement = document.createElement('div');
    mealElement.classList.add('meal'); // Add class for styling

    // Add meal title and total price
    let mealHTML = `
      <h3 class="meal-title">${meal.meal} - $${(meal.totalPrice || 0).toFixed(2)}</h3>
      <div class="meal-items">
    `;

    // Loop through each item in the meal and add it to the HTML
    meal.items.forEach(item => {
      const itemPrice = parseFloat(item.price) || 0; // Ensure price is a number
      mealHTML += `
        <div class="meal-item">
          <img src="${item.image}" alt="${item.name}" class="meal-item-image">
          <h4 class="meal-item-name">${item.name}</h4>
          <p class="meal-item-description">${item.description}</p>
          <p class="meal-item-price">$${itemPrice.toFixed(2)}</p>
        </div>
      `;
    });

    mealHTML += `
      </div>
      <button class="btn btn-primary add-to-order" onclick="addToOrder('${meal.meal}', ${meal.totalPrice})">Add to Order</button>
    `;

    mealElement.innerHTML = mealHTML; // Set the generated HTML
    menuContainer.appendChild(mealElement); // Append the meal to the container
  });
}


// Function to handle adding items to the cart
let cart = [];

function addToOrder(mealName, totalPrice) {
  const item = { mealName, totalPrice, quantity: 1 };

  // Check if meal already exists in the cart
  const existingItemIndex = cart.findIndex(cartItem => cartItem.mealName === mealName);
  if (existingItemIndex > -1) {
    // Update the quantity if the meal already exists
    cart[existingItemIndex].quantity++;
  } else {
    // Add new meal to the cart
    cart.push(item);
  }

  updateCartDisplay();
}

window.addToOrder = addToOrder; // Attach the function to window

// Function to update the cart display
function updateCartDisplay() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalPrice = document.querySelector('.cart-total-price');
  let total = 0;

  cartItemsContainer.innerHTML = ''; // Clear the cart display

  // Loop through cart items and display them
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-row');
    cartItem.innerHTML = `
      <span class="cart-item">${item.mealName}</span>
      <span class="cart-price">$${item.totalPrice.toFixed(2)}</span>
      <span class="cart-quantity">Quantity: ${item.quantity}</span>
      <button class="btn btn-danger btn-remove" onclick="removeFromOrder(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
    total += item.totalPrice * item.quantity;
  });

  // Update the total price
  cartTotalPrice.innerText = `$${total.toFixed(2)}`;
}

// Function to remove an item from the order
function removeFromOrder(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--; // Decrease quantity by 1
  } else {
    cart.splice(index, 1); // Remove the item if quantity is 1
  }
  updateCartDisplay(); // Update the cart display
}

window.removeFromOrder = removeFromOrder;

// Function to handle the purchase button click
function handlePurchaseClicked() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    alert("Please sign in before trying to purchase items.");
    return; // Prevent the transaction from continuing
  }

  purchaseClicked();
}

window.handlePurchaseClicked = handlePurchaseClicked;

// Function to handle purchases
function purchaseClicked() {
  if (cart.length === 0) {
    alert('Your cart is empty. Please add some items to your order.');
    return;
  }

  const tipInput = document.getElementById('tip-input').value || 0;
  const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

  const orderDetails = cart.map(item => `${item.quantity} x ${item.mealName} - $${(item.totalPrice * item.quantity).toFixed(2)}`).join('\n');
  const totalAmount = cart.reduce((total, item) => total + item.totalPrice * item.quantity, 0) + parseFloat(tipInput);

  // Retrieve the username/email from localStorage
  const email = localStorage.getItem('loggedInEmail');
  alert(`Your Order:\n${orderDetails}\n\nTip: $${parseFloat(tipInput).toFixed(2)}\nPayment Method: ${selectedPaymentMethod}\nTotal: $${totalAmount.toFixed(2)}\n\nOrder placed by: ${email}`);
  
  // Reset the cart
  cart = [];
  updateCartDisplay();
}

// Review functionality
let reviews = [];

function loadReviews() {
  const savedReviews = localStorage.getItem('reviews');
  return savedReviews ? JSON.parse(savedReviews) : [];
}


function saveReview(name, rating, description) {
  const existingReviews = safeParse(localStorage.getItem('reviews'));
  const newReview = { name, rating, description, date: new Date().toLocaleString() };
  existingReviews.push(newReview);
  localStorage.setItem('reviews', JSON.stringify(existingReviews));
}

function safeParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return []; // Default to an empty array on parse failure
  }
}


function renderReviews() {
  const reviewsData = loadReviews(); // Load saved reviews
  const reviewsContainer = document.getElementById('reviews-list');
  reviewsContainer.innerHTML = ''; // Clear the existing content

  if (reviewsData && reviewsData.length) {
    reviewsData.forEach(review => {
      const reviewElement = document.createElement('div');
      reviewElement.classList.add('review', 'review-entry');

      // Construct review HTML
      const reviewHTML = `
        <p class="review-name">${review.name}</p>
        <p id="rating" class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
        <p id="review-description" class="review-description">${review.description}</p>
        <p class="review-date">${review.date}</p>
      `;

      reviewElement.innerHTML = reviewHTML; // Assign the constructed HTML
      reviewsContainer.appendChild(reviewElement); // Add to container
    });
  } else {
    reviewsContainer.innerHTML = '<p>No reviews yet. Be the first to leave a review!</p>';
  }
}


window.handleReviewSubmission = handleReviewSubmission;

function handleReviewSubmission() {
  const nameInput = document.getElementById('full');
  const descriptionInput = document.getElementById('review-description');

  if (!nameInput || !descriptionInput) {
    console.error("Input elements not found");
    return;
  }

  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!name || !description || currentRating === 0) {
    alert('Please fill in all fields and provide a rating before submitting your review.');
    return;
  }

  // Save the review and re-render
  saveReview(name, currentRating, description);
  renderReviews();

  // Reset input fields
  nameInput.value = '';
  descriptionInput.value = '';
  setRating(0); // Reset star rating
  currentRating = 0;

  alert('Thank you for your review!');
}


let currentRating = 0

// Rating system functionality
function setRating(rating) {
  currentRating = rating; // Update the global variable
  const stars = document.querySelectorAll('.star-rating i');
  stars.forEach((star, index) => {
    // Add the "filled" class to all stars before and including the clicked star
    star.classList.toggle('filled', index < rating);
  });
}

window.setRating = setRating

// Initialize the page with the menu and reviews
window.onload = () => {
  if (!localStorage.getItem('reviews')) {
    localStorage.setItem('reviews', JSON.stringify([]));
  }
  renderMenu();
  renderReviews();
};