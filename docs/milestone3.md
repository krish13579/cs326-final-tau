
# Database: 

## Rides Tables
<img width="714" alt="Screen Shot 2022-11-20 at 9 33 29 PM" src="https://user-images.githubusercontent.com/67108579/202950945-0d850533-9426-4e1c-9b7a-0aabaa7ea76a.png">

rideid - unique id for each ride. 

userID - user who either created the request or the ride.  

type - indicating whether the ride is offered or requested. 

origin - starting place of ride. 

destination - destination of ride.  

date - date of ride. 

price - price offered or requested. 

seats - number of seats available or requested. 

bookedriders - array with usernames who have reserved a seat. 



## Users Tables
<img width="484" alt="Screen Shot 2022-11-20 at 9 33 09 PM" src="https://user-images.githubusercontent.com/67108579/202950988-4c23d250-6a3a-441a-b995-20b1ecd511dc.png">

fname - user first name 

lname - user last name  

bdate - birthday of user 

email - email address (userID)  

password - password (hashed for security)  



# Division of Labor: 

### Maahi Goel: 
- Database Implementation
- User Information Hashing
- User Authentication
- API calls for sign up page
- MD file compilation and release

### Kabir Israni:
- Post functions for Reserve a seat functionality
- User Session Tracking
- URL routing
- Client Side data storage

### Krish Malhotra:
- API calls for other pages
