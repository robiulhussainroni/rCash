"use strict";

// Agent account
const account1 = {
  owner: "Michael Thompson",
  pin: 3333,
  agentId: "LM-6798",
  movementsInfo: {
    movements: [1200, 340, 1500, 700],
    movementsDates: [
      "2025-11-15T10:12:45.000Z",
      "2025-12-13T12:20:00.000Z",
      "2025-12-18T15:45:00.000Z",
      "2025-12-19T12:41:35.766Z",
    ],
  },
  userName: "MT",
  currency: "USD",
  locale: "en-US",
};

// Non-agent accounts
const account2 = {
  owner: "Sophia Martinez",
  pin: 1111,
  movementsInfo: {
    movements: [500, -50, 200, -100, 750, -20],
    movementsDates: [
      "2025-11-15T11:20:00.000Z",
      "2025-11-14T14:10:00.000Z",
      "2025-11-10T16:45:00.000Z",
      "2025-12-13T12:20:00.000Z",
      "2025-12-18T15:45:00.000Z",
      "2025-12-19T12:41:35.766Z",
    ],
  },
  userName: "SM",
  currency: "EUR",
  locale: "de-DE",
};

const account3 = {
  owner: "Olivia Brown",
  pin: 2222,
  movementsInfo: {
    movements: [300, -20, 100, -50, 400, -30],
    movementsDates: [
      "2025-11-14T08:15:00.000Z",
      "2025-11-13T12:30:00.000Z",
      "2025-11-05T09:10:00.000Z",
      "2025-12-13T12:20:00.000Z",
      "2025-12-18T15:45:00.000Z",
      "2025-12-19T12:41:35.766Z",
    ],
  },
  userName: "OB",
  currency: "BDT",
  locale: "bn-BD",
};

const accounts = [account1, account2, account3];

// Selectors
const openEl = document.querySelector(".open--icon");
const closeEl = document.querySelector(".close--icon");
const logInFormEl = document.querySelector(".login--form");
const loginUserNameEl = document.getElementById("login--user-name");
const loginUserPinEl = document.getElementById("login--user-pin");
const loginBtnEl = document.querySelector(".login--btn");
const appEl = document.querySelector(".app");
const userNameEl = document.querySelector(".user--name");
const balanceEl = document.querySelector(".balance");
const sectionTransactionEl = document.querySelector(".section--transactions");
const warningMsgEl = document.querySelector(".warning--msg");
const sectionCashoutEl = document.querySelector(".section--cashout");
const agentIdEl = document.getElementById("agent--id");
const cashOutPinEl = document.getElementById("cashout--pin");
const cashOutAmountEl = document.getElementById("cashout--amount");
const cashOutBtnEl = document.querySelector(".cashout--btn");
const actionMsgEl = document.querySelector(".action--msg");
const actionTypeEl = document.querySelector(".action--type");
const actionMoneyEl = document.querySelector(".action--money");
const cashinUserNameEl = document.getElementById("cashin--username");
const cashinAmountEl = document.getElementById("cashin--amount");
const cashinUserPinEl = document.getElementById("cashin--userpin");
const cashinBtnEl = document.querySelector(".cashin--btn");
const sendMoneyUserNameEl = document.getElementById("sendmoney--username");
const sendMoneyAmountEl = document.getElementById("sendmoney--amount");
const sendMoneyUserPinEl = document.getElementById("sendmoney--userpin");
const sendMoneyBtnEl = document.querySelector(".sendmoney--btn");
const sortTransactionBtnEl = document.querySelector(".sort--transaction");
const timerEl = document.querySelector(".timer");

// Global Variables
let currentUser, timerLogOut, currentBalance, currentDate;
const agentAccount = account1;

// Global Helping Functions
// ******* Variables For Action Types ******* //
const variablesForActions = function () {
  currentBalance = displayBalance(currentUser);
  currentDate = new Date().toISOString();
};

// ******* Displaying Total Balance ******* //
const displayBalance = (acc) => {
  const {
    movementsInfo: { movements },
  } = acc;
  const totalBalance = movements.reduce((mov, accum) => accum + mov, 0);
  return totalBalance;
};

