document.addEventListener('DOMContentLoaded', function () {
  // Retrieve cart items from localStorage or initialize an empty array
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartElement = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // Function to add item to the cart
  function addToCart(productId, productName, productPrice) {
      let itemIndex = cartItems.findIndex(item => item.id === productId);

      if (itemIndex > -1) {
          // If the item is already in the cart, increase its quantity
          cartItems[itemIndex].quantity += 1;
      } else {
          // If the item is not in the cart, add it
          cartItems.push({
              id: productId,
              name: productName,
              price: productPrice,
              quantity: 1
          });
      }

      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCartDisplay();
  }

  // Function to update the cart display
  function updateCartDisplay() {
      cartElement.innerHTML = ''; // Clear the cart element

      if (cartItems.length === 0) {
          cartElement.innerHTML = '<p class="text-center">Your cart is empty.</p>';
          checkoutBtn.style.display = 'none';
      } else {
          cartItems.forEach((item, index) => {
              const itemElement = document.createElement('div');
              itemElement.className = 'cart-item';
              itemElement.innerHTML = `
                  <p>Product Name : ${item.name} </P><br>
                  <p>Price Rs.${item.price} </P><br>
                  <p>Quantity : ${item.quantity}</p><br>
                  <button class="btn btn-danger btn-sm" onclick="removeCartItem(${index})">Remove</button>
              `;
              cartElement.appendChild(itemElement);
          });
          checkoutBtn.style.display = 'inline-block';
      }
  }

  // Function to remove an item from the cart
  window.removeCartItem = function(index) {
      cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems)); // Update localStorage
      updateCartDisplay();
  };

  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.addtocart').forEach(button => {
      button.addEventListener('click', function () {
          const productId = this.getAttribute('data-product-id');
          const productName = this.getAttribute('data-product-name');
          const productPrice = this.getAttribute('data-product-price');
          addToCart(productId, productName, productPrice);
      });
  });

  // On page load, update the cart display
  updateCartDisplay();
});

