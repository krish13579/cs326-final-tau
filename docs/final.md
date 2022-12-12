
# COMPSCI 326 FINAL PROJECT

## Title

Team TAU

## Subtitle

RideBuddy

## Semester

Fall 2022

  

## Overview

Ride Buddy is a platform that helps people find rideshares. Car providers can input the details of their trip, including the pickup location, destination, and pickup range, as well as the price per seat. They can also browse existing ride requests from riders to see if there are any pre-existing requests that they can fulfill. On the rider side, users can search for available rideshare options that match their needs, and can also submit their own ride request if they don't find a suitable match. If a rider finds a driver that they want to book a ride with, they can reserve a seat. In the messages section, you can find the contact information of the person who’s ride you have booked

The ride buddies platform involves a server implementation using Postgresql for storing and managing the data, Express for routing the different pages and functionalities of the platform, and encryption using Bcrypt to safely store passwords and protect user information. By using Postgresql, Express node.js, and Bcrypt, we can ensure that data is stored and managed in an efficient, organized, and secure manner, and that users can interact with the platform in a convenient and user-friendly way.

  
  

## Team Members

Kabir Israni - KabirIsraniUmass

Krish Malhotra - krish13579

Maahi Goel - maahigoel

  

## User Interface

The website acts as a user portal where a user can take on 2 different personas, needing a ride or providing a ride. Our interface is laid out in a way that mimics this usability.

  

When a user first opens the website, they see a login form. They can log in or sign up accordingly through a simple and aesthetic form page. This will lead the user into the website portal where they can navigate to find their desired rides.

  

The hero landing page once a user logs in contains all the important information without having to scroll. This creates a seamless experience for the user and allows for ease of use.

  

The navigation bar allows the user to easily navigate back and forth between pages to see available and requested ride information. The user can also access the on-screen one-click request form easily on the respective page. The frozen navigation bar on the left allows the user ease of access to switch back and forth and also minimizes the required clicks to get to the goal page.The buttons are all responsive allowing the user to get immediate feedback once an action is made on the client side.

  
  

To view further information about personal history, the user can navigate to the your rides page which lists all booked and requested rides. The messages tab takes the user into more information about the driver or riders for specific rides to establish a point of contact.

Lastly, a user can see their profile information and easily edit their contact information.

  

The UI is simplified to allow for a smooth and comfortable experience while on the website. The number of required clicks is limited and the important information is all displayed on the screen at a time in an organized manner to allow for a seamless experience.

  

All the forms have unified input controls and the stylistic elements such as buttons, arrows, and fonts are standardized to create a cohesive product. The colors are simple and clean to avoid clutter and allow for a zen experience.

  

## APIs

This is our final API, we made some changes from our initial documentation as more calls were needed for some of our features.

  

### Data Structures:

  

**User Object** : This is used to hold user information such as email, password, and other relevant info.

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

  

**Ride Object**: This is used to hold all information about a specific ride. It includes a unique Ride ID, the creator of the ride, the type(whether the creator offered or requested this ride), origin, destination, date, price per seat, number of seats available, and the users who have booked this ride.

  

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

  

### API Methods:

  

We created two routers for our project, one for obtaining and modifying data from the users table and one for obtaining and modifying data from the rides table.

  

**Rides methods:**

-   Request Ride:
    

-   Purpose: Allow the user to request a new ride
    
-   Here a ride object is being sent by the client side code of the application in the body of the put request. The email of the user creating the ride is being sent as a parameter in the route. The method will create a new ride with type”requested” and add it to the database
    
-   Return Value: If successful, the response is JSON of an object with properties “status” and “message” with a successful status and message of what was updated
    
-   Type of method: POST
    
-   Extension Name: rides/requestRide/:userInfo
    

**-   Create Ride:**
    

-   Purpose: Allow the user to create (offer) a new ride
    
-   Here a ride object is being sent by the client side code of the application in the body of the put request. The email of the user creating the ride is being sent as a parameter in the route. The method will create a new ride with type”offered” and add it to the database
    
-   Return Value: If successful, the response is JSON of an object with properties “status” and “message” with a successful status and message of what was updated
    
-   Type of method: POST
    
-   Extension Name: rides/createRide/:userInfo
    

**-   Reserve Seat:**
    

-   Purpose: Allow the user to reserve a seat for an existing offered ride
    
-   Here the rideID key of the ride object in the database and the email key of the user object in the database are being sent by the client side code of the application as parameters in the URL. The method will add the user as a bookedUser under the correct ride and decrement the number of seats available.
    
-   Return Value: If successful, the response is JSON of an object with properties “status” and “message” with a successful status and message of what was updated
    
-   Type of method: POST
    
-   Extension Name:rides/reserveSeat/:id/:rid
    