// ******* Update Ui after actions ******* //
const updateBalanceTransactions = function () {
  const showBalance = displayBalance(currentUser);
  balanceEl.textContent = Intl.NumberFormat(currentUser.locale, {
    style: "currency",
    currency: currentUser.currency,
  }).format(showBalance);
  displayTransactions(currentUser);
};

// ******* Formatting Date ******* //
const formatDateFn = function (date) {
  const daysPassed = Math.trunc(
    (new Date() - new Date(date)) / 1000 / 60 / 60 / 24
  );

  if (daysPassed === 0) return "Today";
  else if (daysPassed === 1) return "Yesterday";
  else if (daysPassed <= 7) return `${daysPassed} days ago`;
  else if (daysPassed > 7)
    return Intl.DateTimeFormat(currentUser.locale).format(new Date(date));
};

// ******* Displaying Transactions ******* //
const displayTransactions = (acc, sort = false) => {
  sectionTransactionEl.innerHTML = "";

  const {
    movementsInfo: { movements },
    movementsInfo: { movementsDates },
  } = acc;

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
    const formatDate = formatDateFn(movementDate);

    const formatMovement = Intl.NumberFormat(acc.locale, {
      style: "currency",
      currency: acc.currency,
    }).format(movement);

    const html = `<div class="transaction">
          <span class="transaction--type transaction--${typeAttr}">${type}</span>
          <span class="transaction--date">${formatDate}</span>
          <span class="transaction--amount">${formatMovement}</span>
        </div>`;

    sectionTransactionEl.insertAdjacentHTML("afterbegin", html);
  });
};

// ******* Sorting Transactions ******* //
let sorted = false;
// Event Handler
const sortingHandler = function () {
  displayTransactions(currentUser, !sorted);
  sorted = !sorted;
};
// Event Listener
sortTransactionBtnEl.addEventListener("click", sortingHandler);

// ******* Logout Timer ******* //
const logOutTimer = function () {
  let time = 120;

  const tick = function () {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(time % 60).padStart(2, 0);
    timerEl.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      warningMsgEl.classList.remove("hidden");
      appEl.classList.add("hidden");
    }
    time--;
  };

  tick();

  const timer = setInterval(tick, 1000);

  return timer;
};

// ******* Handling Mobile Navigation ******* //
// Event Handlers
const openNavHandler = function () {
  logInFormEl.classList.add("mobile--login-form");
  openEl.classList.add("hidden");
  closeEl.classList.remove("hidden");
};

const closeNavHandler = function () {
  logInFormEl.classList.remove("mobile--login-form");
  openEl.classList.remove("hidden");
  closeEl.classList.add("hidden");
};

// Event Listeners
openEl.addEventListener("click", openNavHandler);
closeEl.addEventListener("click", closeNavHandler);

// ******* Handling Login ******* //
// Helping Functions
const gettingCurrentUser = function () {
  accounts.find((acc) => {
    if (
      acc.userName === loginUserNameEl.value &&
      acc.pin === +loginUserPinEl.value
    ) {
      currentUser = acc;
      appEl.classList.remove("hidden");
      userNameEl.textContent = currentUser.owner;

      updateBalanceTransactions();

      actionMsgEl.classList.add("hidden");
      warningMsgEl.classList.add("hidden");
      logInFormEl.classList.remove("mobile--login-form");
      openEl.classList.remove("hidden");
      closeEl.classList.add("hidden");

      // Clearing logout timer
      if (timerLogOut) clearInterval(timerLogOut);
      timerLogOut = logOutTimer();
    }
  });
};

const settingActionDetails = function () {
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
};

// Event Handlers
const loginHandler = function (e) {
  e.preventDefault();

  gettingCurrentUser();

  settingActionDetails();

  sorted = false;

  // Checking if the current user is agent
  if (currentUser === account1) {
    sectionCashoutEl.classList.add("hidden");
  }
  if (currentUser !== account1) {
    sectionCashoutEl.classList.remove("hidden");
  }

  // Removing value from input
  loginUserNameEl.value = "";
  loginUserPinEl.value = "";
  loginUserNameEl.blur();
  loginUserPinEl.blur();
};

// Event Listeners
loginBtnEl.addEventListener("click", loginHandler);

// ******* Handling Cashout ******* //
// Helping Functions
// ******* Displaying Error Cashout ******* //
const displayingCashOutError = function () {
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
};

