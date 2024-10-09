// Function to show custom alerts
function showAlert(message, isSuccess = false) {
    const alertBox = document.getElementById("custom-alert");
    alertBox.textContent = message;
    alertBox.className = 'alert show' + (isSuccess ? ' success' : '');
    
    // After 3 seconds, hide the alert
    setTimeout(() => {
        alertBox.className = 'alert hidden';
    }, 3000); // Adjust the duration as needed
}

document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form refresh

    // Get data from the form
    const customerName = document.getElementById("customer-name").value;
    const customerPhone = document.getElementById("customer-phone").value;
    const orderDetails = document.getElementById("order-details").value;
    const productName = document.getElementById("product-name").value;
    const productQuantity = parseInt(document.getElementById("product-quantity").value);

    // Retrieve inventory from localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Find the product in inventory (case-insensitive)
    let productIndex = products.findIndex(p => p.name.toLowerCase() === productName.toLowerCase());

    // If product is not found
    if (productIndex === -1) {
        showAlert("Product not found in inventory. Please add the product to the inventory first.");
        return;  // Stop process if the product does not exist
    }

    let product = products[productIndex];

    // Check if stock is sufficient
    if (product.stock >= productQuantity) {
        // Reduce product stock
        products[productIndex].stock -= productQuantity;

        // Update inventory in localStorage
        localStorage.setItem("products", JSON.stringify(products));

        // Create an object to store order data
        const newOrder = {
            customerName: customerName,
            customerPhone: customerPhone,
            orderDetails: orderDetails,
            productName: productName,
            productQuantity: productQuantity
        };

        // Retrieve existing orders from localStorage
        let orders = JSON.parse(localStorage.getItem("orders")) || [];

        // Add new order to the array
        orders.push(newOrder);

        // Save orders back to localStorage
        localStorage.setItem("orders", JSON.stringify(orders));

        // Clear the form after submit
        document.getElementById("order-form").reset();

        showAlert("Order has been successfully saved!", true);
    } else {
        showAlert(`Insufficient stock! Current stock: ${product.stock}`);
    }
});
