// Initial Default Menu Data
export const defaultMenu = [
  {
    meal: "Grilled Salmon Meal", totalPrice: 36.97,
    items: [
      { name: "Grilled Salmon", description: "A perfectly grilled salmon with a side of vegetables.", price: 12.99, image: "https://www.wholesomeyum.com/wp-content/uploads/2023/05/wholesomeyum-Grilled-Salmon-10-500x500.jpg" },
      { name: "Green Bean Casserole", description: "A savory green bean casserole to complement your meal.", price: 8.99, image: "https://thecozyapron.com/wp-content/uploads/2012/11/green-bean-casserole_thecozyapron_1.jpg" },
      { name: "White Wine", description: "A crisp glass of white wine to complement the salmon.", price: 9.99, image: "https://www.wine-searcher.com/images/wine_style/white-buttery-and-complex-8-1-2.jpg?width=734" }
    ]
  },
  {
    meal: "Classic Burger Meal", totalPrice: 22.97,
    items: [
      { name: "Classic Burger", description: "Juicy beef patty with lettuce, tomato, and cheese.", price: 11.99, image: "https://www.munchkintime.com/wp-content/uploads/2017/06/Best-Hamburger-Recipe-to-make-for-Fathers-Day-from-Munchkintime.com-46.jpg" },
      { name: "French Fries", description: "Crispy French fries seasoned to perfection.", price: 4.99, image: "https://live.staticflickr.com/4555/38309468832_94d1e3c0f0_h.jpg" },
      { name: "Craft Beer", description: "A cold, refreshing craft beer that pairs well with a burger.", price: 5.99, image: "https://catalogue.novascotia.com/ManagedMedia/25567.jpg" }
    ]
  },
  // Additional meals here...
];

// Function to Load Menu Data
function loadMenu() {
  const storedMenu = JSON.parse(localStorage.getItem('menu')) || [];
  const mergedMenu = [...storedMenu];

  // Add missing default meals
  defaultMenu.forEach(defaultMeal => {
    if (!storedMenu.some(storedMeal => storedMeal.meal === defaultMeal.meal)) {
      mergedMenu.push(defaultMeal);
    }
  });

  localStorage.setItem('menu', JSON.stringify(mergedMenu)); // Update localStorage
  return mergedMenu;
}

// Global Menu Variable
export let menu = loadMenu();

// Save Menu to LocalStorage
function saveMenuToLocalStorage() {
  localStorage.setItem('menu', JSON.stringify(menu));
}

// Render the Menu
function renderMenu() {
  const menuContainer = document.getElementById('menu-container');
  if (!menuContainer) return; // Avoid errors if the container doesn't exist

  menuContainer.innerHTML = ''; // Clear previous content
  menu.forEach(meal => {
    const mealElement = document.createElement('div');
    mealElement.classList.add('meal');

    mealElement.innerHTML = `
      <h3 class="meal-title">${meal.meal} - $${meal.totalPrice.toFixed(2)}</h3>
      <div class="meal-items">
        ${meal.items.map(item => `
          <div class="meal-item">
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}: $${item.price.toFixed(2)}</p>
          </div>
        `).join('')}
      </div>
    `;
    menuContainer.appendChild(mealElement);
  });
}

// Initialize Manager Page
function initializeManagerPage() {
  const addMealButton = document.getElementById('add-meal-btn');
  if (addMealButton) {
    addMealButton.addEventListener('click', addNewMeal);
  }
  renderMenu(); // Render the menu
}

// Add a New Meal
function addNewMeal() {
  const mainDishName = prompt("Enter the main dish name:");
  const mainDishDescription = prompt("Enter the main dish description:");
  const mainDishPrice = parseFloat(prompt("Enter the main dish price:"));
  const mainDishImage = prompt("Enter the main dish image URL:");
  const sideDishName = prompt("Enter the side dish name:");
  const sideDishDescription = prompt("Enter the side dish description:");
  const sideDishPrice = parseFloat(prompt("Enter the side dish price:"));
  const sideDishImage = prompt("Enter the side dish image URL:");
  const drinkName = prompt("Enter the drink name:");
  const drinkDescription = prompt("Enter the drink description:");
  const drinkPrice = parseFloat(prompt("Enter the drink price:"));
  const drinkImage = prompt("Enter the drink image URL:");
  
  const newMeal = {
    meal: mainDishName + " Meal",
    totalPrice: mainDishPrice + sideDishPrice + drinkPrice,
    items: [
      { name: mainDishName, description: mainDishDescription, price: mainDishPrice, image: mainDishImage },
      { name: sideDishName, description: sideDishDescription, price: sideDishPrice, image: sideDishImage },
      { name: drinkName, description: drinkDescription, price: drinkPrice, image: drinkImage }
    ]
  };

  menu.push(newMeal);
  saveMenuToLocalStorage();
  renderMenu();
}

// Delete a Meal
function deleteMeal(mealIndex) {
  if (confirm("Are you sure you want to delete this meal?")) {
    menu.splice(mealIndex, 1); // Remove the meal
    saveMenuToLocalStorage(); // Save updated menu
    renderMenu(); // Re-render menu
  }
}

// Run Page-Specific Logic
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage === 'manager.html') {
    initializeManagerPage();
  } else if (currentPage === 'index.html') {
    renderMenu();
  }
});
