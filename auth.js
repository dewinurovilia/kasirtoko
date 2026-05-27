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
