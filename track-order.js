document.addEventListener('DOMContentLoaded', function () {
    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsElement = document.getElementById('order-items');
    const totalAmountElement = document.getElementById('total-amount');
    
    // Function to display the order items
    function displayOrderItems() {
        orderItemsElement.innerHTML = ''; // Clear the order items element
        let totalAmount = 0;

        if (cartItems.length === 0) {
            orderItemsElement.innerHTML = '<p>Your cart is empty. Please add items to track your order.</p>';
        } else {
            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'order-item';
                itemElement.innerHTML = `
                    <p><strong>Product Name:</strong> ${item.name}</p>
                    <p><strong>Price:</strong> Rs. ${item.price}</p>
                    <p><strong>Quantity:</strong> ${item.quantity}</p>
                    <hr>
                `;
                orderItemsElement.appendChild(itemElement);
                totalAmount += item.price * item.quantity; // Calculate total
            });

            // Update the total amount
            totalAmountElement.innerText = `Total: Rs. ${totalAmount}`;
        }
    }

    // On page load, display the order items
    displayOrderItems();
});
