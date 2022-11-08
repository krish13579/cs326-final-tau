
document.getElementById("submit").addEventListener("click",validateInfo);

function validateInfo(){

let first = document.getElementById("firstName").value;
let last = document.getElementById("lastName").value;
let birth = document.getElementById("birthday").value;
let email = document.getElementById("email").value;
let pass = document.getElementById("password").value;
let cPass = document.getElementById("confirmPassword").value;

if(first.length === 0 || last.length === 0){
    alert("Name is not filled out");
    return;
}

if(pass !== cPass){
    alert("Password does not match confirmed password");
    return;
}

if(email.indexOf("@") === -1){
    alert("not a valid email address");
    return;
}

let newUser = {"firstName" : first, "lastName": last, "birthday": birth, "email": email, "password": pass};

alert("SUCCESS");

}

function sendServer(nUser){

    let Json = JSON.stringify(nUser);





}


