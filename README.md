<h1 align="center">WanderLust</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.1-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/Status-Active-green.svg" alt="Status">
  <img src="https://img.shields.io/badge/Node.js-%3E%3D14.0.0-brightgreen.svg" alt="Node.js Version">
  <img src="https://img.shields.io/badge/Express.js-%5E4.18.0-orange.svg" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-%5E4.0.0-brightgreen.svg" alt="MongoDB">
  <img src="https://img.shields.io/badge/Mongoose-%5E5.0.0-green.svg" alt="Mongoose">
  <img src="https://img.shields.io/badge/JavaScript-ES6-yellow.svg" alt="JavaScript">
  <img src="https://img.shields.io/badge/EJS-EJS Mate-lightgrey.svg" alt="EJS Mate">
  <img src="https://img.shields.io/badge/Passport.js-Authentication-blueviolet.svg" alt="Passport.js">
  <img src="https://img.shields.io/badge/Flash-Messages-important.svg" alt="Flash Messages">
  <img src="https://img.shields.io/badge/Session-Management-informational.svg" alt="Session Management">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
</p>

<p align="center">
  WanderLust is a dynamic web application that showcases travel destinations and information using <strong>MongoDB</strong>, <strong>Express</strong>, and <strong>Node.js</strong> with <strong>EJS</strong> templating. The app integrates MongoDB with <strong>Mongoose</strong> for structured schema definitions and database management.
</p>

## Features
<ul>
  <li><strong>Mongoose Integration:</strong> Uses Mongoose to connect to a MongoDB database and define schemas for travel listings.</li>
  <li><strong>EJS Templating:</strong> Displays dynamic data on the frontend with Embedded JavaScript.</li>
  <li><strong>Express.js:</strong> Handles routing, middleware, and server-side logic.</li>
  <li><strong>Session Management:</strong> Utilizes <code>express-session</code> to manage user sessions securely.</li>
  <li><strong>Authentication:</strong> Added <code>passport.js</code> for user authentication with local strategy.</li>
  <li><strong>Flash Messages:</strong> Integrated flash messages to notify users about success or error events.</li>
  <li><strong>Data Validation:</strong> Default placeholder images ensure robust schema design.</li>
  <li><strong>Responsive Design:</strong> Custom CSS for a modern, clean look with Plus Jakarta Sans font.</li>
</ul>

## Technologies Used
<ul>
  <li><strong>Node.js:</strong> Server-side runtime environment</li>
  <li><strong>Express.js:</strong> Web framework for Node.js</li>
  <li><strong>MongoDB & Mongoose:</strong> NoSQL database and schema modeling</li>
  <li><strong>EJS:</strong> Templating engine for rendering dynamic HTML</li>
  <li><strong>Passport.js:</strong> Authentication middleware</li>
  <li><strong>Flash:</strong> Flash message middleware</li>
  <li><strong>Express-session:</strong> Session management for secure data handling</li>
  <li><strong>JavaScript:</strong> Client-side and server-side scripting is done using JavaScript for dynamic behavior.</li>
  <li><strong>RESTful API:</strong> Implements RESTful API endpoints for CRUD operations.</li>
</ul>

## Project Structure

<pre>
WANDERLUST
│
├── CR/
|    └── routes
│     |  ├── post.js
│     |  └── user.js
|     └── views
|     |    └── page.ejs
|     └── server.js
├── demo/
│   ├── new_ejs.ejs
│   └── test.js
├── init/
│   ├── data.js
│   ├── index.js
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── node_modules/
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
|        └── script.js
├── routes/
│   ├── listings.js
│   ├── review.js
│   └── user.js
├── utils/
│   ├── expressError.js
│   └── wrapAsync.js
├── views/
│   ├── includes/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── show.ejs
│   │   └── test.ejs
│   └── user/
│       ├── login.ejs
│       ├── signup.ejs
│       └── error.ejs
├── app.js
├── .gitignore
└── package.json

</pre>

## New Additions
- **Authentication System:** Added login and logout functionality with secure session management.
- **Flash Messages:** Dynamic success and error messages implemented using middleware.
- **Placeholder Images:** Ensures listings have a default image if none is provided.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/WanderLust.git
   ```
2. Install dependencies:
   ```bash
   cd WanderLust
   npm install
   ```
3. Run the server:
   ```bash
   node app.js
   ```
>

<p align="center"> <strong>Note:</strong> WanderLust is actively under development, with continuous improvements and new features being added.</p>