**-   Message Data:**
    

-   Purpose: Allow users to receive contact information of the driver for rides that you have reserved
    
-   Here the user email in the database is being sent by the client side in the URL of the request. The database will then return rides where this user is a booked user.
    
-   Return Value: If successful, the response is JSON of an array of user objects that you have booked a ride with.
    
-   Type of method: GET
    
-   Extension Name: rides/messageData/:userInfo
    

**-   Get All Requested Rides:**
    

-   Purpose: Retrieve all rides with type “requested” to allow users to see what rides are being requested by other users
    
-   No information is being sent by the client side for this method, the database will query through all existing rides and return the ones where type is “requested”
    
-   Return Value: If successful, response is JSON of an array of ride object where the type is “requested”
    
-   Type of method: GET
    
-   Extension Name: rides/getAllRequestedRides
    

**-   Get All Offered Rides:**
    

-   Purpose: Retrieve all rides with type “offered” to allow users to see what rides are being offered
    
-   No information is being sent by the client side for this method, the database will query through all existing rides and return the ones where type is “offered”
    
-   Return Value: If successful, response is JSON of an array of ride object where the type is “offered”
    
-   Type of method: GET
    
-   Extension Name: rides/getAllOfferedRides
    

**-   Get Booked Rides:**

-   Purpose: Retrieve all rides that a certain user has booked
    
-   Here the email key of the user object in the database is being sent by the client side code of the application through the URL as a parameter.
    
-   Return Value: If successful, response is JSON of an array of ride object where the user is part of the bookedUsers array for the ride
    
-   Type of method: GET
    
-   Extension Name: rides/getBookedRides/:userInfo
    

**-   Get Offered Rides:**

-   Purpose: Retrieve all rides that a certain user has offered
    
-   Here the email key of the user object in the database is being sent by the client side code of the application through the URL as a parameter.
    
-   Return Value: If successful, response is JSON of an array of ride objects where the creator is the user and type is “offered”
    
-   Type of method: GET
    
-   Extension Name: rides/getOfferedRides/:userInfo
    

  

### User methods:

**-   Create User:**
    

-   Purpose: Used when a new user signs up
    
-   Here the user object of the new user is being sent by the client side code of the application through the URL as a parameter.
    
-   Return Value: If successful, the response is JSON of an object with properties “status” and “message” with a successful status and message of what was updated
    
-   Type of method: POST
    
-   Extension Name: users/register/:userObj
    

  

**-   Verify User:**
    

-   Purpose: Used to verify the existence of a user when logging in
    
-   Here the user object of the user logging in is being sent by the client side code of the application through the URL as a parameter.
    
-   Return Value: The response is JSON of an object with properties “validity” and “comments”. If the username and password matches an existing user in the database, the validity property will be set to true, otherwise it will be false/
    
-   Type of method: POST
    
-   Extension Name: users/verify/:userObj
    

  

**-   Update User:**
    

-   Purpose: Used when a user changes information about themselves in the your profiles page
    
-   Here the email of the user changing information is sent by the client side code of the application through the URL as a parameter and the user object is being sent in the body of the request.
    
-   Return Value: If successful, the response is JSON of an object with properties “status” and “message” with a successful status and message of what was updated.
    
-   Type of method: PUT
    
-   Extension Name: users/:userObj
    

  

**-   Get User Information:**
    

-   Purpose: Used to get information about a user when needed such as in the your profile page
    
-   Here the email of the user changing information is sent by the client side code of the application through the URL as a parameter.
    
-   Return Value: If successful, the response is JSON of an object with the user’s first name, last name, and birthday
    
-   Type of method: GET
    
-   Extension Name: users/:userObj
    

  

## Database

In the backend, there are 2 relations that are used to save all required information. The Users table holds user information such as login credentials, contact information, and identification information such as birthdays. The primary key for the Users table is the userID which is the email address of each user. This is a unique identifier and all other fields are non-null fields.

  

The second table in the database is the rides table. This table contains information pertaining the rides a user can offer or request. Each ride has a unique ride ID which is the serial primary key in the database.

  

The rides table also contains a column called “type”. This column declares whether the ride is of type “offered” or “requested”. This information is used when differentiating between the 2 different pages called find riders and find drivers.

  

The rides table also contains columns for price, origin, destination, and number of seats. It contains a column for the creator which contains a user ID. This column also acts as the foreign key to the Users table. Lastly, it contains a column for booked users which is an array of usernames that have reserved a seat in a respected ride. These usernames are also searchable in the Users database.

  

Overall, the database schema is laid out in a very organized fashion and can be easily expanded on. If there is more functionality added in the future about the rides, the rides table can be adapted for those changes very easily with an update command.

  

## URL Routes/Mappings

