let selectedAddressIndex = null;  // To keep track of the selected address

// Function to fetch addresses from Local Storage
function fetchAddresses() {
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    renderAddresses(addresses);
}

// Function to add a new address to Local Storage
function addAddress(address) {
    let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    addresses.push(address);
    localStorage.setItem('addresses', JSON.stringify(addresses));
    fetchAddresses();  // Refresh the address list after adding
}

// Function to delete an address from Local Storage
function deleteAddress(index) {
    let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    addresses.splice(index, 1);  // Remove the address at the specified index
    localStorage.setItem('addresses', JSON.stringify(addresses));
    fetchAddresses();  // Refresh the address list after deleting
}

// Render the addresses to the UI
function renderAddresses(addresses) {
    const addressList = document.getElementById('address-list');
    addressList.innerHTML = '';

    addresses.forEach((address, index) => {
        const addressDiv = document.createElement('div');
        addressDiv.className = 'address';
        addressDiv.innerHTML = `
            <input type="radio" name="address" onclick="selectAddress(${index})">
            <p><strong>${address.name}</strong></p>
            <p>${address.street}</p>
            <p>${address.city}, ${address.state} - ${address.zip}</p>
            <button class="delete-btn" onclick="deleteAddress(${index})">Delete</button>
        `;
        addressList.appendChild(addressDiv);
    });
}

// Function to select an address
function selectAddress(index) {
    selectedAddressIndex = index;
    document.getElementById('proceed-btn').disabled = false;  // Enable the "Proceed" button
}

// Add event listener for the form submission
document.getElementById('address-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const address = {
        name: document.getElementById('name').value,
        street: document.getElementById('street').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value
    };

    addAddress(address);

    // Close the modal after adding the address
    document.getElementById('modal').style.display = 'none';
});

// Open the modal to add a new address
document.getElementById('add-address-btn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
});

// Close the modal when the close button is clicked
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

// Fetch the addresses when the page loads
window.onload = fetchAddresses;
