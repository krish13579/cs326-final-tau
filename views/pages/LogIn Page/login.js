
document.getElementById("submit").addEventListener("click", isExistingUser);

function isExistingUser(){
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;


    if(username.length === 0 || password.length === 0){
        alert("Please enter a username and password to login");
        return;
    }
   
    const usersList = verify();

    if(usersList.hasOwnProperty(username) && usersList[username]==password){
        alert("SUCCESS");
    }
    else{
        alert("Invalid username or password. Please try again or sign up!")
    }
    
    
}
function verify(){
    // let response = await fetch(url);
    // if(response.ok){
    //     let response2 = await response.json();
    //     return response2;
    // }else{
    //     alert("error getting data from server")
    // }
    let users = {"maahig": "password", "krishM": "password123", "kabirI": "password0"};
    return users;

}