# ADES

Lets start with assignment 1:

in assignment 1 you will be doing the CRUD for your app

it would be graded based on individual functions that you have made


**You will be assessed based on the following (10% each)**

1. ## Creating entities
    - Using INSERT command
2. ## Retrieving entities
    - Using GET command
3. ## Updating entities
    - Using UPDATE command
4. ## Delete entities
    - Using DELETE command
5. ## Building proof of concept
    - Mainly referring to the html file that you made to utilize the endpoints
6. ## Concurrent requests
    - Using Promise.all
        - learnt from the practical 
7. ## Sequential requests
    - Using .then(output){code the uses the output} 
    - for e.g.
```
module.exports.getAllHighscore = function (userid) {
  return pool
    .query("SELECT userid , gameid , highscore, score FROM record WHERE userid = ?", [userid])
    .then((result) => {
      if (result.length === 0) {
        throw new NotFoundError(`User ${userid} not found`);
      }
      return result;
    });
};

```

- In the example above the .query() sends the sql query to the database and when the result is send out.

- the result is sent to the next .then(result) where the .then receives the data as a result parameter 

- And this would continue to flow as long as there is a another .then()

- where it would receive returned data as the parameter that in set in the .then bracket   


8. ## State management
    - basically ChatGPT said that this is like having all your attributes declared 
properly with global attributes and local attributes allowing for good code management 
9. ## Data manipulation
    - Modifying, organizing, and transforming data for analysis through filtering, sorting, aggregation, joining, transformation, updating, inserting, and deleting operations.

    - basically sql query but do more with it not just GET maybe do something like get maximum of a score or price 

10. ## Code & Report Quality
    - jus make sure your code is readable and understandable. 

    - tip when doing your commits to github make sure you make your description as descriptive as possible as you might need to find a certain commit for your report 


### *P.S* Note that the css is not important in assignment 1

