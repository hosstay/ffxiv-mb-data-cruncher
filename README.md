# FFXIV Market Board Data Cruncher

For collecting historical information and crunching data for my ffxiv market board excel spreadsheet.

## Getting Started

### Prerequisites

Have Node installed

I've included the node modules in the repo for simplicities sake. 

### Database

Table 'ffxiv_mb_data_dump'

column_name             column_default                data_type              character_maximum_length

'id'          'nextval('users_id_seq'::regclass)'	   'integer'	                   null

'item_name'                   null                 'character varying'	               200

'type'	                      null                 'character varying'	               200

'initial_cost'	              null                 'character varying'	               200

'gross'	                      null                 'character varying'	               200

'date'	                      null             'timestamp without timezone'	           null

### Installing

* Install Node
* Clone the repository
* Have Aurelia installed globally (npm install aurelia-cli -g)
* Have Nodemon install globally if you're going to use it (npm install nodemon -g)

## Running the tests

TODO: Make test code

TODO: Explain how to run the automated tests

### Break down of tests

TODO: Explain what these tests test and why

## Deployment

Start Backend: 'node server' or 'nodemon --inspect server' if you have nodemon installed and want dedicated devtools.

Start Frontend: 'npm start' or 'au run --watch' if you have aurelia cli installed and want it to watch for changes.

Webpage runs at localhost:8080, backend listens on :3000

## Built With

* [Aurelia](https://aurelia.io/home) - Frontend framework
* [Node](https://nodejs.org/en/download/) - Backend framework
* [NPM](https://www.npmjs.com/) - Dependency Management

## Authors

* **Taylor Hoss** - [hosstay](https://github.com/hosstay)
