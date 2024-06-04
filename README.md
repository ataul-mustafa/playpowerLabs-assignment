Playpower Labs assignment


Folder structure of repository

1. backend-student_assignment (backend project code)
2. documents (All neccessary documents like fronend setup, backend setup, api endpoints)
3. frontend-timezon-convertor (frontend project code)
   

For better understanding of setup instruction and API endpoints you can refer the documantations available in documents directory of the repository. documents are very well written and easy to understand there.

if you want to proceed see the whole documentation here, it is also available here. refer below

1. Frontend setup
2. backend setup
3. API endpoints



1.

Frontend/Timezone Converter setup instructions
Overview

This project is a Timezone Converter application built using modern web technologies to provide a fast and interactive user experience. The main functionalities of this application include converting the time from one timezone to another and selecting timezones via a search bar and slider present in every timezon component. The project uses the following technologies:

	Vite: A fast build tool and development server.
	React: A JavaScript library for building user interfaces.
	Moment-Timezone: A library for parsing, validating, manipulating, and formatting dates and times in different timezones.
	React-Icons: A collection of popular icons as React components.
	React-Beautiful-Dnd: A library for beautiful and accessible drag-and-drop interactions.
	Project Structure

Setup Instructions

Prerequisites

Ensure you have the following software installed:
•	Node.js (v18.x or later)
•	npm (v6.x or later)

Step 1: Open the project
Opent the project in playpower-assignment/frontend-timezone-convertor

Step 2: Install Dependencies
Install the required Node.js dependencies by running:
npm install 

Step 3: Start the Development Server
Start the Vite development server by running:
npm run dev 
The server will start and the application will be available at http://localhost:5173.

Step 4: Build for Production
To build the project for production, run:
npm run build 
The build outputs will be placed in the dist directory.

Step 5: Preview the Production Build
To preview the production build, you can use the Vite preview command:
npm run preview 
This will start a local server to preview the production build.

Application Features
	Timezone Selector: Use the search bar to select the source and target timezones.
	Time Conversion: slide the time from the slider of a timezone component to see the converted time in the time input bar
	Drag and Drop: Use react-beautiful-dnd for intuitive drag-and-drop interactions in order to change the order of selected timezons
	Change the date from inputbar date:  use can change to date of timezone components
	Reverse the order of selected timezon: we can reverse the order of timezon by clicking the icon left of link icon at top right.
	Copy the link: we can copy the link of website by clicking on link icon at top right.


Additional Scripts
In the project directory, you can run:
•	npm run dev: Starts the Vite development server.
•	npm run build: Builds the app for production.
•	npm run preview: Previews the production build locally.
•	npm run lint: Runs the linter to check for code quality issues.
Contact
For any questions or issues regarding the setup or usage of the project, please contact the project developer at ataul.computer786@gmail.com or phone: 7983732026



2.

Backend/student_assignment Setup instructions

Overview
This project is an Assignment Management System built using Node.js, Express.js, MySQL, and JWT for authentication. The system provides endpoints for user authentication, assignment creation, retrieval, update, deletion, and submission. The project follows the MVC (Model-View-Controller) architecture, ensuring a clear separation of concerns and maintainability.

Setup Instructions

Prerequisites
Ensure you have the following software installed:
Node.js (v12.x or later)
MySQL (v5.7 or later)
Step 1: Clone the Repository
Clone the project repository to your local machine using the following command:
git clone https://github.com/your-username/assignment-management-system.git
cd assignment-management-system

Step 2: Install Dependencies
Install the required Node.js dependencies by running:
npm install

Step 3: Configure Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=student_assignments
SECRET_KEY=djo98t*tu4*%&jfdlj$jdlgkjdfg8u9485udjgkdjgljkg4578438*dfhjkgsfh784eyt4*@^$tgyufty
Note: These variables configure the server port, database connection details, and the secret key for JWT authentication.

Step 4: Initialize the Database
Start your MySQL server and create the necessary database and tables by executing the SQL script provided. You can use a MySQL client or the command line:
mysql -u root -p < database/initializeDatabaseAndTables.sql
This command will prompt you for the MySQL root password and then execute the SQL script to set up the database and tables.

Step 5: Start the Server
Start the Node.js server by running:
node index.js or npm run dev
The server will start on the port specified in the .env file (default is 3000).

