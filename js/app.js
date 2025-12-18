"use strict";

// Fake Data
// Agent account
const account1 = {
  owner: "Michael Thompson",
  pin: 3333,
  agentId: "LM-6798", // This user is an agent
  movementsInfo: {
    movements: [1200, 340, 1500, 700],
    movementsDates: [
      "2025-11-15T10:12:45.000Z",
      "2025-11-14T09:30:00.000Z",
      "2025-11-13T15:45:00.000Z",
      "2025-10-20T10:30:00.000Z",
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
const sectionTransactionEl = document.querySelector(".section--transactions");
const warningMsgEl = document.querySelector(".warning--msg");

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
      displayTransactions(currentUser);
      actionMsgEl.classList.add("hidden");
      warningMsgEl.classList.add("hidden");
      logInFormEl.classList.remove("mobile--login-form");
      openEl.classList.remove("hidden");
      closeEl.classList.add("hidden");
    }
  });
  const checkUserName = accounts.some(
    (acc) => acc.userName === loginUserNameEl.value
  );

  if (!checkUserName) {
    loginUserNameEl.classList.add("error");
    setTimeout(function () {
      loginUserNameEl.classList.remove("error");
    }, 2000);
  }
  const checkUserPin = accounts.some(
    (acc) => acc.pin === +loginUserPinEl.value
  );

  if (!checkUserPin) {
    loginUserPinEl.classList.add("error");
    setTimeout(function () {
      loginUserPinEl.classList.remove("error");
    }, 2000);
  }
  if (!currentUser) {
    // Warning Message
    warningMsgEl.textContent = "Wrong Information";
    warningMsgEl.style.backgroundColor = "red";
    warningMsgEl.style.bottom = "25vh";
    warningMsgEl.style.right = "50vw";
    loginUserNameEl.addEventListener("click", function () {
      warningMsgEl.textContent = "Login to get started";
      warningMsgEl.style.backgroundColor = "#000";
      warningMsgEl.style.right = "0vw";
    });
  }
  // Selector
  const sectionCashoutEl = document.querySelector(".section--cashout");

  if (currentUser === account1) {
    sectionCashoutEl.classList.add("hidden");
  }
  if (currentUser !== account1) {
    sectionCashoutEl.classList.remove("hidden");
  }
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

// Showing Transactions
const displayTransactions = (acc, sort = false) => {
  sectionTransactionEl.innerHTML = "";
  const {
    movementsInfo: { movements },
    movementsInfo: { movementsDates },
  } = acc;
  console.log(movements);
  console.log(movementsDates);
  const combinedMovDate = movements.map((mov, i) => ({
    movement: mov,
    movementDate: movementsDates[i],
  }));
  const mov = sort
    ? combinedMovDate.sort((a, b) => a.movement - b.movement)
    : combinedMovDate;
  mov.forEach((obj) => {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? "IN" : "OUT";
    const typeAttr = movement > 0 ? "in" : "out";
    const newDate = new Date(movementDate);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const html = `<div class="transaction">
          <span class="transaction--type transaction--${typeAttr}">${type}</span>
          <span class="transaction--date">${day}/${month}/${year}</span>
          <span class="transaction--amount">${movement}</span>
        </div>`;
    sectionTransactionEl.insertAdjacentHTML("afterbegin", html);
  });
};

// Handling Cashout
// Selector
const agentIdEl = document.getElementById("agent--id");
const cashOutPinEl = document.getElementById("cashout--pin");
const cashOutAmountEl = document.getElementById("cashout--amount");
const cashOutBtnEl = document.querySelector(".cashout--btn");
const actionMsgEl = document.querySelector(".action--msg");
const actionTypeEl = document.querySelector(".action--type");
const actionMoneyEl = document.querySelector(".action--money");

// Agent Account
const agentAccount = account1;

cashOutBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  const {
    movementsInfo: { movements },
    movementsInfo: { movementsDates },
  } = currentUser;
  const {
    movementsInfo: { movements: agentMovements },
    movementsInfo: { movementsDates: agentMovementsDates },
  } = agentAccount;
  const currentBalance = displayBalance(currentUser);
  const currentDate = new Date().toISOString();
  if (
    agentIdEl.value === agentAccount.agentId &&
    +cashOutPinEl.value === currentUser.pin &&
    +cashOutAmountEl.value <= currentBalance
  ) {
    movements.push(+-cashOutAmountEl.value);
    movementsDates.push(currentDate);
    agentMovements.push(+cashOutAmountEl.value);
    agentMovementsDates.push(currentDate);
    balanceEl.textContent = displayBalance(currentUser);
    displayTransactions(currentUser);
    actionMsgEl.classList.remove("hidden");
    actionTypeEl.textContent = "Cashout";
    actionMoneyEl.textContent = cashOutAmountEl.value;
  }
  if (agentIdEl.value !== agentAccount.agentId) {
    agentIdEl.classList.add("error");
    setTimeout(function () {
      agentIdEl.classList.remove("error");
    }, 2000);
  }
  if (+cashOutAmountEl.value > currentBalance) {
    cashOutAmountEl.classList.add("error");
    setTimeout(function () {
      cashOutAmountEl.classList.remove("error");
    }, 2000);
  }
  if (+cashOutPinEl.value !== currentUser.pin) {
    cashOutPinEl.classList.add("error");
    setTimeout(function () {
      cashOutPinEl.classList.remove("error");
    }, 2000);
  }

  agentIdEl.value = "";
  agentIdEl.blur();
  cashOutAmountEl.value = "";
  cashOutAmountEl.blur();
  cashOutPinEl.value = "";
  cashOutPinEl.blur();
});

