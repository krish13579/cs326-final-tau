##APIs
### Data Structure:

	const userObject = {

	// Constant String

	"firstName" : first,

	//Constant String

	"lastName": last,

	// Constant Date Object

	"birthday": birth,

	// Constant String

	"email": email,

	// Constant String

	"password": pass,

	};

	  

	const rideObject = {

	// Constant Integer

	"rideID" : rid,

	// Constant String

	"creator" : userId,

	// Boolean = Request or Offered

	"type" : type,

	// Constant String

	"origin": from,

	// Constant String

	"destination": to,

	// Constant Date Object

	"date": date,

	// Constant Integer

	"price": price,

	// Dynamic Integer

	"numOfSeats" : numOfSeats,

	// Dynamic Array

	"bookedUsers" : []

	};

### Function Structure:

#### Post Methods

-   Create User:
    

	-   Here a user object is being sent by the client side code of the application.
	    
	-   Extension Name:/createUser
    

-   Update User:
    
	
	-   Here a user object is being sent by the client side code of the application.
	    
	-   Extension Name: /updateUser
	    

-   Verify User:
    
	
	-   Here the email and password keys of the user object in the database are being sent by the client side code of the application.
	    
	-   Extension Name:/verifyUser
	    

-   Request Ride:
    
	
	-   Here a ride object is being sent by the client side code of the application.
	    

	-   The type key of the object here will be “request”.
	    
	
	-   Extension Name: /requestRide
	    

-   Create Ride:
	    

	-   Here a ride object is being sent by the client side code of the application.
	    

	-   The type key of the object here will be “offered”.
	    
	
	-   Extension Name:/createRide
	    

-   Reserve Seat:
    

	-   Here the rideID key of the ride object in the database and the email key of the user object in the database are being sent by the client side code of the application.
    
	-   The server will then query through the table of all rides with type = “offered”, and where the rideID matches it will check if the numOfSeats > 0, if TRUE it will decrement numOfSeats and push the email sent of the user in the bookedUsers array.
	    
	-   Extension Name:/reserveSeat
	    

### Get Methods

-   Get All Requested Rides:
    

	-   Here an array of all ride objects with type key = “request” will be returned from the database.
	    
	-   Extension Name: /getAllRequestedRides
	    

-   Get All Offered Rides:
    
	
	-   Here an array of all ride objects with type key = “offered” will be returned from the database.
	    
	-   Extension Name:/getAllOfferedRides
	    

-   Get Booked Rides:
    
	
	-   Here the email key of the user object in the database is being sent by the client side code of the application.
	    
	-   The server will respond with an array of all ride objects with type key = “offered” where the user identified with the email is present in the bookedUsers array.
	    
	-   Extension Name: /getBookedRides
    

-   Get Offered Rides:
    
	
	-   Here the email key of the user object in the database is being sent by the client side code of the application.
	    
	-   The server will respond with an array of all ride objects with type key = “offered” where the user identified with the email = creator.
	    
	-   Extension Name:/getOfferedRides
	    

-   Get User Information:
    
	
	-   Here the email key of the user object in the database is being sent by the client side code of the application.
	    
	-   The server will respond with the user object where email = email.
	    
	-   Extension Name:/getUserInformation
	    

-   Get Connected User Information:
    
	
	-   Here the email key of the user object in the database is being sent by the client side code of the application.
	    
	-   The server will respond with an array of all user objects where the user identified with the creator in the ride objects with type = “offered”, and the email is present in the bookedUsers array.
	    

	- Extension Name: /messageData


## CLient Side UI

<img width="1440" alt="Screen Shot 2022-11-09 at 10 56 20 PM" src="https://user-images.githubusercontent.com/67108579/200997275-37ac89d2-81d5-4d49-aa32-046844c960d5.png">

### Find Drivers page lists all current riders a user can reserve. This page allows the user to look through available rides based on different criteria. The user can also request a ride if they don't see one that fits their criteria. This can be done through the request form on the right hand side. 


<img width="929" alt="Screen Shot 2022-11-09 at 10 59 29 PM" src="https://user-images.githubusercontent.com/67108579/200997448-86c95ac9-4eef-45f6-bced-f5760ff3ff97.png">

### The user can access their personal details in the profiles tab. The user will see their information and can edit their information or change their password on this page. 

<img width="1427" alt="Screen Shot 2022-11-09 at 11 00 28 PM" src="https://user-images.githubusercontent.com/67108579/200997547-e442b2e6-1bb5-4360-b7f5-0fb58e5877ee.png">

### The user can see all their previouslt requested, created, and completed rides on this page. 

<img width="1439" alt="Screen Shot 2022-11-09 at 11 01 09 PM" src="https://user-images.githubusercontent.com/67108579/200997636-be86e369-e8c6-4bd9-b7f6-c8eb58651496.png">

### Find Riders page lists all current requests people have made. This page allows the drivers to look through current requests based on different criteria. The user can also create a ride if have a new opening for a seat on an upcoming trip. This can be done through the request form on the right hand side. 

## Link: https://ridebuddy1.herokuapp.com/

## Division of Labor:  

- Maahi
	 - JS for Login, Profile, Find Drivers, and Find Riders Pages
	 - Link Pages Together
	 - Mark-down file creation
- Kabir
	- HTML & CSS of Login, Signup, Your Rides, Profile, Messages, Find Drivers, Find Riders Pages
	- Set up Heruko Server and Procfile for application
	- Final Project API Documentation
- Krish
	- JS for Signup, Your Rides, and Messages Pages
	- Set up Server to Implement dummy data
	- Initial Project API Documentation



