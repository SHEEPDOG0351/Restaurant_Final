// Initial Default Menu Data
const defaultMenu = [
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
  {
    meal: "Spaghetti Carbonara Meal", totalPrice: 25.97,
    items: [
      { name: "Spaghetti Carbonara", description: "Classic Italian pasta dish with creamy sauce and pancetta.", price: 14.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNgv8zb9YYjo6K9Zx_Fh2VuK14OQkPHgu5PQ&s" },
      { name: "Garlic Bread", description: "Crunchy garlic bread with butter and herbs.", price: 5.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNgv8zb9YYjo6K9Zx_Fh2VuK14OQkPHgu5PQ&s" },
      { name: "Red Wine", description: "Full-bodied red wine to complement the pasta.", price: 4.99, image: https://media02.stockfood.com/largepreviews/MTg2MTAyMDA1NQ==/60032905-Pouring-red-wine-into-glass.jpg" }
    ]
  },
  {
    meal: "Fried Chicken Meal", totalPrice: 27.97,
    items: [
      { name: "Fried Chicken", description: "Crispy, golden fried chicken.", price: 12.99, image: "https://instantpotcooking.com/wp-content/uploads/2023/06/Instant-Pot-Fried-Chicken.jpg" },
      { name: "Mashed Potatoes", description: "Creamy mashed potatoes with gravy.", price: 6.99, image: "https://www.allrecipes.com/thmb/ytnCq3jVoAyGzGxm_oZxqGI-HCU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/18290-garlic-mashed-potatoes-ddmfs-beauty2-4x3-0327-2-47384a10cded40ae90e574bc7fdb9433.jpg" },
      { name: "Iced Tea", description: "Chilled iced tea to refresh your palate.", price: 7.99, image: "https://media.gettyimages.com/id/564207263/photo/iced-tea.jpg?s=612x612&w=gi&k=20&c=zTdpyQNU72WDuTRTitdXsGcsjJhMAWEFWKUSr7D9SmI=" }
    ]
  },
  {
    meal: "Vegan Buddha Bowl", totalPrice: 24.99,
    items: [
      { name: "Quinoa Bowl", description: "Packed with fresh veggies, avocado, and tofu.", price: 15.99, image: "" },
      { name: "Hummus Plate", description: "Creamy hummus with pita bread.", price: 5.99, image: "https://cosetteskitchen.com/wp-content/uploads/2024/04/mediterranean-quinoa-bowl_final_topview_quinoabowl.jpg" },
      { name: "Green Smoothie", description: "A nutrient-rich green smoothie.", price: 3.99, image: "https://i1.wp.com/happymoneysaver.com/wp-content/uploads/2013/11/33021383_ml.jpg" }
    ]
  },
  {
    meal: "BBQ Ribs Meal", totalPrice: 34.99,
    items: [
      { name: "BBQ Ribs", description: "Tender ribs with smoky BBQ sauce.", price: 17.99, image: "https://thatovenfeelin.com/wp-content/uploads/2024/08/Slow-Cooker-Root-Beer-BBQ-Pork-Ribs-1.png" },
      { name: "Coleslaw", description: "Crispy coleslaw with a tangy dressing.", price: 6.99, image: "https://kitchenfunwithmy3sons.com/wp-content/uploads/2021/06/KFC-Coleslaw-feature-scaled.jpg" },
      { name: "Lemonade", description: "Freshly squeezed lemonade.", price: 9.99, image: "https://img.freepik.com/premium-photo/lemonade-being-poured-from-jug-into-glass_1170794-181832.jpg" }
    ]
  }
];

// Function to Merge Default Menu with Stored Menu
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
let menu = loadMenu();

// Function to Save Menu to localStorage
function saveMenuToLocalStorage() {
  localStorage.setItem('menu', JSON.stringify(menu)); // Save the current menu to localStorage
}

// Function to Recalculate Total Price of a Meal
function recalculateTotalPrice(mealIndex) {
  const meal = menu[mealIndex];
  const totalPrice = meal.items.reduce((sum, item) => sum + parseFloat(item.price), 0);
  meal.totalPrice = totalPrice;
  saveMenuToLocalStorage(); // Save after recalculating
  renderMenu(); // Re-render the menu
}

// Function to Render the Menu on the Page
function renderMenu() {
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = ''; // Clear previous content

  menu.forEach((meal, mealIndex) => {
    const mealElement = document.createElement('div');
    mealElement.classList.add('meal');

    const totalPrice = (typeof meal.totalPrice === 'number' && !isNaN(meal.totalPrice)) ? meal.totalPrice : 0;

    let mealHTML = `
      <h3 class="meal-title">${meal.meal} - $${totalPrice.toFixed(2)}</h3>
      <div class="meal-items">
    `;

    // Render each item in the meal
    meal.items.forEach((item, itemIndex) => {
      mealHTML += `
        <div class="meal-item">
          <img src="${item.image}" alt="${item.name}" class="meal-item-image">
          <input type="text" class="meal-item-name" value="${item.name}" onchange="updateItem(${mealIndex}, ${itemIndex}, 'name', this.value)">
          <textarea class="meal-item-description" onchange="updateItem(${mealIndex}, ${itemIndex}, 'description', this.value)">${item.description}</textarea>
          <input type="number" class="meal-item-price" value="${item.price}" onchange="updateItem(${mealIndex}, ${itemIndex}, 'price', parseFloat(this.value)); recalculateTotalPrice(${mealIndex})">
          <input type="text" class="meal-item-image-url" value="${item.image}" onchange="updateItem(${mealIndex}, ${itemIndex}, 'image', this.value)">
        </div>
      `;
    });

    mealHTML += `
        </div>
        <button class="btn btn-danger delete-meal" onclick="deleteMeal(${mealIndex})">Delete Meal</button>
    `;

    mealElement.innerHTML = mealHTML;
    menuContainer.appendChild(mealElement);
  });
}

function updateItem(mealIndex, itemIndex, field, value) {
  menu[mealIndex].items[itemIndex][field] = value; // Update field in memory
  saveMenuToLocalStorage(); // Save updated menu to localStorage
  renderMenu(); // Re-render menu to reflect changes
}

// Ensure this script only runs on the manager.html page
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop(); // Get the file name from the URL
  if (currentPage === 'manager.html') {
    // Your managerIndex.js logic goes here
    initializeManagerPage();
  }
});

// Function to initialize all logic specific to manager.html
function initializeManagerPage() {
  // Attach event listener to the "Add Meal" button
  const addMealButton = document.getElementById('add-meal-btn');
  if (addMealButton) {
    addMealButton.addEventListener('click', addNewMeal);
  }

  // Render the menu on page load
  renderMenu();
}

// Function to Add a New Meal
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

// Function to Delete a Meal
function deleteMeal(mealIndex) {
  if (confirm("Are you sure you want to delete this meal?")) {
    menu.splice(mealIndex, 1); // Remove the meal
    saveMenuToLocalStorage(); // Save updated menu
    renderMenu(); // Re-render menu
  }
}

// Event Listener for "Add Meal" Button
document.getElementById('add-meal-btn').addEventListener('click', addNewMeal);

// Render Menu on Page Load
window.onload = renderMenu;
