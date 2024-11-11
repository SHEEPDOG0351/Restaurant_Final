// The updated menu data (this will initially be fetched from localStorage or default to the sample menu if not found)
let menu = JSON.parse(localStorage.getItem('menu')) || [
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
      meal: "Caesar Salad Meal", totalPrice: 25.97,
      items: [
          { name: "Caesar Salad", description: "Crisp romaine lettuce with Caesar dressing and croutons.", price: 7.99, image: "https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg" },
          { name: "Crispy Roasted Potatoes", description: "Seasoned roasted potatoes that add crunch to your meal.", price: 5.99, image: "https://www.kitchensanctuary.com/wp-content/uploads/2019/04/Roast-potatoes-with-salt-and-fresh-thyme-leaves-square-FS.jpg" },
          { name: "Iced Tea", description: "Chilled iced tea to enjoy with a light, refreshing salad.", price: 3.99, image: "https://i.ytimg.com/vi/R88FeOepf-0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAbz7J0doXy0u6MpmfwXqye9xRNhQ" }
      ]
  }
];

// Function to save menu to localStorage
function saveMenuToLocalStorage() {
  localStorage.setItem('menu', JSON.stringify(menu));
}

// Function to render the menu on the page
function renderMenu() {
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = ''; // Clear previous content
  menu.forEach((meal, mealIndex) => {
      const mealElement = document.createElement('div');
      mealElement.classList.add('meal');

      // Validate totalPrice before using toFixed()
      const totalPrice = (typeof meal.totalPrice === 'number' && !isNaN(meal.totalPrice)) ? meal.totalPrice : 0;

      // Add meal title, total price, and delete button
      let mealHTML = `
          <h3 class="meal-title">${meal.meal} - $${totalPrice.toFixed(2)}</h3>
          <div class="meal-items">
      `;

      // Loop through each item in the meal and add it to the HTML
      meal.items.forEach((item, itemIndex) => {
          mealHTML += `
              <div class="meal-item">
                  <img src="${item.image}" alt="${item.name}" class="meal-item-image">
                  <input type="text" class="meal-item-name" value="${item.name}" onchange="updateItem(${mealIndex}, ${itemIndex}, 'name', this.value)">
                  <textarea class="meal-item-description" onchange="updateItem(${mealIndex}, ${itemIndex}, 'description', this.value)">${item.description}</textarea>
                  <input type="number" class="meal-item-price" value="${item.price}" onchange="updateItem(${mealIndex}, ${itemIndex}, 'price', this.value)">
                  <input type="text" class="meal-item-image-url" value="${item.image}" onchange="updateItem(${mealIndex}, ${itemIndex}, 'image', this.value)">
              </div>
          `;
      });

      mealHTML += `
          </div>
          <button class="btn btn-danger delete-meal" onclick="deleteMeal(${mealIndex})">Delete Meal</button>
          <button class="btn btn-primary add-to-order" onclick="addToOrder('${meal.meal}', ${meal.totalPrice})">Add to Order</button>
      `;

      mealElement.innerHTML = mealHTML;
      menuContainer.appendChild(mealElement);
  });
}

// Function to update item details (name, description, price, image)
function updateItem(mealIndex, itemIndex, field, value) {
  menu[mealIndex].items[itemIndex][field] = value;
  saveMenuToLocalStorage();
}

// Function to handle adding a new meal (called when "Add Meal" button is clicked)
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

  // Generate the meal's name by adding "Meal" to the main dish's name
  const mealName = mainDishName + " Meal";

  // Calculate the total price by summing the prices of all items
  const totalPrice = mainDishPrice + sideDishPrice + drinkPrice;

  // Create a new meal object
  const newMeal = {
      meal: mealName,
      totalPrice: totalPrice,
      items: [
          { name: mainDishName, description: mainDishDescription, price: mainDishPrice, image: mainDishImage },
          { name: sideDishName, description: sideDishDescription, price: sideDishPrice, image: sideDishImage },
          { name: drinkName, description: drinkDescription, price: drinkPrice, image: drinkImage }
      ]
  };

  // Add the new meal to the menu
  menu.push(newMeal);
  saveMenuToLocalStorage();
  renderMenu(); // Re-render the menu with the new meal
}

// Function to delete a meal from the menu
function deleteMeal(mealIndex) {
  if (confirm("Are you sure you want to delete this meal?")) {
      menu.splice(mealIndex, 1); // Remove the meal from the array
      saveMenuToLocalStorage(); // Save the updated menu to localStorage
      renderMenu(); // Re-render the menu
  }
}

// Event listener for the "Add Meal" button
document.getElementById('add-meal-btn').addEventListener('click', addNewMeal);

// Call renderMenu to display the meals on page load
window.onload = renderMenu;