Step 6: Test the API
You can now test the API endpoints using tools like Postman or cURL. Ensure that you include the JWT token in the Authorization header for all authenticated routes except of /login route. For testing all enpoint we have postman file that can executes directly and will open all the routes in the postman. For understating how wll api endpoints works please refer to endpoint documentation file. 
Available Scripts
In the project directory, you can run:
npm start: Starts the server in production mode.
npm run dev: Starts the server in development mode using nodemon for automatic restarts on file changes.
Contact: For any questions or issues regarding the setup or usage of the project, please contact the project developer at ataul.computer786@gmail.com or phone: 7983732026



3.

API Endpoints Documentation

Overview
This document provides detailed information on the API endpoints for the assignment management system. The API is built using Node.js and Express.js, with MySQL as the database and JSON Web Tokens (JWT) for authentication. We have a postman api doucmation files that can execute directly in the postman.
The base URL for all endpoints is https://student-assignment.onrender.com/
Authentication
All endpoints that modify or retrieve assignments require authentication via a JWT token. The token must be included in the Authorization header of the request in the following format:

Authorization:  <jwtToken> 

Endpoints
1. User Authentication
POST /api/login
Mock authentication service that accepts any username and password, and returns a JWT token for subsequent requests.
Request Body:
{ "username": "string", "password": "string" } 
Response:
{ message: “user logged in successfully", jwtToken": "string" } 
Description:
•	No validation on username and password.
•	Returns a JWT token for authenticated requests.

2. Assignment Management
POST /api/assignments

Creates a new assignment.

Middlewares:
•	verifyToken
Request Body:
{ "title": "string", "description": "string", "due_date": "date" } 
Response:
{ "message": "Assignment created successfully.", "id": "integer" } 
Description:
•	Validates the user using verifyToken middleware.
•	Creates an assignment with the provided title, description, and due date.


GET /api/assignments

Retrieves all assignments of the authenticated teacher.
Middleware:
•	verifyToken
Response:
 [ { "id": "integer", "title": "string", "description": "string", "due_date": "date"} ] 
Description:
•	Validates the user using verifyToken middleware.
•	Returns all assignments created by the authenticated teacher.


GET /api/assignments/:id

Retrieves a specific assignment by ID.
Middleware:
•	verifyToken
Request Parameters:
•	id (integer): Assignment ID
Response:
{ "id": "integer", "title": "string", "description": "string", "due_date": "date"} 
Description:
•	Validates the user using verifyToken middleware.
•	Returns the assignment with the specified ID.


PUT /api/assignments/:id

Updates an existing assignment by ID.
Middleware:
•	verifyToken
•	teacherAuth
Request Parameters:
•	id (integer): Assignment ID
Request Body:
{ "title": "string", "description": "string", "due_date": "date" } 
Response:
{ "message": "Assignment updated successfully." } 
Description:
•	Validates the user using verifyToken middleware.
•	Ensures that only the teacher who created the assignment can update it using teacherAuth 
Allows partial or full update of the assignment.

DELETE /api/assignments/:id

Deletes a specific assignment by ID.
Middleware:
•	verifyToken
•	teacherAuth
Request Parameters:
•	id (integer): Assignment ID
Response:
{ "message": "Assignment deleted successfully." } 
Description:
•	Validates the user using verifyToken middleware.
•	Ensures that only the teacher who created the assignment can delete it using teacherAuth
.

DELETE /api/assignments

Deletes all assignments of the authenticated teacher.
Middleware:
•	verifyToken
•	teacherAuth
Response:
{ "message": "All assignments deleted successfully." } 
Description:
•	Validates the user using verifyToken middleware.
•	Ensures that only the teacher who created the assignments can delete them using           teacherAuth middleware.


POST /api/assignments/:id

Submits an assignment.
Middleware:
•	verifyToken
Request Parameters:
•	id (integer): Assignment ID
Request Body:
{ "response": "string" } 
Response:
{ "message": "Assignment submitted successfully." } 

Description:
•	Validates the user using verifyToken middleware.
•	Allows any authenticated user/student to submit a response to the assignment with the specified ID.

Middlewares
•	verifyToken
Verifies the JWT token provided in the Authorization header of the request. If the token is valid, the user is authenticated and can proceed with the request.
•	teacherAuth
Ensures that only the teacher who created a specific assignment can update or delete it. This middleware checks the assignment's created_by field against the authenticated user's ID.
Error Handling
All endpoints return appropriate HTTP status codes and error messages for various failure scenarios such as authentication failures, missing required fields, and invalid data.
Contact
For any questions or issues regarding the API, please contact the API developer at ataul.computer786@gmail.com or phone: 7983732026.

