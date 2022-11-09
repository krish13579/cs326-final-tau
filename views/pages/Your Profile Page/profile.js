const u = "maahig@gmail.com";
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
    for (let user in userInfo) {

        if (u === userInfo[user].email) {
            console.log("test")
            document.getElementById("firstName").value = userInfo[user].firstName
            document.getElementById("lastName").value = userInfo[user].lastName
            document.getElementById("birthday").value = userInfo[user].birthday
            document.getElementById("email").value = userInfo[user].email
        }
    }
}
function getUserInfo() {
    // let response = await fetch(url);
    // if(response.ok){
    //     let response2 = await response.json();
    //     return response2;
    // }else{
    //     alert("error getting data from server")
    // }
    const users = [{ "firstName": "Maahi", "lastName": "Goel", "birthday": '2000-11-10', "email": "maahig@gmail.com" },
    { "firstName": "X", "lastName": "Y", "birthday": '2000-01-11', "email": "x@gmail.com" },
    { "firstName": "A", "lastName": "B", "birthday": '2000-01-11', "email": "a@gmail.com" }]
    return users;


}
function changePassword(){
    
}


