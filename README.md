# Enlightened LMS
This repo was created for our 5 person team to share and track our code while building a full-stack LMS for CS3750 Software Engineer II at Weber State University, Summer 2020.
This project was completed using a ReactJS frontend and a Java Spring Boot backend.


# Goal
A functioning Learning Management System was the end goal and we were given the choice to use any language and framework we wanted.
This LMS also included integrating with Stripe API in order to securely process student payments, we were required to do this without using the convenient libraries that Stripe provides.
We worked with the professor as our client and had weekly sprint meetings where we would be given new requirements.
This continued through the whole semester until we finished the project and gave a sales pitch as well as a full demo, this went from mid May to the first part of August.


# Frontend
### Framework
We used ReactJS for our frontend written in javascript. We used a couple of other libraries in the frontend as well to help with certain tasks such as axios, react-router-dom and react-big-calendar. We had a modular UI with a navigation bar that allowed for components to be reused in various parts of the web app.

### UI/UX
Our main goal for the user interface was to present the end user with a clean and uncluttered view of each screen’s content, with plenty of space between components to ensure that the user would not get confused by or lost in their layout. It was also important to us that the elements of each view had a somewhat professional appearance. We implemented this using a combination of the material-ui styling library and our own defined CSS styles that were written for each component.


# Backend

### API
Our backend was written in Java using Spring Boot Framework and Gradle package management. We used a Rest API structure for authentication and CRUD operations against our database. We had to make some decisions while coding to determine where and when certain actions would happen, such as data calculations/manipulation on the front end or the back end. In the end, we suppose it all comes down to cost-benefit; if we can offload some calculation to the client then perhaps that’s what we want to do instead of processing on our own server. We used ARC as well as Postman during our API testing.

### Security
We used the Spring Security libraries to provide JSON Web Tokens (JWT). In these tokens there can be things encoded based on the authenticated user, like permission level which is used in order to access different endpoints, such as for Teacher and Student. This setup worked very well and made accessing the backend quite nice and easy to work with.

### Database
We decided on using nosql MongoDB for our database in order to gain more exposure to nosql vs traditional sql and it worked out really well for building a new app quickly with there being no need for constantly changing the structure of the database and reloading dummy data when models are changed. Most of the database work was handled behind the scenes by Spring Boot, selects, inserts, updates and deletes were all easily accomplished by simple interface commands.


# Server

### Environment
Our server infrastructure consisted of 1 physical server hosted at a team member’s home which ran VMware’s ESXi hypervisor with a virtualized RancherOS installation which hosted the Docker containers for each part of the server application. The server applications consisted of a Nginx public Web server/reverse proxy, Mongo Database, Node web server and Java Spring Boot Rest API. The applications were containerized using Docker images being built on a development machine and pushed to docker hub repository and then pulled down to the production server and deployed the images through an encrypted SSH connection to the RancherOS server.

### Public web server
The public facing nginx web server acted as the secure endpoint for all server traffic and was secured with an ssl certificate for free by using sslforfree.com to easily generate the certificate which was issues by ZeroSSL RSA Domain Secure Site Certificate Authority. The Nginx server acted as the single public endpoint which secured all the traffic over the web and then used the reverse proxy functionality to route traffic from the nginx server to the node web server, the Rest Api server and the MongoDB server.

# Testing
To test various functionalities spanning our application, we built a series of tests on the backend using JUnit Jupiter assertions. The tests that were built covered some of the different processes that must occur for the LMS to meet full functionality and usability, including proper population / saving of data models, proper authentication and authorization of LMS users, controller files working as intended, etc. The tests also covered multiple scenarios to ensure that some unexpected cases were accounted for.
