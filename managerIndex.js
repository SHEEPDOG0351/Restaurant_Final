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
  {
    meal: "Spaghetti Carbonara Meal", totalPrice: 25.97,
    items: [
      { name: "Spaghetti Carbonara", description: "Classic Italian pasta dish with creamy sauce and pancetta.", price: 14.99, image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg" },
      { name: "Garlic Bread", description: "Crunchy garlic bread with butter and herbs.", price: 5.99, image: "https://homecookedharvest.com/wp-content/uploads/2022/06/Stuffed-Garlic-Bread-G.jpg" },
      { name: "Red Wine", description: "Full-bodied red wine to complement the pasta.", price: 4.99, image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/1-red-wine-being-poured-in-a-glass-juanmonino.jpg" }
    ]
  },
  {
    meal: "Fried Chicken Meal", totalPrice: 27.97,
    items: [
      { name: "Fried Chicken", description: "Crispy, golden fried chicken.", price: 12.99, image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/11/2/0/DV1510H_fried-chicken-recipe-10_s4x3.jpg.rend.hgtvcom.826.620.suffix/1568222255998.webp" },
      { name: "Mashed Potatoes", description: "Creamy mashed potatoes with gravy.", price: 6.99, image: "https://getonmyplate.com/wp-content/uploads/2021/10/mashed-potatoes-and-gravy.jpg" },
      { name: "Iced Tea", description: "Chilled iced tea to refresh your palate.", price: 7.99, image: "https://media.gettyimages.com/id/564207263/photo/iced-tea.jpg?s=612x612&w=gi&k=20&c=zTdpyQNU72WDuTRTitdXsGcsjJhMAWEFWKUSr7D9SmI=" }
    ]
  },
  {
    meal: "Vegan Buddha Bowl", totalPrice: 24.99,
    items: [
      { name: "Quinoa Bowl", description: "Packed with fresh veggies, avocado, and tofu.", price: 15.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc-YNKZPSg7xaMLMGTumf83_CQAK3gH6WBgw&s" },
      { name: "Hummus Plate", description: "Creamy hummus with pita bread.", price: 5.99, image: "https://www.seriouseats.com/thmb/Y1y-PfXuk1swDWo3_CGtAmQ3c64=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/israeli-style-extra-smooth-hummus-recipe-hero-03_1-c5024cd79b3c4867899e96833dd2c251.JPG" },
      { name: "Green Smoothie", description: "A nutrient-rich green smoothie.", price: 3.99, image: "https://www.twopeasandtheirpod.com/wp-content/uploads/2012/01/green-smoothie1.jpg" }
    ]
  },
  {
    meal: "BBQ Ribs Meal", totalPrice: 34.99,
    items: [
      { name: "BBQ Ribs", description: "Tender ribs with smoky BBQ sauce.", price: 17.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5_iEYbH0nYRcc4RISEdbStOgqd7fKHwf5VA&s" },
      { name: "Coleslaw", description: "Crispy coleslaw with a tangy dressing.", price: 6.99, image: "https://www.mylatinatable.com/wp-content/uploads/2019/01/Coleslaw-5.jpg" },
      { name: "Lemonade", description: "Freshly squeezed lemonade.", price: 9.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZQ6Ysgv4yKj-iIVI7MbMuycHlU56sElHFQA&s" }
    ]
  }
];


// Global Menu Variable
let menu = loadMenu();

// Merge Default Menu with Stored Menu
function loadMenu() {
  const storedMenu = JSON.parse(localStorage.getItem('menu')) || [];
  const mergedMenu = [...storedMenu];

  defaultMenu.forEach(defaultMeal => {
    if (!storedMenu.some(storedMeal => storedMeal.meal === defaultMeal.meal)) {
      mergedMenu.push(defaultMeal);
    }
  });

  localStorage.setItem('menu', JSON.stringify(mergedMenu));
  return mergedMenu;
}

// Save Menu to localStorage
function saveMenuToLocalStorage() {
  localStorage.setItem('menu', JSON.stringify(menu));
}

// Recalculate Total Price of a Meal
function recalculateTotalPrice(mealIndex) {
  const meal = menu[mealIndex];
  const totalPrice = meal.items.reduce((sum, item) => sum + parseFloat(item.price), 0);
  meal.totalPrice = totalPrice;
  saveMenuToLocalStorage();
  renderManagerMenu();
}

// Render the Menu on the Page
function renderManagerMenu() {
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = '';

  menu.forEach((meal, mealIndex) => {
    const mealElement = document.createElement('div');
    mealElement.classList.add('meal');

    const totalPrice = typeof meal.totalPrice === 'number' && !isNaN(meal.totalPrice) ? meal.totalPrice : 0;

    let mealHTML = `
      <h3 class="meal-title">${meal.meal} - $${totalPrice.toFixed(2)}</h3>
      <div class="meal-items">
    `;

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

// Update an Item in the Menu
function updateItem(mealIndex, itemIndex, field, value) {
  menu[mealIndex].items[itemIndex][field] = value;
  saveMenuToLocalStorage();
  renderManagerMenu();
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
  renderManagerMenu();
}

// Delete a Meal
function deleteMeal(mealIndex) {
  if (confirm("Are you sure you want to delete this meal?")) {
    menu.splice(mealIndex, 1);
    saveMenuToLocalStorage();
    renderManagerMenu();
  }
}

// Add Event Listener for "Add Meal" Button
document.getElementById('add-meal-btn').addEventListener('click', addNewMeal);

// Run Page-Specific Logic
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage === 'managerIndex.html') {
    renderManagerMenu();
  } else if (currentPage === 'index.html') {
    renderMenu();
  }
});

// Attach Global Functions for HTML Event Attributes
window.updateItem = updateItem;
window.recalculateTotalPrice = recalculateTotalPrice;
window.deleteMeal = deleteMeal;
