# CAPSTONE - Cookie Jar Karma (CJK)

## So Many Things Yet To Do
This application is far from complete. The UserDashboard is underdeveloped. The 
AdminDashboard is barely a page at all. I need to pull random questions into
the quiz, switch to real authentication, and somehow check the API with the
state's API on a regular basis.

## Interesting Items Learned Along the Way
1. Bootstrap is a sneaky beast
2. One task, one commit <-- I STILL struggle with this
3. CSS is super fun until it's not
4. If the file is longer than 100 lines, try to split it 
5. Custom hooks are scary at first, but they really aren't
6. Sometimes parsing the backend into server / controller / routes just means you 
now have three places to check every single time a route doesn't work
7. Postman and Thunder Client really are my friends
8. I forget what eight was for

## Capstone Objective
Create a full-stack web application using **MongoDB, Express, React, and Node (MERN).**

## Deadline
The complete application is due by **11:59pm on 03/19/2025.**

## Submission
Submit the <a href="https://github.com/dsus121/_Capstone">GitHub link</a> on Canvas.
https://github.com/dsus121/_Capstone

## Frontend Setup
1. Created a new folder on my local machine.
2. Created a new repository on GitHub.
3. Ran `npm create vite@latest` in the terminal.
4. Used `cd cjk_v1` (changed directory to get into the project).
5. Ran `npm install`.
6. Ran `npm run dev` (CTRL+click to open the project in the browser).
7. Removed all unnecessary boilerplate code.
8. Restructured to separate frontend from backend, creating the appropriate skeleton. 

## Backend Setup
1. Installed the following using npm --
- express: Backend framework for routing and handling requests.
- mongoose: Object Data Modeling (ODM) library for MongoDB.
- cors: Middleware to manage Cross-Origin Resource Sharing.
- dotenv: For loading environment variables from a .env file.
- validator: To validate user inputs (e.g., emails).
- bcrypt: To hash passwords securely.
- jsonwebtoken: For generating and verifying authentication tokens.

2. Set Up the Project Structure
3. Set Up .env File
4. Create the Express Server (server.js)
5. Set Up Mongoose Models
6. Set Up Routes (Optional)
7. Test the Server
 

## Introduction
Cookie Jar Karma is a micro-donation platform designed to allow individuals to make small contributions to charitable causes, aiming to help them alleviate guilt from everyday actions.


-------------------------------------------------------------

### Your presentation should include:
1. A demonstration of the application.
2. An overview of the challenges you endured, and how you handled them.
3. A short question-and-answer period.

## Finishing Up
As you finish building your application, ask yourself the following questions:
- Did you deliver a project that met all of the technical requirements?
- Given what the class has covered, did you build something reasonably complex?
- Did you add a personal touch or a creative element into your project submission?
- Did you deliver something of value to the end-user (not just a login button and an index page)?
- Did you follow the code style guidance and exercise best practices?
- Did you provide an appropriate level of comments?
- Did you try to deploy your application to a public URL as a personal stretch goal?

# Requirements / Grading Rubric

## (20%) Project Structure, Standardization, and Convention

- [X] Project is organized into appropriate files and directories, following best practices.
- [X] Project contains an appropriate level of comments.
- [X] Project is pushed to GitHub, and contains a README file that documents the project, including an overall description of the project.
- [X] Standard naming conventions are used throughout the project.
- [X] Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
- [X] Level of effort displayed in creativity, presentation, and user experience.

---

## (12%) Core JavaScript

- [X] Demonstrate proper usage of ES6 syntax and tools.
- [X] Use functions and classes to adhere to the DRY principle.
- [X] Use Promises and async/await, where appropriate.
- [X] Use Axios or fetch to retrieve data from an API.
- [X] Use sound programming logic throughout the application.
- [X] Use appropriate exception handling. (or in my case OVERuse)


## (9%) Database

- [X] Use MongoDB to create a database for your application. **(5%)**
- [X] Apply appropriate indexes to your database collections. **(2%)**
- [X] Create reasonable schemas for your data by following data modeling best practices. **(2%)**

---

## (19%) Server

- [X] Create a RESTful API using Node and Express.
  - *For the purposes of this project, you may forgo the HATEOAS aspect of REST APIs.* **(7%)**
- [X] Include API routes for all four CRUD operations. **(5%)**
- [X] Utilize the native MongoDB driver or Mongoose to interface with your database. **(5%)**
- [X] Include at least one form of user authentication/authorization within the application. **(2%)**

## (35%) Front-End Development

- [X] Use React to create the application’s front-end. **(10%)**
- [X] Use CSS to style the application. **(5%)** (OR scss!)
- [X] Create at least four different views or pages for the application. **(5%)**
- [X] Create some form of navigation that is included across the application’s pages, utilizing React Router for page rendering. **(5%)**
- [X] Use React Hooks or Redux for application state management. **(5%)**
- [X] Interface directly with the server and API that you created. **(5%)**

---

## (5%) Presentation

- [ ] Create a short overview of your application. **(1%)**
- [ ] Highlight the use cases of your application. **(1%)**
- [ ] Highlight the technical functionality of the application, from a high-level perspective. **(1%)**
- [ ] Discuss what you have learned through the development of the application. **(1%)**
- [ ] Discuss additional features that could be added to the application in the future. **(1%)**


## (5%) Extra Credit

- [ ] Adhere to Agile principles and the Scrum framework. Perform stand-up sessions (with an instructor) when possible. **(1%)**
- [X] Successfully track your project using software similar to Jira. **(1%)**
- [ ] Build your application primarily with TypeScript. **(3%)**