Our web platform uses the ExpressJS framework to handle routing and mapping of URLs. This allows us to separate the logic for handling user and ride objects, and maintain user sessions and render relevant data for each individual user.

  

The server.js file defines the root route and several other routes that are used by the web application. For example, the /yourProfile/:userInfo route is used to render the "Your Profile" page, and the /findDrivers/:userInfo route is used to render the "Find Drivers" page. Each route includes the user information in the URL, which is parsed and passed as a parameter to the res.render() method to generate the appropriate response.

  

The server.js file also includes two routers, userRouter and ridesRouter, which handle the logic for creating and manipulating user and ride objects. The userRouter handles requests related to user accounts, such as creating a new account or updating an existing account. The ridesRouter handles requests related to rides, such as booking a new ride or canceling an existing ride. The server.js file uses the app.use() method to connect the routers to the corresponding URLs. For example, the app.use("/users", userRouter) line maps the userRouter to the /users URL, so that any requests to this URL will be handled by the userRouter. Similarly, the app.use("/rides",ridesRouter) line maps the ridesRouter to the /rides URL, so that any requests to this URL will be handled by the ridesRouter.

  

The userRouter is a router in the ExpressJS framework that handles requests related to user accounts on the web platform. It uses the router.get() and router.post() methods to define several routes that are used by the web application.

  

The router.get("/new", (req, res) => {}) route is used to render the "Sign Up" page, where users can create a new account on the platform. The router.get("/verify/:userObj", async (req, res) => {}) route is used to verify the user's credentials when they log in to the platform. It queries the database to find the user and compares the password using the compareHashedPassword helper function. The router.post("/register/:userObj", async (req, res) => {}) route is used to register a new user by inserting the user object into the database, if the user does not already exist. The userRouter uses the bcrypt library to encrypt the user's password and store it securely in the database. It also uses the Pool class from the pg library to connect to the Heroku Postgres database and execute SQL queries to retrieve and update user information.

  

Overall, the userRouter provides the necessary functionality for creating and managing user accounts on the web platform, and ensures that user information is kept secure and private.

  

The ridesRouter is a router in the ExpressJS framework that handles requests related to rides on the web platform. It uses the router.get() and router.post() methods to define several routes that are used by the web application. The router.get("/getAllOfferedRides", (req, res) => {}) route is used to retrieve all the rides that are being offered on the platform. The router.get("/getAllRequestedRides", (req, res) => {}) route is used to retrieve all the rides that are being requested on the platform. The router.get("/getBookedRides/:userInfo", (req, res) => {}) route is used to retrieve all the rides that a user has booked. The router.get("/getOfferedRides/:userInfo", (req, res) => {}) route is used to retrieve all the rides that a user has created. The router.get("/messageData/:userInfo", (req, res) => {}) route is used to retrieve contact information for all the users that have booked a ride that was created by a particular user. The ridesRouter uses the Pool class from the pg library to connect to the Heroku Postgres database and execute SQL queries to retrieve and update ride information.

  

Overall, the ridesRouter provides the necessary functionality for creating and managing rides on the web platform, and allows users to book and view rides on the platform.

  

One of the key challenges we faced in developing our web platform was maintaining user sessions and rendering relevant data for each individual user. To solve this problem, our team implemented a system for sharing user information along with each server call.

  

Whenever the user makes a request to the server (such as when they load a page or submit a form), their user information is included in the URL of the server call. This allows the server to identify the user and access their information, allowing it to generate the appropriate response.

For example, when a user loads the "Your Profile Page," the server receives the request with the user's information in the URL. It then retrieves the user's information and uses it to render the page with the relevant user data (such as their name and date of birth). Similarly, when a user submits a form to book a ride, the server receives the request with the user's information in the URL and uses it to create a new ride object and store it in the user's account.

  

In this way, our web platform uses URL routes and mappings to separate the logic for handling user and ride objects, and maintain user sessions and render relevant data for each user. This allows us to keep our code organized and maintainable, while still providing a seamless and personalized user experience on the web application.

## Authentication/Authorization

One of the key features of our web platform is the ability for users to create accounts and log in securely. In order to achieve this, our team made use of the bcrypt library, which is a popular open-source password hashing tool.

  

When a user creates an account on our platform, their password is sent to the server, where it is encrypted using bcrypt. This encrypted password, known as a "hash," is then stored in our database. This ensures that even if someone were to gain access to our database, they would not be able to easily retrieve users' passwords.

  

When a user attempts to log in to our platform, their password guess is sent to the server along with their username. The server then retrieves the hashed password for that user from the database and uses bcrypt to compare the two. If the password guess matches the hashed password, the user is granted access to the platform.

  

