// Daftar Pesanan, Bahan Baku, dan Pembayaran
let pesananList = [];
let bahanBakuList = [
    { id: 1, nama: "Bahan A", stok: 10 },
    { id: 2, nama: "Bahan B", stok: 5 },
    { id: 3, nama: "Bahan C", stok: 0 }
];
let pembayaranList = [];

// Menampilkan Daftar Bahan Baku
function displayBahanBaku() {
    const bahanBakuListElem = document.getElementById('bahanBakuList');
    bahanBakuListElem.innerHTML = '';
    bahanBakuList.forEach((bahan, index) => {
        let warning = bahan.stok === 0 ? ' (Habis)' : bahan.stok < 5 ? ' (Stok Rendah)' : '';
        bahanBakuListElem.innerHTML += `<li class="list-group-item">
            ${bahan.nama} - Stok: ${bahan.stok}${warning}
            <button class="btn btn-warning btn-sm float-end" onclick="editBahan(${index})">Edit</button>
            <button class="btn btn-danger btn-sm float-end me-2" onclick="deleteBahan(${index})">Hapus</button>
        </li>`;
    });
}

// Menyimpan Pesanan
document.getElementById('pesananForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const namaPelanggan = document.getElementById('namaPelanggan').value;
    const alamatPelanggan = document.getElementById('alamatPelanggan').value;
    const noTelepon = document.getElementById('noTelepon').value;
    const detailPesanan = document.getElementById('detailPesanan').value;

    const bahanDibutuhkan = 2; // Misalnya, setiap pesanan membutuhkan 2 unit bahan.
    
    // Cek Stok Bahan
    const bahanTerpilih = bahanBakuList[0]; // Misal, hanya menggunakan Bahan A untuk contoh
    if (bahanTerpilih.stok < bahanDibutuhkan) {
        alert("Bahan baku tidak mencukupi! Pesanan tidak dapat diproses.");
        return;
    }

    // Kurangi stok bahan baku
    bahanTerpilih.stok -= bahanDibutuhkan;

    // Simpan Pesanan
    pesananList.push({
        namaPelanggan,
        alamatPelanggan,
        noTelepon,
        detailPesanan,
        status: "Dalam Proses"
    });

    // Update UI
    displayPesanan();
    displayBahanBaku();

    // Reset form
    document.getElementById('pesananForm').reset();
});

// Menampilkan Daftar Pesanan
function displayPesanan() {
    const pesananListElem = document.getElementById('pesananList');
    pesananListElem.innerHTML = '';
    pesananList.forEach((pesanan, index) => {
        pesananListElem.innerHTML += `<li class="list-group-item">
            ${index + 1}. ${pesanan.namaPelanggan} - ${pesanan.detailPesanan} [${pesanan.status}]
        </li>`;
    });
}

// Menyimpan Pembayaran
document.getElementById('pembayaranForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const jumlahPembayaran = document.getElementById('jumlahPembayaran').value;

    pembayaranList.push({
        jumlah: jumlahPembayaran,
        tanggal: new Date().toLocaleDateString()
    });

    displayPembayaran();

    // Reset form
    document.getElementById('pembayaranForm').reset();
});

// Menampilkan Daftar Pembayaran
function displayPembayaran() {
    const pembayaranListElem = document.getElementById('pembayaranList');
    pembayaranListElem.innerHTML = '';
    pembayaranList.forEach((pembayaran, index) => {
        pembayaranListElem.innerHTML += `<li class="list-group-item">
            ${index + 1}. Rp${pembayaran.jumlah} - ${pembayaran.tanggal}
        </li>`;
    });
}

// Tambah/Update Bahan Baku
document.getElementById('bahanBakuForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const namaBahan = document.getElementById('namaBahan').value;
    const stokBahan = parseInt(document.getElementById('stokBahan').value);

    // Cek apakah bahan sudah ada
    const existingBahan = bahanBakuList.find(bahan => bahan.nama.toLowerCase() === namaBahan.toLowerCase());
    
    if (existingBahan) {
        // Update stok bahan jika sudah ada
        existingBahan.stok += stokBahan;
        alert(`Stok bahan "${namaBahan}" telah diperbarui.`);
    } else {
        // Tambah bahan baru jika belum ada
        bahanBakuList.push({ id: bahanBakuList.length + 1, nama: namaBahan, stok: stokBahan });
        alert(`Bahan baru "${namaBahan}" telah ditambahkan.`);
    }

    displayBahanBaku();

    // Reset form
    document.getElementById('bahanBakuForm').reset();
});

// Hapus Bahan Baku
function deleteBahan(index) {
    if (confirm(`Apakah Anda yakin ingin menghapus bahan "${bahanBakuList[index].nama}"?`)) {
        bahanBakuList.splice(index, 1);
        displayBahanBaku();
    }
}

// Edit Bahan Baku
function editBahan(index) {
    const bahan = bahanBakuList[index];
    document.getElementById('namaBahan').value = bahan.nama;
    document.getElementById('stokBahan').value = bahan.stok;
}

// Load data pada halaman dimuat
window.onload = function () {
    displayPesanan();
    displayBahanBaku();
    displayPembayaran();
};
