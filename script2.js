document.getElementById("order-form").addEventListener("submit", function(event) {
  event.preventDefault();  // Mencegah form refresh

  // Ambil data dari form
  const customerName = document.getElementById("customer-name").value;
  const customerPhone = document.getElementById("customer-phone").value;
  const orderDetails = document.getElementById("order-details").value;
  const productName = document.getElementById("product-name").value;
  const productQuantity = parseInt(document.getElementById("product-quantity").value);

  // Ambil inventory dari localStorage
  let products = JSON.parse(localStorage.getItem('products')) || [];

  // Cari produk di inventory berdasarkan nama (case-insensitive)
  let productIndex = products.findIndex(p => p.product.toLowerCase() === productName.toLowerCase());
  alert(products)
  

  // Jika produk tidak ditemukan
  if (productIndex === -1) {
      alert("Produk tidak ditemukan di inventory. Silakan tambahkan produk ke inventory terlebih dahulu.");
      return;  // Hentikan proses jika produk tidak ada
  }

  let product = products[productIndex];

  // Cek apakah stok mencukupi
  if (product.stock >= productQuantity) {
      // Kurangi stok produk
      products[productIndex].stock -= productQuantity;

      // Perbarui inventory di localStorage
      localStorage.setItem("products", JSON.stringify(products));

      // Buat objek untuk menyimpan data order
      const newOrder = {
          customerName: customerName,
          customerPhone: customerPhone,
          orderDetails: orderDetails,
          productName: productName,
          productQuantity: productQuantity
      };

      // Ambil data orders yang sudah ada di localStorage
      let orders = JSON.parse(localStorage.getItem("orders")) || [];

      // Tambahkan order baru ke array
      orders.push(newOrder);

      // Simpan kembali orders ke localStorage
      localStorage.setItem("orders", JSON.stringify(orders));

      // Kosongkan form setelah submit
      document.getElementById("order-form").reset();

      alert("Order berhasil disimpan!");
  } else {
      alert(`Stok tidak mencukupi! Stok saat ini: ${product.stock}`);
  }
});
