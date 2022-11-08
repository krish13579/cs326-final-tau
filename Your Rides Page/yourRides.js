window.onload = init





function init(){

   let mainDiv = document.getElementById("yourRidesDiv");
   let driver = document.createElement("div");
    driver.classList.add("driverHeading");
   let rider = document.createElement("div");
    rider.classList.add("riderHeading");
    driver.textContent = "Your Offered Drives";
    rider.textContent = "Your Booked Rides";
    driver.id = "driver";
    rider.id = "rider";
    mainDiv.append(driver);
    mainDiv.append(rider);


    
    let driveData = getDriveData();
    let rideData = getRidesData();

    for(let i = 0; i<driveData.length; ++i){
        let temp = document.createElement("div");
        temp.classList.add("driver");
        let entry = JSON.parse(driveData[i])
        temp.textContent = "From: " + entry.from + " To: " + entry.to + " Date: " + entry.date + " Price: " +entry.price + " Seats: " + entry.seats;
        driver.append(temp);
    }

    for(let i = 0; i<rideData.length; ++i){
        let temp = document.createElement("div");
        temp.classList.add("rider");
        let entry = JSON.parse(rideData[i])
        temp.textContent = "From: " + entry.from + " To: " + entry.to + " Date: " + entry.date + " Price: " +entry.price;
        rider.append(temp);
    }




}


function getRidesData(){

    /*
    will be used when server is activated, fake data for now
    let response = await fetch(url);
    if(response.ok){
        let response2 = await response.json();
        return response2;
    }else{
        alert("error getting data from server")
    }
    */

    
    let cities = ["New York", "Boston", "Hartford", "Amherst"];
    let dates = ["12/08/2022","12/07/2022","12/06/2022","12/05/2022"];
    let prices = ["$30","$40"];
    let seats = ["1","2","3"];
    console.log(cities[Math.floor(Math.random()*cities.length)]);
   let rideData = []
    for(let i = 0; i< 10; ++i){
        let temp = {from:cities[Math.floor(Math.random()*cities.length)] , to: cities[Math.floor(Math.random()*dates.length)], date : dates[Math.floor(Math.random()*cities.length)], 
            price: prices[Math.floor(Math.random()*prices.length)]};
        rideData.push(JSON.stringify(temp));
    }
    
    return rideData;
    
    
}

function getDriveData(){

    /*
    will be used when server is activated, fake data for now
    let response = await fetch(url);
    if(response.ok){
        let response2 = await response.json();
        return response2;
    }else{
        alert("error getting data from server")
    }
    */

    let cities = ["New York", "Boston", "Hartford", "Amherst"];
    let dates = ["12/08/2022","12/07/2022","12/06/2022","12/05/2022"];
    let prices = ["$30","$40"];
    let seats = ["1","2","3"];

   let driveData = []
    for(let i = 0; i< 10; ++i){
        let temp = {from:cities[Math.floor(Math.random()*cities.length)] , to: cities[Math.floor(Math.random()*dates.length)], date : dates[Math.floor(Math.random()*cities.length)], 
            price: prices[Math.floor(Math.random()*prices.length)], seats:seats[Math.floor(Math.random()*seats.length)] };
        driveData.push(JSON.stringify(temp));
    }
    return driveData;
    
}


