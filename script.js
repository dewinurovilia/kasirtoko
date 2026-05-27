/* =========================
AMBIL FIREBASE DARI firebase.js
========================= */

const firebaseDB =
window.firebaseDB;

const firebaseRef =
window.firebaseRef;

const firebaseOnValue =
window.firebaseOnValue;

const auth =
window.firebaseAuth;

/* =========================
VARIABLE
========================= */

let produk = [];

let kategoriAktif = 'Semua';

let cart = [];

let selectedProduct = null;

let uangBayarGlobal = 0;

let kembalianGlobal = 0;

/* =========================
LOAD AWAL
========================= */

document.addEventListener(
'DOMContentLoaded',
()=>{

loadProduk();

toggleQR();

updateCart();

toggleMetode();

}
);

/* =========================
LOAD PRODUK
========================= */

function loadProduk(){

const produkRef =
firebaseRef(
firebaseDB,
"produk"
);

firebaseOnValue(
produkRef,
(snapshot)=>{

const data =
snapshot.val();

if(!data){

console.log(
'Data kosong'
);

return;

}

produk =
Object.entries(data).map(
([key,item])=>({

firebaseKey:key,

id:item.id || key,

...item

})
);

renderKategori();

renderProduk();

}
);

}

/* =========================
FILTER KATEGORI
========================= */

window.filterKategori =
function(kat){

kategoriAktif = kat;

renderProduk();

}

/* =========================
RENDER PRODUK
========================= */

window.renderProduk =
function(){

const list =
document.getElementById(
'productList'
);

if(!list) return;

const searchInput =
document.getElementById(
'searchInput'
);

const search =
searchInput
? searchInput.value.toLowerCase()
: '';

list.innerHTML = '';

const filtered =
produk.filter(item=>{

const cocokKategori =

kategoriAktif === 'Semua'
||
(item.kategori || '')
=== kategoriAktif;

const nama =
(item.nama || '')
.toLowerCase();

const kategori =
(item.kategori || '')
.toLowerCase();

const cocokSearch =

nama.includes(search)
||
kategori.includes(search)
||
(item.id || '')
.includes(search);

return cocokKategori
&& cocokSearch;

});

filtered.forEach(item=>{

list.innerHTML += `

<div class="product-card"
onclick="openPopup('${item.id}')">

<div class="product-left">

${item.kategori || 'Produk'}

<small>
stok : ${item.stok || 0}
</small>

</div>

<div class="product-name">

${item.nama}

</div>

<div class="product-price">

Rp ${Number(item.harga)
.toLocaleString('id-ID')}

</div>

</div>

`;

});

}

/* =========================
POPUP PRODUK
========================= */

window.openPopup =
function(id){

selectedProduct =
produk.find(
p => p.id == id
);

if(!selectedProduct){
return;
}

if(
Number(selectedProduct.stok)
<= 0
){

showToast(
'Stok habis'
);

return;

}

document.getElementById(
'popupNama'
).innerHTML =
selectedProduct.nama;

document.getElementById(
'popupHarga'
).innerHTML =

'Rp ' +

Number(
selectedProduct.harga
).toLocaleString();

document.getElementById(
'popupQty'
).value = 1;

document.getElementById(
'popupBox'
).classList.add('active');

}

/* =========================
QTY +
========================= */

window.popupTambah =
function(){

const qty =
document.getElementById(
'popupQty'
);

const jumlah =
parseInt(qty.value);

const stok =
parseInt(
selectedProduct.stok || 0
);

if(jumlah >= stok){

showToast(
'Stock hanya tersisa ' +
stok
);

return;

}

qty.value =
jumlah + 1;

}

/* =========================
QTY -
========================= */

window.popupKurang =
function(){

const qty =
document.getElementById(
'popupQty'
);

if(qty.value > 1){

qty.value--;

}

}

/* =========================
TAMBAH CART
========================= */

window.confirmAddCart =
function(){

const qty =
parseInt(
document.getElementById(
'popupQty'
).value
);

const stok =
parseInt(
selectedProduct.stok || 0
);

const existing =
cart.find(
i => i.id == selectedProduct.id
);

if(qty > stok){

showToast(
'Jumlah melebihi stock'
);

return;

}

if(existing){

const totalQty =
existing.qty + qty;

if(totalQty > stok){

showToast(
'Stock tidak cukup'
);

return;

}

existing.qty += qty;

}else{

cart.push({

...selectedProduct,

harga:Number(
selectedProduct.harga
),

qty:Number(qty)

});

}

updateCart();

toggleMetode();

closePopup();

showToast(
selectedProduct.nama +
' ditambahkan'
);

}

