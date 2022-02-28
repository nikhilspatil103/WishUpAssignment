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
    user_name : {type: String, required: Name is mandatory, trim: true, unique: true},
    created_at : {type: Date}
}
```
- Subscription Model
```JavaScript
{
    user_name : {type: String, required: Name is mandatory, trim: true, unique: true},
    plan_id : {type: String, required: Subscription plan is mandatory, trim: true},
    start_date : {type: String}
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
    user_name : "Tushar Saini",
    created_at : "2022-02-28 20:30:05"
}
```
### POST /subscription
- This is the primary API being tested in this assignment.
- Register a new subscription for an existing user, with a specified plan and start date.
- **Sample Input**
    ```yaml
    {
        user_name : "Tushar Saini",
        plan_id : "PRO_1M",
        start_date : "2022-02-28"
    }
    ```
- **Expected Output**
    ```yaml
    {
        status : "Success",
        amount : "-200.0"
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
        plan_id : "PRO_1M",
        days_left : 3
    }
    ```
- When input date is NOT specified.
    - List all subscription entrie available in database for user with start and valid till dates.
- __Sample Output__
    ```JavaScript
    {
        plan_id : "TRIAL",
        start_date : "2022-02-27",
        valid_till : "2022-03-27"
    },
    {
       plan_id : "PRO_1M",
        start_date : "2022-02-27",
        valid_till : "2022-03-05"
    }
    ```