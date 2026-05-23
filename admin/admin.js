import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* =========================
FIREBASE CONFIG
========================= */

const firebaseConfig = {

apiKey: "AIzaSyCvco9APepbM1YRhDLGzE2uxFBVtLL2NLs",
  authDomain: "fauz2327-b8dfa.firebaseapp.com",
  databaseURL: "https://fauz2327-b8dfa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fauz2327-b8dfa",
  storageBucket: "fauz2327-b8dfa.firebasestorage.app",
  messagingSenderId: "625104866445",
  appId: "1:625104866445:web:129165fbc539edb36466c4",

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

/* =========================
LOGIN ADMIN
========================= */

window.loginAdmin = async function(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

document.getElementById("loginBox")
.style.display = "none";

document.getElementById("dashboard")
.style.display = "block";

renderProduk();

}
catch(error){

alert("Email atau password salah");

console.log(error);

}

};

/* =========================
CEK LOGIN
========================= */

onAuthStateChanged(auth, (user)=>{

if(user){

document.getElementById("loginBox")
.style.display = "none";

document.getElementById("dashboard")
.style.display = "block";

renderProduk();

}else{

document.getElementById("loginBox")
.style.display = "block";

document.getElementById("dashboard")
.style.display = "none";

}

});

/* =========================
LOGOUT
========================= */

window.logoutAdmin = async function(){

await signOut(auth);

alert("Logout berhasil");

};

/* =========================
DATA PRODUK
========================= */

let produk = [];

/* =========================
LOAD STORAGE
========================= */

const dataStorage =
localStorage.getItem("produk");

if(dataStorage){

produk = JSON.parse(dataStorage);

}

/* =========================
LOAD PRODUK JSON
========================= */

fetch("produk.json")
.then(res => res.json())
.then(data => {

if(produk.length === 0){

produk = data;

}

renderProduk();

});

/* =========================
RENDER PRODUK
========================= */

function renderProduk(){

const searchInput =
document.getElementById("searchProduk");

if(!searchInput) return;

const keyword =
searchInput.value.toLowerCase();

const list =
document.getElementById("listProduk");

if(!list) return;

list.innerHTML = "";

/* =========================
BATAS STOCK MENIPIS
========================= */

const BATAS_STOCK = 3;

/* =========================
FILTER PRODUK
========================= */

const hasil =
produk.filter(item =>

item.nama
.toLowerCase()
.includes(keyword)

);

/* =========================
STOCK MENIPIS
========================= */

const stockSedikit =
hasil.filter(item =>

Number(item.stock || 0)
<= BATAS_STOCK

);

const stockNormal =
hasil.filter(item =>

Number(item.stock || 0)
> BATAS_STOCK

);

/* =========================
WARNING BOX
========================= */

if(stockSedikit.length > 0){

list.innerHTML += `

<div class="stock-warning-box">

⚠️ STOCK MENIPIS
(${stockSedikit.length} Produk)

</div>

`;

}

/* =========================
RENDER STOCK MENIPIS
========================= */

stockSedikit.forEach((item)=>{

list.innerHTML += `

<div class="produk stock-tipis">

<div>

<h3>${item.nama}</h3>

<p>
⚠️ Stock : ${item.stock || 0}
</p>

</div>

<div class="btn-group">

<button
class="btn tambah"
onclick="tambahStock('${item.id}')">

+ Stock

</button>

<button
class="btn kurang"
onclick="kurangStock('${item.id}')">

- Stock

</button>

</div>

</div>

`;

});

/* =========================
RENDER STOCK NORMAL
========================= */

stockNormal.forEach((item)=>{

list.innerHTML += `

<div class="produk">

<div>

<h3>${item.nama}</h3>

<p>
Stock : ${item.stock || 0}
</p>

</div>

<div class="btn-group">

<button
class="btn tambah"
onclick="tambahStock('${item.id}')">

+ Stock

</button>

<button
class="btn kurang"
onclick="kurangStock('${item.id}')">

- Stock

</button>

</div>

</div>

`;

});

}

/* =========================
TAMBAH STOCK
========================= */

window.tambahStock = function(id){

const item =
produk.find(p => p.id == id);

if(!item.stock){

item.stock = 0;

}

item.stock++;

renderProduk();

simpanStorage();

};

/* =========================
KURANG STOCK
========================= */

window.kurangStock = function(id){

const item =
produk.find(p => p.id == id);

if(!item.stock){

item.stock = 0;

}

if(item.stock > 0){

item.stock--;

}

renderProduk();

simpanStorage();

};

/* =========================
SIMPAN STORAGE
========================= */

function simpanStorage(){

localStorage.setItem(
"produk",
JSON.stringify(produk)
);

}
