/* script.js */

const produk=[

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

function filterKategori(kat){

kategoriAktif=kat;

renderProduk();

}

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

<div
class="produk-row"
onclick="openPopup(${item.id})">

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

function openPopup(id){

selectedProduct=
produk.find(p=>p.id===id);

popupNama.innerHTML=
selectedProduct.nama;

popupHarga.innerHTML=
'Rp '+selectedProduct.harga.toLocaleString();

popupQty.value=1;

popupBox.classList.add('active');

}

function closePopup(){

popupBox.classList.remove('active');

}

function popupTambah(){

popupQty.value=
parseInt(popupQty.value)+1;

}

function popupKurang(){

if(popupQty.value>1){

popupQty.value--;

}

}

function confirmAddCart(){

const qty=parseInt(popupQty.value);

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

function updateCart(){

cartItems.innerHTML='';

let total=0;

cart.forEach(item=>{

cartItems.innerHTML+=`

<div class="cart-item">

<b>${item.nama}</b><br>

${item.qty} x Rp ${item.harga.toLocaleString()}<br><br>

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

TOTAL:
Rp ${total.toLocaleString()}

</h2>

`;

}

function toggleCart(){

cartBox.classList.toggle('active');

}

function resetCart(){

cart=[];

updateCart();

}

window.onload=function(){

renderProduk();

}
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

/* FORMAT STRUK */

struk+=`

<p>
${item.nama}
</p>

<p>
${item.qty} x ${item.harga}
</p>

<p>
Rp ${item.subtotal.toLocaleString()}
</p>

`;

});

/* PRINT CONTENT */

document.getElementById(
'printContent'
).innerHTML=`

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
