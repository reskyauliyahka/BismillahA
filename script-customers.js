document.addEventListener("DOMContentLoaded", function() {
    // Ambil data dari localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
  
    // Targetkan tbody dari tabel
    const tableBody = document.querySelector("tbody");
  
    // Loop melalui setiap order dan tambahkan ke tabel
    orders.forEach(order => {
      const row = document.createElement("tr");
  
      // Buat elemen td untuk setiap kolom
      const nameCell = document.createElement("td");
      const phoneCell = document.createElement("td");
      const orderDetailsCell = document.createElement("td");
      const productCell = document.createElement("td");
      const quantityCell = document.createElement("td");
  
      // Masukkan data ke setiap cell
      nameCell.textContent = order.customerName;
      phoneCell.textContent = order.customerPhone;
      orderDetailsCell.textContent = order.orderDetails;
      productCell.textContent = order.productName;
      quantityCell.textContent = order.productQuantity;
  
      // Tambahkan cell ke row
      row.appendChild(nameCell);
      row.appendChild(phoneCell);
      row.appendChild(orderDetailsCell);
      row.appendChild(productCell);
      row.appendChild(quantityCell);
  
      // Tambahkan row ke tabel
      tableBody.appendChild(row);
    });
  });
  