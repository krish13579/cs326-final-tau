window.onload = setter(u);

// document.getElementById("fd").addEventListener("click", () => {
//     window.location.href = "../views/pages/Find Drivers Page/findDrivers.html";
// });
// document.getElementById("fr").addEventListener("click", () => {
//     window.location.href = "../views/pages/Find Riders Page/findRiders.html";
// });
// document.getElementById("yr").addEventListener("click", () => {
//     window.location.href = "../Your Rides Page/yourRides.html";
// });
// document.getElementById("mess").addEventListener("click", () => {
//     window.location.href = "../views/pages/Messages Page/messages.html";
// });
// document.getElementById("yp").addEventListener("click", () => {
//     window.location.href = "profile.html";
// });
// document.getElementById("lo").addEventListener("click", () => {
//     window.location.href = "../views/pages/Login Page/login.html";
// });
function setter(u) {
    let userInfo = getUserInfo();
    
            document.getElementById("firstName").value = userInfo[user].firstName
            document.getElementById("lastName").value = userInfo[user].lastName
            document.getElementById("birthday").value = userInfo[user].birthday
            document.getElementById("email").value = userInfo[user].email
      
}
async function getUserInfo() {
    let responseR = await fetch('/getUserInformation');
    if (responseR.ok) {
        let res = await responseR.json();
        setter(res);
    } else {
        alert("error getting data from server")
    }
}
    

