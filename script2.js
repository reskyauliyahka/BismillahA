document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Ambil data dari form
    const customerName = document.getElementById("customer-name").value;
    const customerPhone = document.getElementById("customer-phone").value;
    const orderDetails = document.getElementById("order-details").value;
    const productName = document.getElementById("product-name").value;
    const productQuantity = document.getElementById("product-quantity").value;
  
    // Buat objek untuk menyimpan data
    const newOrder = {
      customerName: customerName,
      customerPhone: customerPhone,
      orderDetails: orderDetails,
      productName: productName,
      productQuantity: productQuantity
    };
  
    // Ambil data yang sudah ada di localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
  
    // Tambahkan data baru ke array
    orders.push(newOrder);
  
    // Simpan kembali data ke localStorage
    localStorage.setItem("orders", JSON.stringify(orders));
  
    // Kosongkan form setelah submit
    document.getElementById("order-form").reset();
  
    alert("Order added successfully!");
  });
  