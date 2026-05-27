/* =========================
SIDEBAR
========================= */

function toggleSidebar(){

document
.querySelector(".sidebar")
.classList.toggle("active");

document
.querySelector(".sidebar-overlay")
.classList.toggle("active");

}

/* =========================
POPUP PRODUK
========================= */

function closePopup(){

document
.getElementById("popupBox")
.classList.remove("active");

document.body.classList.remove("popup-open");

}

/* =========================
POPUP BAYAR
========================= */

function bukaPopupBayar(){

document
.getElementById("popupBayar")
.classList.add("active");

document.body.classList.add("popup-open");

}

function tutupPopupBayar(){

document
.getElementById("popupBayar")
.classList.remove("active");

document.body.classList.remove("popup-open");

}

/* =========================
POPUP CATATAN
========================= */

function bukaCatatanPopup(){

document
.getElementById("popupCatatan")
.classList.add("active");

document.body.classList.add("popup-open");

}

function tutupPopupCatatan(){

document
.getElementById("popupCatatan")
.classList.remove("active");

document.body.classList.remove("popup-open");

}

/* =========================
CEK PASSWORD CATATAN
========================= */

async function cekPasswordCatatan(){

const inputPassword =
document.getElementById(
"passwordCatatanInput"
).value;

if(!inputPassword){

alert("Masukkan Password");

return;

}

try{

const response =
await fetch(
"https://catatan-241c4-default-rtdb.asia-southeast1.firebasedatabase.app/passwordCatatan.json"
);

const passwordFirebase =
await response.json();

if(
inputPassword ===
String(passwordFirebase)
){

window.location.href =
"catatan.html";

}else{

alert("Password Salah");

}

}catch(error){

console.log(error);

alert("Firebase Error");

}

}

/* =========================
TOAST
========================= */

function showToast(pesan){

const toast =
document.getElementById("toast");

const text =
document.getElementById("toastText");

text.innerHTML = pesan;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}

/* =========================
GLOBAL FUNCTION
========================= */

window.toggleSidebar =
toggleSidebar;

window.closePopup =
closePopup;

window.bukaPopupBayar =
bukaPopupBayar;

window.tutupPopupBayar =
tutupPopupBayar;

window.bukaCatatanPopup =
bukaCatatanPopup;

window.tutupPopupCatatan =
tutupPopupCatatan;

window.cekPasswordCatatan =
cekPasswordCatatan;

window.showToast =
showToast;
