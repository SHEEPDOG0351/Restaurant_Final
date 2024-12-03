// Initial Menu Data (Loaded from localStorage or Default to Sample Menu)
document.addEventListener('DOMContentLoaded', function () {
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

  // Function to Update an Item's Details
  function updateItem(mealIndex, itemIndex, field, value) {
    menu[mealIndex].items[itemIndex][field] = value; // Update field
    saveMenuToLocalStorage(); // Save updated menu
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
});

export let defaultMenu = JSON.parse(localStorage.getItem('menu')) || [
  // Initial Default Menu Data
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
      { name: "Spaghetti Carbonara", description: "Classic Italian pasta dish with creamy sauce and pancetta.", price: 14.99, image: "https://www.errenskitchen.com/wp-content/uploads/2021/04/Spaghetti-Carbonara-SQUARE.jpg" },
      { name: "Garlic Bread", description: "Crunchy garlic bread with butter and herbs.", price: 5.99, image: "https://feelgoodfoodie.net/wp-content/uploads/2021/02/Air-Fryer-Garlic-Bread-6.jpg" },
      { name: "Red Wine", description: "Full-bodied red wine to complement the pasta.", price: 4.99, image: "https://www.wine-searcher.com/images/wine_style/red-rich-and-intense-8-1-2.jpg?width=734" }
    ]
  },
  {
    meal: "Fried Chicken Meal", totalPrice: 27.97,
    items: [
      { name: "Fried Chicken", description: "Crispy, golden fried chicken.", price: 12.99, image: "https://www.simplyrecipes.com/thmb/tZnpg_1VgUQuhGnTL8xZy3Ff6xU=/3000x2000/filters:fill(auto,1)/Simply-Recipes-Crispy-Fried-Chicken-LEAD-2-6797ef3ab623404cbec6b3230240b4b7.jpg" },
      { name: "Mashed Potatoes", description: "Creamy mashed potatoes with gravy.", price: 6.99, image: "https://www.simplyrecipes.com/thmb/1TPu4SxVtLtTRs6A0f8o2ICvsiw=/2000x1333/filters:fill(auto,1)/Simply-Recipes-Mashed-Potatoes-LEAD-1-b11cf48b67f54b379f0e610b5325c4b0.jpg" },
      { name: "Iced Tea", description: "Chilled iced tea to refresh your palate.", price: 7.99, image: "https://images.unsplash.com/photo-1597846848080-d2b2f4ffbac0" }
    ]
  },
  {
    meal: "Vegan Buddha Bowl", totalPrice: 24.99,
    items: [
      { name: "Quinoa Bowl", description: "Packed with fresh veggies, avocado, and tofu.", price: 15.99, image: "https://minimalistbaker.com/wp-content/uploads/2021/02/Easy-Quinoa-Buddha-Bowls-SQUARE.jpg" },
      { name: "Hummus Plate", description: "Creamy hummus with pita bread.", price: 5.99, image: "https://www.simplyrecipes.com/thmb/NtSPiGoD9F0rH3c6L-py9xS9RpQ=/2000x1333/filters:fill(auto,1)/Simply-Recipes-Hummus-LEAD-01-470fa5a6b4f6440d8c6d7f840d2497eb.jpg" },
      { name: "Green Smoothie", description: "A nutrient-rich green smoothie.", price: 3.99, image: "https://images.unsplash.com/photo-1561043433-aaf687c4cf4e" }
    ]
  },
  {
    meal: "BBQ Ribs Meal", totalPrice: 34.99,
    items: [
      { name: "BBQ Ribs", description: "Tender ribs with smoky BBQ sauce.", price: 17.99, image: "https://www.simplyrecipes.com/thmb/xF7d-4VrYKnV5RSjGQgPAWhXmoU=/2000x1500/filters:fill(auto,1)/Simply-Recipes-BBQ-Ribs-LEAD-1-5ddbb6575df947ec87c0d29a7740f8ae.jpg" },
      { name: "Coleslaw", description: "Crispy coleslaw with a tangy dressing.", price: 6.99, image: "https://www.simplyrecipes.com/thmb/WZ6Q_2To7R9R3yNrA_n6K9QjX0A=/2000x1333/filters:fill(auto,1)/Simply-Recipes-Coleslaw-LEAD-3-4b95a5d8af39433a90241d66cb872b21.jpg" },
      { name: "Lemonade", description: "Freshly squeezed lemonade.", price: 9.99, image: "https://images.unsplash.com/photo-1504615755583-2916b52192d3" }
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
