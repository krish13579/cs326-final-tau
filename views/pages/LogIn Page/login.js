
document.getElementById("submit").addEventListener("click", () => {
    if (isExistingUser()) {
        window.location.href = "../Find Riders Page/findRiders.html";
    }
});

document.getElementById("signup").addEventListener("click", () => {
    window.location.href = "../Sign Up Page/signUp.html";
});
function isExistingUser() {
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;

    if (username.length === 0 || password.length === 0) {
        alert("Please enter a username and password to login");
        return false;
    }

    const usersList = verify();

    if (usersList.hasOwnProperty(username) && usersList[username] == password) {
        // alert("SUCCESS");
        return true;
    }
    else {
        alert("Invalid username or password. Please try again or sign up!")
        return true;
    }


}
function verify() {
    // let response = await fetch(url);
    // if(response.ok){
    //     let response2 = await response.json();
    //     return response2;
    // }else{
    //     alert("error getting data from server")
    // }
    let users = { "maahig": "password", "krishM": "password123", "kabirI": "password0" };
    return users;

}