// Event Handlers
const cashOutHandler = function (e) {
  e.preventDefault();

  variablesForActions();

  const {
    movementsInfo: { movements },
    movementsInfo: { movementsDates },
  } = currentUser;
  const {
    movementsInfo: { movements: agentMovements },
    movementsInfo: { movementsDates: agentMovementsDates },
  } = agentAccount;

  if (
    agentIdEl.value === agentAccount.agentId &&
    +cashOutPinEl.value === currentUser.pin &&
    +cashOutAmountEl.value <= currentBalance
  ) {
    movements.push(+-cashOutAmountEl.value);
    movementsDates.push(currentDate);
    agentMovements.push(+cashOutAmountEl.value);
    agentMovementsDates.push(currentDate);

    updateBalanceTransactions();

    actionMsgEl.classList.remove("hidden");
    actionTypeEl.textContent = "Cashout";
    actionMoneyEl.textContent = cashOutAmountEl.value;

    // Clearing Logout Timer
    clearInterval(timerLogOut);
    timerLogOut = logOutTimer();
  }

  displayingCashOutError();

  // Removing value from input
  agentIdEl.value = "";
  agentIdEl.blur();
  cashOutAmountEl.value = "";
  cashOutAmountEl.blur();
  cashOutPinEl.value = "";
  cashOutPinEl.blur();
};

// Event Listener
cashOutBtnEl.addEventListener("click", cashOutHandler);

// ******* Handling Cashin ******* //
// Helping Function
// ******* Displaying Error Cashin ******* //
const displayingCashinError = function () {
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
};

// Event Handler
const cashinHandler = function (e) {
  e.preventDefault();

  variablesForActions();

  const {
    movementsInfo: { movements },
    movementsInfo: { movementsDates },
  } = currentUser;

  if (
    cashinUserNameEl.value === currentUser.userName &&
    +cashinAmountEl.value > 0 &&
    +cashinUserPinEl.value === currentUser.pin
  ) {
    movements.push(+cashinAmountEl.value);
    movementsDates.push(currentDate);

    updateBalanceTransactions();

    actionMsgEl.classList.remove("hidden");
    actionTypeEl.textContent = "Cashin";
    actionMoneyEl.textContent = cashinAmountEl.value;

    // Clearing Logout Timer
    clearInterval(timerLogOut);
    timerLogOut = logOutTimer();
  }

  displayingCashinError();

  // Removing values from input
  cashinAmountEl.value = "";
  cashinAmountEl.blur();
  cashinUserPinEl.value = "";
  cashinUserPinEl.blur();
  cashinUserNameEl.value = "";
  cashinUserNameEl.blur();
};

// Event Listener
cashinBtnEl.addEventListener("click", cashinHandler);

// ******* Handling Sendmoney ******* //
// Helping Function
const displayingSendmoneyError = function (recAcc, curBal) {
  if (!recAcc || recAcc === currentUser) {
    sendMoneyUserNameEl.classList.add("error");
    setTimeout(function () {
      sendMoneyUserNameEl.classList.remove("error");
    }, 2000);
  }
  if (+sendMoneyAmountEl.value <= 0 || +sendMoneyAmountEl.value > curBal) {
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
};

// Event Handler
const sendMoneyHandler = function (e) {
  e.preventDefault();

  const reciverAcc = accounts.find(
    (acc) => acc.userName === sendMoneyUserNameEl.value
  );

  variablesForActions();
  const {
    movementsInfo: { movements },
    movementsInfo: { movementsDates },
  } = currentUser;

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

    updateBalanceTransactions();

    actionMsgEl.classList.remove("hidden");
    actionTypeEl.textContent = "Send Money";
    actionMoneyEl.textContent = sendMoneyAmountEl.value;

    // Clearing Logout Timer
    clearInterval(timerLogOut);
    timerLogOut = logOutTimer();
  }

  displayingSendmoneyError(reciverAcc, currentBalance);

  // Removing values from input
  sendMoneyAmountEl.value = "";
  sendMoneyAmountEl.blur();
  sendMoneyUserPinEl.value = "";
  sendMoneyUserPinEl.blur();
  sendMoneyUserNameEl.value = "";
  sendMoneyUserNameEl.blur();
};

// Event Listener
sendMoneyBtnEl.addEventListener("click", sendMoneyHandler);