/* =========================
TOGGLE CART
========================= */

window.toggleCart =
function(){

document
.getElementById('cartBox')
.classList
.toggle('active');

}

/* =========================
TOGGLE QR
========================= */

window.toggleQR =
function(){

const pembayaran =
document.getElementById(
'pembayaran'
);

const qr =
document.getElementById(
'qrBox'
);

if(!pembayaran || !qr)
return;

if(
pembayaran.value
=== 'Transfer'
){

qr.style.display =
'block';

}else{

qr.style.display =
'none';

}

}

/* =========================
UPDATE CART
========================= */

function updateCart(){

const cartBox =
document.getElementById(
'cartItems'
);

const totalBox =
document.getElementById(
'cartTotal'
);

const countBox =
document.getElementById(
'cartCount'
);

if(!cartBox) return;

cartBox.innerHTML = '';

let total = 0;

if(cart.length === 0){

cartBox.innerHTML =
'<p>Keranjang kosong</p>';

if(totalBox){

totalBox.innerHTML='';

}

if(countBox){

countBox.innerHTML='0';

}

return;

}

cart.forEach((item,index)=>{

const subtotal =
item.harga * item.qty;

total += subtotal;

cartBox.innerHTML += `

<div class="cart-item">

<div class="cart-row">

<div>

<h4>${item.nama}</h4>

<p>

${item.qty} x
Rp ${Number(item.harga)
.toLocaleString('id-ID')}

</p>

</div>

<b class="cart-subtotal">

Rp ${subtotal
.toLocaleString('id-ID')}

</b>

</div>

<button
class="btn-hapus-modern"
onclick="hapusCart(${index})">

🗑 Hapus

</button>

</div>

`;

});

if(totalBox){

totalBox.innerHTML =

'Total : Rp ' +
total.toLocaleString();

}

if(countBox){

countBox.innerHTML =
cart.length;

}

}

/* =========================
HAPUS CART
========================= */

window.hapusCart =
function(index){

cart.splice(index,1);

updateCart();

toggleMetode();

}

/* =========================
RESET CART
========================= */

window.resetCart =
function(){

if(cart.length === 0){

showToast(
'Keranjang kosong'
);

return;

}

const yakin =
confirm(
'Kosongkan keranjang?'
);

if(!yakin) return;

cart = [];

updateCart();

toggleMetode();

showToast(
'Keranjang dikosongkan'
);

}

/* =========================
TOGGLE METODE
========================= */

window.toggleMetode =
function(){

const pengiriman =
document.getElementById(
'pengiriman'
);

const btnWA =
document.getElementById(
'btnWA'
);

const btnStruk =
document.getElementById(
'btnStruk'
);

if(
!pengiriman
||
!btnWA
||
!btnStruk
) return;

btnWA.style.display =
'none';

btnStruk.style.display =
'none';

if(cart.length===0){
return;
}

if(
pengiriman.value
=== 'Diantar'
){

btnWA.style.display =
'flex';

}

if(
pengiriman.value
=== 'Ambil Sendiri'
){

btnStruk.style.display =
'flex';

}

}

/* =========================
RENDER KATEGORI
========================= */

function renderKategori(){

const kategoriList =
document.getElementById(
'kategoriList'
);

if(!kategoriList) return;

const kategoriUnik = [

'Semua',

...new Set(
produk.map(
item =>
item.kategori
||
'Lainnya'
)
)

];

kategoriList.innerHTML='';

kategoriUnik.forEach(kat=>{

const aktif =

kat === kategoriAktif

? 'active'
: '';

kategoriList.innerHTML += `

<button
class="${aktif}"
onclick="filterKategori('${kat}')">

${kat}

</button>

`;

});

}

/* =========================
FORMAT INPUT UANG
========================= */

window.formatInputUang =
function(input){

let angka =
input.value.replace(
/\D/g,
''
);

input.value =
Number(angka)
.toLocaleString('id-ID');

}
/* =========================
POPUP BAYAR
========================= */

window.bukaPopupBayar =
function(){

if(cart.length === 0){

showToast(
'Keranjang kosong'
);

return;

}

let total = 0;

cart.forEach(item=>{

const harga =
Number(item.harga) || 0;

const qty =
Number(item.qty) || 0;

total += harga * qty;

});

console.log(total);

document.getElementById(
'totalBayarText'
).innerHTML =

'Rp ' +
total.toLocaleString(
'id-ID'
);

document.getElementById(
'popupBayar'
).classList.add('active');

}
