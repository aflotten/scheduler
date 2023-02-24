# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## About Interview Scheduler

Interview scheduler is a react application capable of tracking interviews and openings from a seperate server. A user can create an interview in an open slot, where they will provide their name and select an available interviewer. After a user saves this interview, the user can then edit or delete the interview. All of these actions are dependent on axios put and delete requests to an API containing the interview data. 

## Here is how it looks