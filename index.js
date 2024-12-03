// Function to load the menu data from localStorage (if any) or use the default menu
import { menu } from './managerIndex.js';
function loadMenu() {
  const savedMenu = localStorage.getItem('menu');
  return savedMenu ? JSON.parse(savedMenu) : menu; // Fallback to default menu if no data in localStorage
}

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

// Dynamically render the menu with meals and items
function renderMenu() {
  const menuData = loadMenu(); // Load the menu (from localStorage or default)
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = ''; // Clear existing menu before rendering

  menuData.forEach(meal => {
    const mealElement = document.createElement('div');
    mealElement.classList.add('meal');

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

    mealElement.innerHTML = mealHTML;
    menuContainer.appendChild(mealElement);
  });
}


// Save updated menu to localStorage (for manager integration)
function saveMenu(menuData) {
  localStorage.setItem('menu', JSON.stringify(menuData));
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

// Function to update the cart display
function updateCartDisplay() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalPrice = document.querySelector('.cart-total-price');

  // Clear the cart display
  cartItemsContainer.innerHTML = '';
  let total = 0;

  // Loop through cart items and display them
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-row');
    cartItem.innerHTML = `
      <span class="cart-item">${item.mealName}</span>
      <span class="cart-price">$${item.totalPrice.toFixed(2)}</span>
      <span class="cart-quantity">${item.quantity}</span>
    `;
    cartItemsContainer.appendChild(cartItem);
    total += item.totalPrice * item.quantity;
  });

  // Update the total price
  cartTotalPrice.innerText = `$${total.toFixed(2)}`;
}

// Function to handle the purchase button click
function handlePurchaseClicked() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    alert("Please sign in before trying to purchase items.");
    return; // Prevent the transaction from continuing
  }

  purchaseClicked();
}

// Function to handle purchases
function purchaseClicked() {
  if (cart.length === 0) {
    alert('Your cart is empty. Please add some items to your order.');
    return;
  }

  const orderDetails = cart.map(item => `${item.quantity} x ${item.mealName} - $${(item.totalPrice * item.quantity).toFixed(2)}`).join('\n');
  const totalAmount = cart.reduce((total, item) => total + item.totalPrice * item.quantity, 0).toFixed(2);

  alert(`Your Order:\n${orderDetails}\n\nTotal: $${totalAmount}`);

  // Reset the cart
  cart = [];
  updateCartDisplay();
}

// Review functionality
let reviews = [];

function loadReviews() {
  const savedReviews = localStorage.getItem('reviews');
  return savedReviews ? JSON.parse(savedReviews) : reviews;
}

function saveReview(name, rating, description) {
  const newReview = { name, rating, description, date: new Date().toLocaleString() };
  reviews.push(newReview);
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

function renderReviews() {
  const reviewsData = loadReviews();
  const reviewsContainer = document.querySelector('.reviews-body');
  reviewsContainer.innerHTML = '';

  reviewsData.forEach(review => {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');

    let reviewHTML = `
      <p class="review-name">${review.name}</p>
      <p class="review-rating">Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
      <p class="review-description">${review.description}</p>
      <p class="review-date">${review.date}</p>
    `;

    reviewElement.innerHTML = reviewHTML;
    reviewsContainer.appendChild(reviewElement);
  });
}

function handleReviewSubmission() {
  const nameInput = document.getElementById('full');
  const descriptionInput = document.querySelector('.review-input-body input[type="text"]');

  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();

  const rating = Array.from(document.querySelectorAll('.star-rating i')).filter(star => star.classList.contains('selected')).length;

  if (!name || !description || rating === 0) {
    alert('Please fill in all fields before submitting your review.');
    return;
  }

  saveReview(name, rating, description);
  renderReviews();
  nameInput.value = '';
  descriptionInput.value = '';
  alert('Thank you for your review!');
}

// Rating system functionality
function setRating(rating) {
  const stars = document.querySelectorAll('.star-rating i');
  stars.forEach((star, index) => {
    star.classList.toggle('selected', index < rating);
  });
}

// Initialize the page with the menu and reviews
window.onload = () => {
  renderMenu();
  renderReviews();
};