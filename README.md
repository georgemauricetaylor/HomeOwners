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
- Titles used:``` ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Drs','Prof','Mister'] ```
- Conjunctions used:``` ['and', '&','AND']```


## How to run

1. Download the files
2. Run ```npm install```
3. Run ```npm start```
4. Send csv to http://localhost:3000/fileUpload via POST (in Postman or equivalent ) OR go to http://localhost:3000/fileUpload/example to load in example csv

### Tests
To run the tests run
``` mocha test/**/*Test.js --reporter spec ```


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


## Example input/output

###Input
```
homeowner
Mr John Smith
Mrs Jane Smith
Mister John Doe
Mr Bob Lawblaw
Mr and Mrs Smith
Mr Craig Charles
Mr M Mackie
Mrs Jane McMaster
Mr Tom Staff and Mr John Doe
Dr P Gunn
Dr & Mrs Joe Bloggs
Ms Claire Robbo
Prof Alex Brogan
Mrs Faye Hughes-Eastwood
Mr F. Fredrickson
```

###Output
```
[{"title":"Mr","first_name":"John","initial":"","last_name":"Smith"},
{"title":"Mrs","first_name":"Jane","initial":"","last_name":"Smith"},
{"title":"Mister","first_name":"John","initial":"","last_name":"Doe"},
{"title":"Mr","first_name":"Bob","initial":"","last_name":"Lawblaw"},
{"title":"Mr","first_name":"","initial":"","last_name":"Smith"},
{"title":"Mrs","first_name":"","initial":"","last_name":"Smith"},
{"title":"Mr","first_name":"Craig","initial":"","last_name":"Charles"},
{"title":"Mr","first_name":"","initial":"M","last_name":"Mackie"},
{"title":"Mrs","first_name":"Jane","initial":"","last_name":"McMaster"},
{"title":"Mr","first_name":"Tom","initial":"","last_name":"Staff"},
{"title":"Mr","first_name":"John","initial":"","last_name":"Doe"},
{"title":"Dr","first_name":"","initial":"P","last_name":"Gunn"},
{"title":"Dr","first_name":"","initial":"","last_name":"Bloggs"},
{"title":"Mrs","first_name":"Joe","initial":"","last_name":"Bloggs"},
{"title":"Ms","first_name":"Claire","initial":"","last_name":"Robbo"},
{"title":"Prof","first_name":"Alex","initial":"","last_name":"Brogan"},
{"title":"Mrs","first_name":"Faye","initial":"","last_name":"Hughes-Eastwood"},
{"title":"Mr","first_name":"","initial":"F.","last_name":"Fredrickson"}]
```