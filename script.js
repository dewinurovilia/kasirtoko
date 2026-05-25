// ==========================
// RESET OTOMATIS HARIAN
// ==========================

function cekResetHarian() {

    const today = new Date().toLocaleDateString();

    const lastDate = localStorage.getItem("tanggalRekap");

    if (lastDate !== today) {

        localStorage.removeItem("rekapPesanan");

        localStorage.setItem("tanggalRekap", today);
    }
}



// ==========================
// SIMPAN PESANAN
// ==========================

function simpanPesanan(nama, keranjang, totalBelanja) {

    cekResetHarian();

    const rekap = JSON.parse(localStorage.getItem("rekapPesanan")) || [];

    rekap.push({

        nama: nama,

        tanggal: new Date().toLocaleString(),

        produk: keranjang,

        total: totalBelanja

    });

    localStorage.setItem("rekapPesanan", JSON.stringify(rekap));

    tampilkanRekap();
}



// ==========================
// TAMPILKAN REKAP
// ==========================

function tampilkanRekap() {

    cekResetHarian();

    const rekap = JSON.parse(localStorage.getItem("rekapPesanan")) || [];

    document.getElementById("rekap").innerHTML = `

        <div class="rekap-box">

            <h2>Pesanan Online</h2>

            <hr>

            ${rekap.map((item, index) => `

                <div class="item-rekap">

                    <h3>${item.nama}</h3>

                    <p>${item.tanggal}</p>

                    <button onclick="cetakStruk(${index})" class="btn-cetak">
                        🖨 Cetak Struk
                    </button>

                </div>

                <hr>

            `).join('')}

        </div>
    `;
}



// ==========================
// CETAK STRUK
// ==========================

function cetakStruk(index) {

    const rekap = JSON.parse(localStorage.getItem("rekapPesanan")) || [];

    const data = rekap[index];

    let rincian = "";

    data.produk.forEach(item => {

        const subtotal = item.harga * item.qty;

        rincian += `

            <tr>
                <td>${item.nama}</td>
                <td>${item.qty}x</td>
                <td>Rp ${subtotal.toLocaleString()}</td>
            </tr>

        `;
    });

    const isi = `

        <div style="font-family:Arial;padding:10px;">

            <center>

                <h2>TOKO DEFANA</h2>

                <p>${data.tanggal}</p>

                <p>${data.nama}</p>

            </center>

            <hr>

            <table width="100%">

                ${rincian}

            </table>

            <hr>

            <h3>
                Total : Rp ${data.total.toLocaleString()}
            </h3>

            <center>

                <p>Terima Kasih 🙏</p>

            </center>

        </div>

    `;

    const printWindow = window.open('', '', 'width=400,height=600');

    printWindow.document.write(`

        <html>

        <head>

            <title>Cetak Struk</title>

            <style>

                body{
                    font-family:Arial;
                    padding:10px;
                    font-size:14px;
                }

                table{
                    width:100%;
                }

                td{
                    padding:4px 0;
                }

            </style>

        </head>

        <body>

            ${isi}

        </body>

        </html>

    `);

    printWindow.document.close();

    printWindow.focus();

    printWindow.print();

    printWindow.close();
}



// ==========================
// JALANKAN
// ==========================

tampilkanRekap();
