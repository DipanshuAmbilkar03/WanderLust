<h1 align="center">WanderLust</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/Status-Active-green.svg" alt="Status">
  <img src="https://img.shields.io/badge/Node.js-%3E%3D14.0.0-brightgreen.svg" alt="Node.js Version">
  <img src="https://img.shields.io/badge/Express.js-%5E4.18.0-orange.svg" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-%5E4.0.0-brightgreen.svg" alt="MongoDB">
  <img src="https://img.shields.io/badge/Mongoose-%5E5.0.0-green.svg" alt="Mongoose">
  <img src="https://img.shields.io/badge/JavaScript-ES6-yellow.svg" alt="JavaScript">
  <img src="https://img.shields.io/badge/EJS-EJS Mate-lightgrey.svg" alt="EJS Mate">
  <img src="https://img.shields.io/badge/RESTful%20API-CRUD-blue.svg" alt="RESTful API">
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
  <li><strong>Responsive Design:</strong> Custom CSS for a modern, clean look with Plus Jakarta Sans font.</li>
</ul>

## Technologies Used
<ul>
  <li><strong>Node.js:</strong> Server-side runtime environment</li>
  <li><strong>Express.js:</strong> Web framework for Node.js</li>
  <li><strong>MongoDB & Mongoose:</strong> NoSQL database and schema modeling</li>
  <li><strong>EJS:</strong> Templating engine for rendering dynamic HTML</li>
  <li><strong>RESTful API:</strong> Implements RESTful API endpoints for CRUD operations.</li>
  <li><strong>JavaScript:</strong> Client-side and server-side scripting is done using JavaScript for dynamic behavior.</li>
  <li><strong>CRUD Operations:</strong> Complete support for creating, reading, updating, and deleting travel listings.</li>
  <li><strong>Responsive Design:</strong> Custom CSS for a modern, clean look with Plus Jakarta Sans font.</li>  
  <li><strong>CSS:</strong> Frontend styling</li>
</ul>

## Project Structure

<pre>
WanderLust/
├── app.js              
├── models/
│   └── listing.js      
├── public/
│   └── css/
│       └── style.css  
├── views/
│   ├── layouts/      
│   ├── includes/      
│   └── *.ejs          
└── .github/
    └── workflows/      
</pre>

## Schema Design

The travel listings are represented by the following Mongoose schema:

<pre><code>
const listingItems = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, set: (v) => v || "https://britannica.com/placeholder.jpg" },
  price: { type: Number },
  location: { type: String },
  country: { type: String }
});
</code></pre>

<p align="center"> <strong>Note:</strong> WanderLust is actively under development, with continuous improvements and new features being added.</p>
