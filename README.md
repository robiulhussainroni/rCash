# rCash - online mobile banking

## Goal : Practice JavaScript knowledge by building a fictional mobile banking app.

## Technology : JavaScript, HTML, CSS, Git



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
- 15/11/2025 - Set the fake data for the application + Worked on mobile navigation logic
- 01/12/2025 - Worked on login (not real login), worked on calculating balance, worked on showing transaction
- 05/12/2025 - Fixed some HTML Class and Content Issue, Worked on Cashout
- 07/12/2025 - Worked on Cashin, Started working on Timer couldn't make it then remove the codes
- 08/12/2025 - Finally Added Send Money Section which I removed from initial plan, also done with all the Send Money Functionality + while adding error messages I figured out some critical bugs on the app, if the condition doesn't found reciver account I can't destructure it also I found a user can do send money to his account, Solved these bug also add error messages and style input field for wrong information
- 09/12/2025 - Fixed a bug where If I login with the agent account the cashout section removed from other normal accounts too but I wanted it to just removed for the agent account, as there are just one agent account on my application + started working on sorting the transaction but couldn't make it
- 17/12/2025 - After a long period of time I'm back working on this project. After a few failed attempt I finally can add the sorting functionality on the app.
- 18/12/2025 - There were some tiny responsive issues and today I solved them. While solving responsive issue I figure out a problem - when user enter login button in mobile view the login screen don't disappear even after the credentials are correct, user have to manually click the close button, not sure whether I'd work on it, but maybe while polishing the app, I'd try to give it a go. + The problem that I saw on login in mobile view I fixed it, also add error sign for falase credential in login form, there are some responsive issues happened for previous code and I solved them. + There were a bug on login input error, I solved it using array's some method. + Wanted to add Intl formatting but witness few awkward bugs, solved few but few of them still remained and it's midnight. I'm feeling sleepy, so I git restore the formatting code.
- 19/12/2025 - Worked on formatting dates and currency based on user locale and currency. + Added the timer functionality on the app and finally the project is completed. Now, only optimizing the code remained.
