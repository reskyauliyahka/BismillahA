document.addEventListener("DOMContentLoaded", function() {
  // Ambil data dari localStorage
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Fungsi untuk memperbarui localStorage
  function updateLocalStorage(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
  }

  // Periksa setiap order dan tambahkan tanggal jika belum ada
  orders.forEach(order => {
    if (!order.orderDate) {
      order.orderDate = new Date().toLocaleDateString(); // Set tanggal saat ini jika kosong
    }
  });

  // Simpan kembali ke localStorage setelah menambahkan tanggal
  updateLocalStorage(orders);

  // Targetkan tbody dari tabel
  const tableBody = document.querySelector("tbody");

  // Fungsi untuk menghapus order
  function deleteOrder(index) {
    orders.splice(index, 1); // Hapus order dari array berdasarkan index
    updateLocalStorage(orders); // Update localStorage
    location.reload(); // Reload halaman untuk merefresh tabel
  }

  // Fungsi untuk menambah order baru ke localStorage dengan tanggal real-time
  function addOrder(order) {
    order.orderDate = new Date().toLocaleDateString(); // Tambahkan tanggal saat ini
    orders.push(order); // Tambahkan order baru ke array
    updateLocalStorage(orders); // Update localStorage
  }

  // Loop melalui setiap order dan tambahkan ke tabel
  orders.forEach((order, index) => {
    const row = document.createElement("tr");

    // Buat elemen td untuk setiap kolom
    const nameCell = document.createElement("td");
    const phoneCell = document.createElement("td");
    const orderDetailsCell = document.createElement("td");
    const productCell = document.createElement("td");
    const quantityCell = document.createElement("td");
    const orderDateCell = document.createElement("td");
    const actionCell = document.createElement("td"); // Kolom untuk tombol delete

    // Masukkan data ke setiap cell
    nameCell.textContent = order.customerName;
    phoneCell.textContent = order.customerPhone;
    orderDetailsCell.textContent = order.orderDetails;
    productCell.textContent = order.productName;
    quantityCell.textContent = order.productQuantity;
    orderDateCell.textContent = order.orderDate; // Tampilkan tanggal order

    // Buat tombol delete
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", function() {
      deleteOrder(index);
    });

    // Masukkan tombol ke actionCell
    actionCell.appendChild(deleteButton);

    // Tambahkan cell ke row
    row.appendChild(nameCell);
    row.appendChild(phoneCell);
    row.appendChild(orderDetailsCell);
    row.appendChild(productCell);
    row.appendChild(quantityCell);
    row.appendChild(orderDateCell); // Tambahkan tanggal order ke row
    row.appendChild(actionCell); // Tambahkan tombol delete ke row

    // Tambahkan row ke tabel
    tableBody.appendChild(row);
  });
});
