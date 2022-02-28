## WishUp 
### Overview
- This project is about creating the primary REST service for a **Subscription as a Service** startup. My REST service will be used by companies that will define subscriptions plans to which the users of the platform can subscribe to.
- This assignment consists of 4 APIs :
  - 2 for User registration and fetch user details.
  - 2 for subscriptions - Purchase subscription and fetch by user_name.
- Created a branch named `Assignment/WishUp` and followed proper naming convention in order to convey my work efficiently.
## Models
- User Model
```JavaScript
{
    userName : {type: String, required: true, unique: true},
    
}
```
- Subscription Model
```JavaScript
{
    user_name : {type: String, required: true, unique: true},
    planId : {type: String, required: true},
    startDate : {type: String}
}
```
## API Services
### PUT /user/:user_name
- Create a user with specified username in the database.
- **Sample input**
  - _PUT /user/tushar_
- **Required Output**
  - Just a HTTP status code of 200 on success/ 201 for successful creation or any other appropriate code for failures.
### GET /user/:user_name
- Fetch the user document from the database by the user_name.
- **Sample input**
  - _GET /user/tushar_
- **Sample Output**
```JavScript
{
    userName : "Nikhil Patil",
    createdAt : "2022-02-28 20:30:05"
}
```
### POST /subscription
- This is the primary API being tested in this assignment.
- Register a new subscription for an existing user, with a specified plan and start date.
- **Sample Input**
    ```yaml
    {
        userName : "Nikhil Patil",
        planId : "PRO_1M",
        startDate : "2022-02-28"
    }
    ```
- **Expected Output**
    ```yaml
    {
        status : "Success",
        amount : "100.0"
    }
    ```
- On success, return 200 HTTP status code. For failures, pick an appropriate status code for it.
- The timestamps indicates the start dtae for the new plan, and it will be valid for the number of days shown in th etable below.
- plan_id can be one of those listed in the table below : 
**Plan ID** | **Validity (in days)** | **Cost (USD)**
| :--- | ---: | :---:
FREE | infinite | 0.0
TRIAL  | 7 |0.0
LITE_1M | 30 | 100.0
PRO_1M  | 30| 200.0
LITE_6M  | 180 | 500.0
PRO_6M  | 180 | 900.0
### GET /subscription/:user_name/:start_date
- When input date is specified.
    - plan_id that will be active for user at specified date.
    - Number of days left in plan from the specified input date.
- __Sample Output__
    ```JavaScript
    {
        planId : "PRO_1M",
        daysLeft : 3
    }
    ```
- When input date is NOT specified.
    - List all subscription entrie available in database for user with start and valid till dates.
- __Sample Output__
    ```JavaScript
    {
        planId : "TRIAL",
        startDate : "2022-02-27",
        validTill : "2022-03-27"
    },
    {
       planId : "PRO_1M",
        startDate : "2022-02-27",
        validTill : "2022-03-05"
    }
    ```