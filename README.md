# HomeOwners

## Goal
Read in a csv with Homeowners names, then parse the names into :
- title - required
- first_name - optional
- initial - optional
- last_name - required

Splitting people out when there are two people in the name( Mr John Doe and Miss Sarah Green).

## Assumptions made

- There will only ever be two people in the name at this point
- File size will be small enough to be effectively read in/sent via post
- Titles used: ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Drs','Prof','Mister'] 
- Conjunctions used: ['and', '&','AND']


## SETUP

1. Download the files
2. Run npm install
3. Send csv to http://localhost:3000/fileUpload via POST (in Postman or equivalent ) OR go to http://localhost:3000/fileUpload/example to load in example csv

## Areas of Improvement

### IF csv file gets too large
The code could be implemented in a Lambda to take the stress of parsing the data off this system.
Exactly how depends on how the csv is obtained. 
* You could read the cvs and then start an aws SQS queue which triggers a lambda to parse the csv line by line then input them into a db (either in aws or via an API endpoint).
* OR have the csv be uploaded to s4 and then processed by a Lamdba and then input them into a db (either in aws or via an API endpoint).

### Allow multiple people in one Name
Extend the code so Mr & Mr & Ms Smith would work.

### More Titles
Enter a more extensive list of titles to be parsed. 

### Data Quality checks
add checks to flag any results that seem odd. very short or long character counts, symbols in names, etc

### OOP
As the person json grows it can be refactored into an object to make handling and readability easier