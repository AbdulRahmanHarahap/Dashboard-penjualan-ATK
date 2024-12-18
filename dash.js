// Data produk
const produk = [
    { id: 1, nama: 'Buku Tulis', harga: 50000, stok: 55 },
    { id: 2, nama: 'Papan Tulis', harga: 80000, stok: 40 },
    { id: 3, nama: 'Meja Belajar', harga: 75000, stok: 45 },
    { id: 4, nama: 'Penggaris', harga: 15000, stok: 45 },
];

// Data penjualan
const penjualan = [
    { idPenjualan: 1, idProduk: 1, jumlah: 10, tanggal: '2024-01-15' },
    { idPenjualan: 2, idProduk: 2, jumlah: 12, tanggal: '2024-02-10' },
    { idPenjualan: 3, idProduk: 3, jumlah: 15, tanggal: '2024-03-20' },
    { idPenjualan: 4, idProduk: 4, jumlah: 11, tanggal: '2024-04-05' },
    { idPenjualan: 1, idProduk: 1, jumlah: 18, tanggal: '2024-05-25' },
    { idPenjualan: 2, idProduk: 2, jumlah: 16, tanggal: '2024-06-28' },
    { idPenjualan: 3, idProduk: 3, jumlah: 22, tanggal: '2024-07-20' },
    { idPenjualan: 4, idProduk: 4, jumlah: 25, tanggal: '2024-08-09' },    { idPenjualan: 1, idProduk: 1, jumlah: 10, tanggal: '2024-01-15' },
    { idPenjualan: 2, idProduk: 2, jumlah: 23, tanggal: '2024-09-17' },
    { idPenjualan: 3, idProduk: 3, jumlah: 20, tanggal: '2024-10-21' },
    { idPenjualan: 4, idProduk: 4, jumlah: 25, tanggal: '2024-11-14' },
    { idPenjualan: 4, idProduk: 4, jumlah: 19, tanggal: '2024-12-02' },
];

// Helper function: Mengambil bulan dari tanggal
function getMonth(tanggal) {
    return new Date(tanggal).getMonth();
}

// Memproses data penjualan untuk grafik penjualan bulanan
const penjualanBulanan = Array(12).fill(0); // Array dengan 12 bulan
penjualan.forEach(item => {
    const bulan = getMonth(item.tanggal);
    penjualanBulanan[bulan] += item.jumlah;
});

// Data chart untuk penjualan
const dataPenjualan = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    datasets: [{
        label: 'Penjualan (Jumlah Produk Terjual)',
        data: penjualanBulanan,
        backgroundColor: 'rgba(178, 238, 80, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};

// Data chart untuk stok produk
const stokProdukData = produk.map(item => item.stok);
const dataStokProduk = {
    labels: produk.map(item => item.nama),
    datasets: [{
        label: 'Stok Produk',
        data: stokProdukData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

// Insight
const totalPenjualan = penjualan.reduce((acc, curr) => acc + curr.jumlah * produk.find(p => p.id === curr.idProduk).harga, 0);
const rataRataPenjualan = (totalPenjualan / penjualan.length).toFixed(2);
const penjualanTertinggi = Math.max(...penjualanBulanan);

document.getElementById('totalPenjualan').textContent = `Rp. ${totalPenjualan}`;
document.getElementById('rataRataPenjualan').textContent = `Rp. ${rataRataPenjualan}`;
document.getElementById('penjualanTertinggi').textContent = `Rp. ${penjualanTertinggi}`;

// Render Chart Penjualan
const penjualanChart = new Chart(
    document.getElementById('penjualanChart'),
    {
        type: 'bar',
        data: dataPenjualan,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
);

// Render Chart Stok Produk
const stokProdukChart = new Chart(
    document.getElementById('stokProdukChart'),
    {
        type: 'bar',
        data: dataStokProduk,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
);

// Sidebar toggle for mobile
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Fungsi untuk menampilkan halaman yang berbeda
function showPage(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
}

// Fungsi untuk mengunduh laporan (simulasi)
function downloadLaporan() {
    alert('Laporan berhasil diunduh!');
}

// Fungsi untuk memperbarui nama produk
function updateNamaProduk(id, namaBaru) {
    const produkItem = produk.find(p => p.id === id);
    if (produkItem) {
        produkItem.nama = namaBaru;
        loadProduk(); // Refresh tabel produk
    } else {
        console.error('Produk tidak ditemukan');
    }
}

// Fungsi untuk memperbarui stok produk
function updateStokProduk(id, stokBaru) {
    const produkItem = produk.find(p => p.id === id);
    if (produkItem) {
        produkItem.stok = stokBaru;
        loadProduk(); // Refresh tabel produk
    } else {
        console.error('Produk tidak ditemukan');
    }
}

// Menampilkan tabel produk
function loadProduk() {
    const tableBody = document.querySelector("#produk tbody");
    tableBody.innerHTML = ""; 
    produk.forEach(item => {
        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.nama}</td>
                <td>Rp. ${item.harga}</td>
                <td>${item.stok}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Menampilkan tabel penjualan
function loadPenjualan() {
    const tableBody = document.querySelector("#penjualan tbody");
    tableBody.innerHTML = ""; 
    penjualan.forEach(item => {
        const produkItem = produk.find(p => p.id === item.idProduk);
        const row = `
            <tr>
                <td>${item.idPenjualan}</td>
                <td>${produkItem ? produkItem.nama : 'Produk Tidak Ditemukan'}</td>
                <td>${item.jumlah}</td>
                <td>${item.tanggal}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Contoh penggunaan fungsi update
// updateNamaProduk(1, 'Buku Gambar');
// updateStokProduk(2, 25);

loadProduk();
loadPenjualan();
