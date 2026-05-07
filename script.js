/* =========================
   DATA PRODUK
========================= */

const produk = [

{
id:1,
kategori:'Sembako',
nama:'Beras Premium',
harga:65000
},

{
id:2,
kategori:'Snack',
nama:'Keripik Kentang',
harga:12000
},

{
id:3,
kategori:'Protein',
nama:'Telur 1 Kg',
harga:28000
}

];

let kategoriAktif='Semua';
let cart=[];
let selectedProduct=null;

/* =========================
   FILTER KATEGORI
========================= */

function filterKategori(kat){

kategoriAktif=kat;
renderProduk();

}

/* =========================
   RENDER PRODUK
========================= */

function renderProduk(){

const list=document.getElementById('productList');

const search=document
.getElementById('searchInput')
.value
.toLowerCase();

list.innerHTML='';

const filtered=produk.filter(item=>{

const cocokKategori=
kategoriAktif==='Semua'
|| item.kategori===kategoriAktif;

const cocokSearch=
item.nama.toLowerCase().includes(search);

return cocokKategori && cocokSearch;

});

filtered.forEach(item=>{

list.innerHTML+=`

<div class="produk-row" onclick="openPopup(${item.id})">

<div class="kategori-badge">
${item.kategori}
</div>

<div class="produk-info">

<h3>${item.nama}</h3>

<div class="price">
Rp ${item.harga.toLocaleString()}
</div>

<p class="klik-beli">
Klik untuk transaksi
</p>

</div>

</div>

`;

});

}

/* =========================
   POPUP
========================= */

function openPopup(id){

selectedProduct=
produk.find(p=>p.id===id);

document.getElementById('popupNama').innerHTML=
selectedProduct.nama;

document.getElementById('popupHarga').innerHTML=
'Rp '+selectedProduct.harga.toLocaleString();

document.getElementById('popupQty').value=1;

document.getElementById('popupBox')
.classList.add('active');

}

function closePopup(){

document.getElementById('popupBox')
.classList.remove('active');

}

function popupTambah(){

const qty=document.getElementById('popupQty');

qty.value=parseInt(qty.value)+1;

}

function popupKurang(){

const qty=document.getElementById('popupQty');

if(qty.value>1){

qty.value--;

}

}

/* =========================
   TAMBAH KE CART
========================= */

function confirmAddCart(){

const qty=parseInt(
document.getElementById('popupQty').value
);

const existing=cart.find(
i=>i.id===selectedProduct.id
);

if(existing){

existing.qty+=qty;

existing.subtotal=
existing.qty*existing.harga;

}else{

cart.push({

...selectedProduct,
qty:qty,
subtotal:selectedProduct.harga*qty

});

}

updateCart();

closePopup();

}

/* =========================
   UPDATE CART
========================= */

function updateCart(){

const cartItems=
document.getElementById('cartItems');

const cartCount=
document.getElementById('cartCount');

const cartTotal=
document.getElementById('cartTotal');

cartItems.innerHTML='';

let total=0;

cart.forEach(item=>{

cartItems.innerHTML+=`

<div class="cart-item">

<b>${item.nama}</b><br>

${item.qty} x Rp ${item.harga.toLocaleString()}

<br><br>

<b>
Rp ${item.subtotal.toLocaleString()}
</b>

</div>

`;

total+=item.subtotal;

});

cartCount.innerHTML=cart.length;

cartTotal.innerHTML=`

<h2 class="total-text">

TOTAL :
Rp ${total.toLocaleString()}

</h2>

`;

}

/* =========================
   CART
========================= */

function toggleCart(){

document.getElementById('cartBox')
.classList.toggle('active');

}

function resetCart(){

cart=[];
updateCart();

}

/* =========================
   CHECKOUT
========================= */

async function checkoutKasir(){

const nama=document
.getElementById('namaPembeli')
.value;

const pengiriman=document
.getElementById('pengiriman')
.value;

const pembayaran=document
.getElementById('pembayaran')
.value;

if(!nama){

alert('Isi nama pembeli');
return;

}

if(cart.length===0){

alert('Keranjang kosong');
return;

}

/* TOTAL */

let total=0;
let items=[];
let struk='';

cart.forEach(item=>{

total+=item.subtotal;

items.push({

nama:item.nama,
qty:item.qty,
harga:item.harga,
subtotal:item.subtotal

});

struk+=`

<div style="margin-bottom:8px;">

<div>${item.nama}</div>

<div>
${item.qty} x Rp ${item.harga.toLocaleString()}
</div>

<div>
Rp ${item.subtotal.toLocaleString()}
</div>

</div>

`;

});

/* PRINT CONTENT */

document.getElementById(
'printContent'
).innerHTML=

`

<div>

<p>
Tanggal :
${new Date().toLocaleString()}
</p>

<p>
Pembeli :
${nama}
</p>

<p>
Pembayaran :
${pembayaran}
</p>

<hr>

${struk}

<hr>

<h3>
TOTAL :
Rp ${total.toLocaleString()}
</h3>

</div>

`;

/* DATA */

const data={

nama:nama,
pengiriman:pengiriman,
pembayaran:pembayaran,
total:total,
items:items

};

/* GOOGLE SHEET */

try{

await fetch(

'https://script.google.com/macros/s/AKfycbzMnG5Hs_lPVBNQ7eWXcn7l2tyrP9Nu-Y3WEQ_HF7gn9T61w24YTHxU5Ds3Q3-KopWlJg/exec',

{
method:'POST',
mode:'no-cors',

headers:{
'Content-Type':'text/plain'
},

body:JSON.stringify(data)

}

);

}catch(error){

console.log(error);

}

/* PRINT */

window.print();

/* RESET */

cart=[];
updateCart();

}

/* =========================
   LOAD
========================= */

window.onload=function(){

renderProduk();

}
