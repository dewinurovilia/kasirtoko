/* =========================
POPUP ADMIN
========================= */

function bukaPopupAdmin(){

document
.getElementById("popupAdmin")
.classList.add("active");

document.body.classList.add("popup-open");

}

function tutupPopupAdmin(){

document
.getElementById("popupAdmin")
.classList.remove("active");

document.body.classList.remove("popup-open");

}

/* =========================
LOGIN ADMIN FIREBASE
========================= */

async function loginAdminPopup(){

const email =
document
.getElementById("adminEmail")
.value
.trim();

const password =
document
.getElementById("adminPassword")
.value
.trim();

const info =
document
.getElementById("loginInfo");

if(!email || !password){

info.innerHTML =
"⚠️ Lengkapi Email dan Password";

return;

}

try{

await window.firebaseSignIn(

window.firebaseAuth,

email,

password

);

info.innerHTML =
"✅ Login Berhasil";

setTimeout(()=>{

window.location.href =
"admin/admin.html";

},1000);

}catch(error){

console.log(error);

info.innerHTML =
"❌ Email atau Password Salah";

}

}

/* =========================
CEK LOGIN
========================= */

window.firebaseOnAuth(

window.firebaseAuth,

(user)=>{

if(user){

console.log(
"Admin Login:",
user.email
);
  
}

}

);

/* =========================
LOGOUT
========================= */

function logoutAdmin(){

window.firebaseSignOut(
window.firebaseAuth
);

window.location.href =
"index.html";

}

/* =========================
GLOBAL
========================= */

window.bukaPopupAdmin =
bukaPopupAdmin;

window.tutupPopupAdmin =
tutupPopupAdmin;

window.loginAdminPopup =
loginAdminPopup;

window.logoutAdmin =
logoutAdmin;
/* =========================================
LOGIN KASIR
========================================= */

const loginOverlay =
document.getElementById(
"loginOverlay"
);

/* AUTO LOGIN */

window.addEventListener(
"load",
()=>{

const kasir =
localStorage.getItem(
"kasirNama"
);

if(kasir){

loginOverlay.style.display =
"none";

isiNamaKasir(kasir);

}

}
);

/* LOGIN */

async function loginKasir(){

const nama =
document.getElementById(
"loginNama"
).value.trim();

const email =
document.getElementById(
"loginEmail"
).value.trim();

const password =
document.getElementById(
"loginPassword"
).value.trim();

if(
nama === "" ||
email === "" ||
password === ""
){

showToast(
"Lengkapi login"
);

return;

}

try{

await window.firebaseSignIn(

window.firebaseAuth,

email,

password

);

/* SIMPAN LOGIN */

localStorage.setItem(
"kasirNama",
nama
);

localStorage.setItem(
"kasirEmail",
email
);

/* TUTUP LOGIN */

loginOverlay.style.display =
"none";

/* ISI NAMA */

isiNamaKasir(nama);

showToast(
"Login berhasil"
);

}
catch(error){

console.log(error);

/* ERROR FIREBASE */

if(
error.code ===
"auth/invalid-credential"
){

showToast(
"Email atau password salah"
);

}
else if(
error.code ===
"auth/user-not-found"
){

showToast(
"Akun tidak ditemukan"
);

}
else if(
error.code ===
"auth/wrong-password"
){

showToast(
"Password salah"
);

}
else{

showToast(
"Gagal login"
);

}

}

}

/* ISI NAMA */

function isiNamaKasir(nama){

const namaPemesan =
document.getElementById(
"namaPemesan"
);

if(namaPemesan){

namaPemesan.value =
nama;

}

}

/* LOGOUT */

function logoutKasir(){

localStorage.removeItem(
"kasirNama"
);

localStorage.removeItem(
"kasirEmail"
);

location.reload();

}

/* GLOBAL */

window.loginKasir =
loginKasir;

window.logoutKasir =
logoutKasir;