In this way, bcrypt has been an invaluable tool for our team, helping us to ensure that our users' accounts are secure and their passwords are protected. By using bcrypt for both password hashing and validation, we are able to provide our users with a safe and secure experience on our platform.

  

In addition to using bcrypt , our team also implemented a system for controlling access to different user interface (UI) views on our platform. This system allows us to provide each user with personalized content and information, while still allowing all users to access the same UI views.

For example, when a user logs in to our platform, they are presented with all the pages. These pages are the same for all users, but the information displayed on some pages are specific to each individual user:

The "Your Profile Page" shows the user's name, and contact information, while the "Your Rides Page" might show a list of past and upcoming rides that the user has booked.

This approach allows us to provide a consistent and intuitive UI experience for all users, while still providing personalized information that is relevant to each individual user. By using this system, we are able to deliver a user-friendly and personalized experience on our platform.

  

## Division of Labor

**Kabir Israni**
    

1.  Find Riders Interface (HTML)
    
2.  Find Drivers Interface (HTML)
    
3.  Overall CSS Design and Guidelines
    
4.  Final Routers Programming and Architecture Implementation
    
5.  Final Users routers URL Implementation
    
6.  Final Users router API Implementation
    
7.  Heruko Server and Procfile Implementation
    
8.  Milestone 2 Final Project API Planning & Documentation
    
9.  Milestone 3 Post functions for Reserve a seat functionality
    
10.  Milestone 3 User Session Tracking
    
11.  Milestone 3 URL routing
    
12.  Milestone 3 Client Side data storage
    
13.  User Details Encryption
    
14.  Log In Hash Comparison
    
15.  Filtering Riders and Drivers Implementation
    
16.  Final Project MD Planning
    
17.  Final Project Rubric Criteria 3
    

**Krish Malhotra**
    

1.  Your Rides Interface(HTML)
    
2.  Messages Interface(HTML)
    
3.  Javascript for Signup Page
    
4.  Javascript for Your Rides Page
    
5.  Javascript for Messages Page
    
6.  Server setup for Milestone 2 dummy data
    
7.  Initial Project API Documentation
    
8.  Backend server logic with dummy data
    
9.  Final API documentation
    
10.  Final Rides router URL Implementation
    
11.  Final Rides router API Implementation
    
12.  Get functionality for rendering each page
    
13.  Internally Linking buttons to each page
    
14.  Final Post functions for reserve a seat functionality
    
15.  Final Post functions for create a ride functionality
    
16.  Final Post functions for request a ride functionality
    
17.  Final Project Rubric Criteria 2
    
18.  Final Project Video Demonstration
    

Maahi Goel
    

1. UI Wireframe design
2. Login Page Interface
3. Sign Up Interface
4. User Profile Interface
5. Postgres Heroku Setup
6. Milestone 2 Hashing and Encrypting
7. Milestone 2 Password Comparison 
8. Database linking
9. Database calls for Request a ride functionality
10. Database calls for Reserve a ride functionality 
11. Database calls for Change password functionality
12. Database calls for Populating all pages 

13.  Milestone 1 MD file

14.  Milestone 2 MD file
15.  Final Project Rubric CriteriaFinal MD file

    

  

## Conclusion

Our team has had a rewarding experience working on this college software development project. Through the design and implementation process, we learned a lot about software development methodologies, project management, and team collaboration.

  

One of the biggest challenges we faced was ensuring that all team members were on the same page and working towards the same goal. To overcome this, we implemented regular meetings, clear communication channels, and established a set of team rules to guide our work.

  

Another difficulty we encountered was technical in nature. Our team had to learn a new programming framework in order to complete the project, which required a significant amount of time and effort. However, this turned out to be a valuable learning experience and we are now more confident in our abilities as software developers.

  

If we could do it all over again, there are a few things we would have liked to know before starting the project. First, we would have spent more time planning and organizing the project before diving into the implementation phase. This would have helped us avoid some of the pitfalls and roadblocks that we encountered along the way. Second, we would have liked to reach out to our TA’s more often than we did.

  

In addition to the challenges mentioned above, our team also had to navigate some complex technical hurdles. One of the most difficult was the decision to rewrite our server files to include routers, which required a significant amount of effort and coordination. However, with the help of our teaching assistants and their expertise, we were able to overcome this challenge and successfully implement the changes.

  

Another challenge we faced was the decision to choose a simplistic look for the user interface of our software. This was a controversial choice within our team, but in the end, we decided to go with a minimalist design in order to prioritize ease of use and functionality. This turned out to be a good decision, as the resulting software was intuitive and easy for users to navigate.

  

Overall, our team has learned a lot through the design and implementation process of this project. We have grown as software developers, and we are grateful for the guidance and support of our teaching assistants, who were instrumental in helping us overcome the challenges we faced.