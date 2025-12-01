"use strict";

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
  userName: "MT", // Note : It may be changed later, and can be done dynamically
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
  userName: "SM",
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
  userName: "OB",
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3];

// Working on Mobile Navigation
// Selector
const openEl = document.querySelector(".open--icon");
const closeEl = document.querySelector(".close--icon");
const logInFormEl = document.querySelector(".login--form");

openEl.addEventListener("click", function () {
  logInFormEl.classList.add("mobile--login-form");
  openEl.classList.add("hidden");
  closeEl.classList.remove("hidden");
});

closeEl.addEventListener("click", function () {
  logInFormEl.classList.remove("mobile--login-form");
  openEl.classList.remove("hidden");
  closeEl.classList.add("hidden");
});

// Handling Login
// Selectors
const loginUserNameEl = document.getElementById("login--user-name");
const loginUserPinEl = document.getElementById("login--user-pin");
const loginBtnEl = document.querySelector(".login--btn");
const appEl = document.querySelector(".app");
const userNameEl = document.querySelector(".user--name");
const balanceEl = document.querySelector(".balance");

let currentUser;
loginBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  accounts.find((acc) => {
    if (
      acc.userName === loginUserNameEl.value &&
      acc.pin === +loginUserPinEl.value
    ) {
      currentUser = acc;
      appEl.classList.remove("hidden");
      userNameEl.textContent = currentUser.owner;
      balanceEl.textContent = displayBalance(currentUser);
    }
  });
  loginUserNameEl.value = "";
  loginUserPinEl.value = "";
  loginUserNameEl.blur();
  loginUserPinEl.blur();
});

// Calculate Balance
const displayBalance = (acc) => {
  const {
    movementsInfo: { movements },
  } = acc;
  const totalBalance = movements.reduce((mov, accum) => accum + mov, 0);
  return totalBalance;
};