// Handling Cashin
// Selector
const cashinUserNameEl = document.getElementById("cashin--username");
const cashinAmountEl = document.getElementById("cashin--amount");
const cashinUserPinEl = document.getElementById("cashin--userpin");
const cashinBtnEl = document.querySelector(".cashin--btn");

cashinBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  const {
    movementsInfo: { movements },
    movementsInfo: { movementsDates },
  } = currentUser;
  const currentDate = new Date().toISOString();
  if (
    cashinUserNameEl.value === currentUser.userName &&
    +cashinAmountEl.value > 0 &&
    +cashinUserPinEl.value === currentUser.pin
  ) {
    movements.push(+cashinAmountEl.value);
    movementsDates.push(currentDate);
    balanceEl.textContent = displayBalance(currentUser);
    displayTransactions(currentUser);
    actionMsgEl.classList.remove("hidden");
    actionTypeEl.textContent = "Cashin";
    actionMoneyEl.textContent = cashinAmountEl.value;
  }
  if (cashinUserNameEl.value !== currentUser.userName) {
    cashinUserNameEl.classList.add("error");
    setTimeout(function () {
      cashinUserNameEl.classList.remove("error");
    }, 2000);
  }
  if (cashinAmountEl.value <= 0) {
    cashinAmountEl.classList.add("error");
    setTimeout(function () {
      cashinAmountEl.classList.remove("error");
    }, 2000);
  }
  if (+cashinUserPinEl.value !== currentUser.pin) {
    cashinUserPinEl.classList.add("error");
    setTimeout(function () {
      cashinUserPinEl.classList.remove("error");
    }, 2000);
  }
  cashinAmountEl.value = "";
  cashinAmountEl.blur();
  cashinUserPinEl.value = "";
  cashinUserPinEl.blur();
  cashinUserNameEl.value = "";
  cashinUserNameEl.blur();
});

// Handling Send Money
// Selector
const sendMoneyUserNameEl = document.getElementById("sendmoney--username");
const sendMoneyAmountEl = document.getElementById("sendmoney--amount");
const sendMoneyUserPinEl = document.getElementById("sendmoney--userpin");
const sendMoneyBtnEl = document.querySelector(".sendmoney--btn");

sendMoneyBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  const reciverAcc = accounts.find(
    (acc) => acc.userName === sendMoneyUserNameEl.value
  );
  const {
    movementsInfo: { movements },
    movementsInfo: { movementsDates },
  } = currentUser;

  const currentBalance = displayBalance(currentUser);
  const currentDate = new Date().toISOString();

  if (
    reciverAcc &&
    reciverAcc !== currentUser &&
    +sendMoneyAmountEl.value > 0 &&
    +sendMoneyAmountEl.value < currentBalance &&
    +sendMoneyUserPinEl.value === currentUser.pin
  ) {
    const {
      movementsInfo: { movements: reciverMovements },
      movementsInfo: { movementsDates: reciverMovementsDates },
    } = reciverAcc;
    movements.push(-+sendMoneyAmountEl.value);
    movementsDates.push(currentDate);
    reciverMovements.push(+sendMoneyAmountEl.value);
    reciverMovementsDates.push(currentDate);
    balanceEl.textContent = displayBalance(currentUser);
    displayTransactions(currentUser);
    actionMsgEl.classList.remove("hidden");
    actionTypeEl.textContent = "Send Money";
    actionMoneyEl.textContent = sendMoneyAmountEl.value;
  }
  if (!reciverAcc || reciverAcc === currentUser) {
    sendMoneyUserNameEl.classList.add("error");
    setTimeout(function () {
      sendMoneyUserNameEl.classList.remove("error");
    }, 2000);
  }
  if (
    +sendMoneyAmountEl.value <= 0 ||
    +sendMoneyAmountEl.value > currentBalance
  ) {
    sendMoneyAmountEl.classList.add("error");
    setTimeout(function () {
      sendMoneyAmountEl.classList.remove("error");
    }, 2000);
  }
  if (+sendMoneyUserPinEl.value !== currentUser.pin) {
    sendMoneyUserPinEl.classList.add("error");
    setTimeout(function () {
      sendMoneyUserPinEl.classList.remove("error");
    }, 2000);
  }
  sendMoneyAmountEl.value = "";
  sendMoneyAmountEl.blur();
  sendMoneyUserPinEl.value = "";
  sendMoneyUserPinEl.blur();
  sendMoneyUserNameEl.value = "";
  sendMoneyUserNameEl.blur();
});

// Sorting Transaction
// Selector
const sortTransactionBtnEl = document.querySelector(".sort--transaction");
let sorted = false;
sortTransactionBtnEl.addEventListener("click", function () {
  displayTransactions(currentUser, !sorted);
  sorted = !sorted;
});

// Todos
// 2. Rewatch timer lecture and implement it on the project
