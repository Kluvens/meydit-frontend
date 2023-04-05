# meydit-frontend

## Tech stack
- TypeScript
- React
- Axios library to connect to the Rest APIs
- TODO: use sqlite as database
- create lucid data models
- use validators

## Two types
- consumer
  - As a Consumer, I want to go to a page, post a job and get notified with the quotes
    - first name
    - last name
    - phone number
    - email address
    - address (including postcode and state)
    - types of clothing
    - serveral images
    - description
    - budget (optional)
- maker
  - as a maker, i want to list all the available jobs, filter jobs by location and types of clothing, see the total count of quotations for jobs and send a quote
    - list all jobs
    - select a specific job and see all the details the customer provides
    - the maker must be able to send a quotation, including a price and any other comment, notify the customer by email
    
## Assumptions
- the service only provides to Australians, which means the phone number and address should stick with Australian format
