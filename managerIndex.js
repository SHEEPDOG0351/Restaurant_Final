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

export let menu = JSON.parse(localStorage.getItem('menu')) || [
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
  }
];