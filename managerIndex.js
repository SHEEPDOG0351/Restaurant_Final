// The updated menu data
const menu = [
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
  
  // Dynamically render the menu with meals and items
  function renderMenu() {
    const menuContainer = document.getElementById('menu-container');
    menu.forEach(meal => {
      const mealElement = document.createElement('div');
      mealElement.classList.add('meal');
      
      // Add meal title and total price
      let mealHTML = `
        <h3 class="meal-title">${meal.meal} - $${meal.totalPrice.toFixed(2)}</h3>
        <div class="meal-items">
      `;
  
      // Loop through each item in the meal and add it to the HTML
      meal.items.forEach(item => {
        mealHTML += `
          <div class="meal-item">
            <img src="${item.image}" alt="${item.name}" class="meal-item-image">
            <h4 class="meal-item-name">${item.name}</h4>
            <p class="meal-item-description">${item.description}</p>
            <p class="meal-item-price">$${item.price.toFixed(2)}</p>
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
  function purchaseClicked() {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add some items to your order.');
      return;
    }
  
    // For simplicity, we're just displaying an alert with the cart content
    const orderDetails = cart.map(item => `${item.quantity} x ${item.mealName} - $${(item.totalPrice * item.quantity).toFixed(2)}`).join('\n');
    const totalAmount = cart.reduce((total, item) => total + item.totalPrice * item.quantity, 0).toFixed(2);
    
    alert(`Your Order:\n${orderDetails}\n\nTotal: $${totalAmount}`);
  
    // Reset the cart
    cart = [];
    updateCartDisplay();
  }
  
  // Call renderMenu to display the meals on page load
  window.onload = renderMenu;
  