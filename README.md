
# StudyNotion - EdTech Platform


🚀 Link to website https://studynotion-frontend.vercel.app/



![mainpage](https://github.com/TirthBhingradiya/StudyNotation-Ed-Tech-/assets/121503596/3e8a000c-c25e-4b56-a58c-898321c9a526)

StudyNotion is a fully functional EdTech Platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.

## Introduction

StudyNotion aims to provide a seamless and interactive learning experience for students, making education more accessible and engaging. Additionally, the platform serves as a platform for instructors to showcase their expertise and connect with learners across the globe.

In the following sections, we will cover the technical details of the platform, including the system architecture, API design, installation, usage instructions, and potential future enhancements.

## System Architecture
The StudyNotion EdTech platform consists of three main components: the front-end, the back-end, and the database. The platform follows a client-server architecture, with the front-end serving as the client and the back-end and database serving as the server.

## Front-end
The front-end of the platform is built using ReactJS, which allows for the creation of dynamic and responsive user interfaces, crucial for providing an engaging learning experience to students. The front-end communicates with the back-end using RESTful API calls.

### Front End Pages
For Students:

- Homepage: A brief introduction to the platform with links to the course list and user details.
- Course List: A list of all the courses available on the platform, along with their descriptions and ratings.
- Wishlist: Displays all the courses that a student has added to their wishlist.
- Cart Checkout: Allows the user to complete course purchases.
- Course Content: Presents the course content for a particular course, including videos and related material.
- User Details: Provides details about the student's account, including their name, email, and other relevant information.
- User Edit Details: Allows students to edit their account details.

For Instructors:

- Dashboard: Offers an overview of the instructor's courses, along with ratings and feedback for each course.
- Insights: Provides detailed insights into the instructor's courses, including the number of views, clicks, and other relevant metrics.
- Course Management Pages: Enables instructors to create, update, and delete courses, as well as manage course content and pricing.
- View and Edit Profile Details: Allows instructors to view and edit their account details.

### Front-end Tools and Libraries
To build the front-end, we use frameworks and libraries such as ReactJS, CSS, and Tailwind for styling, and Redux for state management.

## Back-end
The back-end of the platform is built using NodeJS and ExpressJS, providing APIs for the front-end to consume. These APIs include functionalities such as user authentication, course creation, and course consumption. The back-end also handles the logic for processing and storing the course content and user data.

### Back-end Features
- User Authentication and Authorization: Students and instructors can sign up and log in to the platform using their email addresses and passwords. The platform also supports OTP (One-Time Password) verification and forgot password functionality for added security.
- Course Management: Instructors can create, read, update, and delete courses, as well as manage course content and media. Students can view and rate courses.
- Payment Integration: Students will purchase and enroll in courses by completing the checkout flow, followed by Razorpay integration for payment handling.
- Cloud-based Media Management: StudyNotion uses Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and documents.
- Markdown Formatting: Course content in document format is stored in Markdown format, allowing for easier display and rendering on the front-end.
### Back-end Frameworks, Libraries, and Tools
The back-end of StudyNotion uses various frameworks, libraries, and tools to ensure its functionality and performance, including:

- Node.js: Used as the primary framework for the back-end.
- Express.js: Used as a web application framework, providing a range of features and tools for building web applications.
- MongoDB: Used as the primary database, providing a flexible and scalable data storage solution.
- JWT (JSON Web Tokens): Used for authentication and authorization, providing a secure and reliable way to manage user credentials.
- Bcrypt: Used for password hashing, adding an extra layer of security to user data.
- Mongoose: Used as an Object Data Modeling (ODM) library, providing a way to interact with MongoDB using JavaScript.
Data Models and Database Schema
The back-end of StudyNotion uses several data models and database schemas to manage data, including:

- Student Schema: Includes fields such as name, email, password, and course details for each student.
- Instructor Schema: Includes fields such as name, email, password, and course details for each instructor.
- Course Schema: Includes fields such as course name, description, instructor details, and media content.
### Database
The database for the platform is built using MongoDB, a NoSQL database that provides a flexible and scalable data storage solution. MongoDB allows for the storage of unstructured and semi-structured data. The database stores the course content, user data, and other relevant information related to the platform.

![schema](https://github.com/TirthBhingradiya/StudyNotation-Ed-Tech-/assets/121503596/b4c44513-0453-4f52-8005-dbafa3442b18)


## Architecture Diagram

Below is a high-level diagram that illustrates the architecture of the StudyNotion EdTech platform:

![architecture](https://github.com/TirthBhingradiya/StudyNotation-Ed-Tech-/assets/121503596/4ff1a942-9cef-4c7a-ac95-d814e5fc3050)


## API Design
The StudyNotion platform's API is designed following the REST architectural style. The API is implemented using Node.js and Express.js. It uses JSON for data exchange and follows standard HTTP request methods such as GET, POST, PUT, and DELETE.

For detailed API documentation and endpoints, refer to the API Documentation.-



## Installation
Navigate to the project directory: 
``` bash 
cd StudyNotion

```

Install dependencies: 



```bash
 npm install
```

## Configuration
Set up a MongoDB database and obtain the connection URL.
Create a .env file in the root directory with the following environment variables:
``` bash

MONGODB_URI=<your-mongodb-connection-url>
JWT_SECRET=<your-jwt-secret-key>


```
Usage
- Start the server: 
```bash
 npm start

 ```
- Open a new terminal and navigate to the client directory:
``` bash
 cd client

 ```
- Start the React development server: 
```bash
npm start

```
Access the application in your browser at http://localhost:3000.
