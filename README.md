# rCash - online mobile banking

## Goal : Practice JavaScript knowledge by building a fictional mobile banking app.

## Technology : JavaScript, HTML, CSS, Git

## Fake Data
// Fake Data
// Agent account
const account1 = {
  owner: "Michael Thompson",
  pin: 3333,
  agentId: "AGT-1023", // This user is an agent
  movementsInfo: {
    movements: [1200, -200, 340, -500, 1500, -100, 700, -50],
    movementsDates: [
      "2025-11-15T10:12:45.000Z",
      "2025-11-14T09:30:00.000Z",
      "2025-11-13T15:45:00.000Z",
      "2025-10-20T10:30:00.000Z",
      "2025-09-15T12:00:00.000Z",
      "2025-08-05T14:20:00.000Z",
      "2025-07-22T09:45:00.000Z",
      "2025-06-10T16:15:00.000Z",
    ],
  },
  currency: "USD",
  locale: "en-US",
};

// Non-agent account
const account2 = {
  owner: "Sophia Martinez",
  pin: 1111,
  movementsInfo: {
    movements: [500, -50, 200, -100, 750, -20],
    movementsDates: [
      "2025-11-15T11:20:00.000Z", // Today
      "2025-11-14T14:10:00.000Z", // Yesterday
      "2025-11-10T16:45:00.000Z",
      "2025-09-10T11:30:00.000Z",
      "2025-08-22T14:10:00.000Z",
      "2025-07-18T09:05:00.000Z",
    ],
  },

  currency: "USD",
  locale: "en-US",
};

// Non-agent account
const account3 = {
  owner: "Olivia Brown",

  pin: 2222,
  movementsInfo: {
    movements: [300, -20, 100, -50, 400, -30],
    movementsDates: [
      "2025-11-14T08:15:00.000Z", // Yesterday
      "2025-11-13T12:30:00.000Z", // 2 days ago
      "2025-11-05T09:10:00.000Z",
      "2025-09-05T12:20:00.000Z",
      "2025-08-15T15:45:00.000Z",
      "2025-07-01T10:10:00.000Z",
    ],
  },

  currency: "USD",
  locale: "en-US",
};


### How the app works

- User can cash in
- User can cash out through an Agent
- User can send money to other users
- User can see his transactions and Balance
- After 10 minutes, if there are no activity user will automatically log out

#### Note : This is for practicing JavaScript, so no real life data will be used and all the things including login will be fake. Again This is just a practice project, so don't look for clean code, architecture, design pattern or any kinds of framework

#### I've already designed an initial flowchart and layout mockup for this application which has been included in the repository

#### About flowchart and repository :

- This is just for initial planning
- While working on this project, I may add or remove something

## Timeline
DD/MM/YY
- 28/10/2025 - I've created the repository, Started Designing Homepage - finished balance and cashout section
- 29/10/2025 - I've added a new section in homepage, I've decided just to go with cash out and send money section for now, not thinking about cash in
- 05/11/2025 - After long break, I'm back and finish the initial design of the application
- 11/11/2025 - Added login form and logout timer in the UI, do some html tweak
- 14/11/2025 - Redesign the login form + Make the app responsive, worked on mobile navigation (No JS yet)
- 15/11/2025 - Set the fake data for the application
