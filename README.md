# ampersand-battery-swap

This is a small app that provides APIs for swapping motocycle(electric) batteries and determine the energy used and distance covered.

Click [here](https://ampersand-battery-swap.herokuapp.com) for live documentation(swagger).

## Getting started

The instructions below will guide you in setting up a local instance of this app 

## Prerequisites

- `NodeJs`
- `Yarn/NPM`
- `Postgres`
- `Git`

## SETUP
- First clone the repo to you machine:
```
git clone https://github.com/Emile-Nsengimana/ampersand-battery-swap.git
```
Open it using your favorite IDE
I recommend [vs code](https://code.visualstudio.com/download)

- Install all necessary node modules
```
yarn install
```
- Create a database

`createdb ampersand` or `use pgadmin to create a database named "ampersand"`
- Run migration
```
yarn create-db
```

- Start the app
```
yarn start
```
- Please refer to `.env.example` to setup your `.env` variables
