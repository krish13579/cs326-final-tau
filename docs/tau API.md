**TAU API**
## **Data Structure:**
const userObject = {

// Constant String

`    `**"firstName" : first,** 

`    `//Constant String

`    `**"lastName": last,** 

`    `// Constant Date Object

`    `**"birthday": birth,** 

`    `// Constant String

`    `**"email": email,** 

`    `// Constant String

`    `**"password": pass,**

};

const rideObject = {

`    `// Constant Integer

`    `**"rideID" : rid,**

`    `// Constant String

`    `**"creator" : userId,**

`    `// Boolean = Request or Offered

`    `**"type" : type,**

`    `// Constant String

`    `**"origin": from,** 

`     `// Constant String

`    `**"destination": to,** 

`     `// Constant Date Object

`    `**"date": date,** 

`    `// Constant Integer

`    `**"price": price,**

`    `// Dynamic Integer

`    `**"numOfSeats" : numOfSeats,**

`    `// Dynamic Array

`    `**"bookedUsers" : []**

};
## **Function Structure:**
### Post Methods
- Create User:
  - Here a **user object** is being sent by the client side code of the application.
  - Extension Name:/createUser
- Update User:
  - Here a **user object** is being sent by the client side code of the application.
  - Extension Name: /updateUser
- Verify User:
  - Here the **email** and **password** keys of the **user object** in the database are being sent by the client side code of the application.
  - Extension Name:/verifyUser
- Request Ride:
  - Here a **ride object** is being sent by the client side code of the application.
    - The **type** key of the object here will be **“request”**.
  - Extension Name: /requestRide
- Create Ride:
  - Here a **ride object** is being sent by the client side code of the application.
    - The **type** key of the object here will be **“offered”**.
  - Extension Name:/createRide
- Reserve Seat:
  - Here the **rideID** key of the **ride object** in the database and the **email** key of the **user object** in the database are being sent by the client side code of the application.
  - The server will then query through the table of all rides with type = **“offered”**, and where the **rideID** matches it will check if the **numOfSeats > 0,** if **TRUE** it will decrement  **numOfSeats** and push the **email** sent of the user in the **bookedUsers** array.
  - Extension Name:/reserveSeat
### Get Methods
- Get All Requested Rides:
  - Here an array of all **ride objects** with **type** key = **“request”** will be returned from the database. 
  - Extension Name: /getAllRequestedRides
- Get All Offered Rides:
  - Here an array of all **ride objects** with **type** key = **“offered”** will be returned from the database. 
  - Extension Name:/getAllOfferedRides
- Get Booked Rides:
  - Here the **email** key of the **user object** in the database is being sent by the client side code of the application.
  - The server will respond with an **array** of all **ride objects**  with **type** key = **“offered”** where the user identified with the **email** is present in the **bookedUsers array.**
  - Extension Name: /getBookedRides
- Get Offered Rides:
  - Here the **email** key of the **user object** in the database is being sent by the client side code of the application.
  - The server will respond with an **array** of all **ride objects** with **type** key = **“offered”** where the user identified with the **email** = **creator.**
  - Extension Name:/getOfferedRides
- Get User Information:
  - Here the **email** key of the **user object** in the database is being sent by the client side code of the application.
  - The server will respond with the **user object** where **email** = **email.**
  - Extension Name:/getUserInformation
- Get Connected User Information:
  - Here the **email** key of the **user object** in the database is being sent by the client side code of the application.
  - The server will respond with an **array** of all **user objects** where the user identified with the **creator** in the ride objects with **type = “offered”,** and the **email** is present in the **bookedUsers array.**
  - Extension Name:  /messageData

Kabir Israni, Krish Malhotra, Maahi Goel
