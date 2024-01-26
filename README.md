You can see ready application at [https://www.aleksandrmakarov.com/](https://www.aleksandrmakarov.com/)


## Introduction

Full stack web development is a popular approach to building modern web applications. It is an exciting field that requires a broad range o skills and knowledge. The developer must know both front-end and backend development, as well as database management.

## Planning

To begin with, client side development is a part of full stack web development that deals with presentation of website or application. I decided to use [React]() as front-end library as I was familiar with it and it gives you ability to building modern and functional web applications.  

As for the server side I chose [NestJS]() as this framework has modular system that helps to divide your application into parts and use [Dependency Injection]() to link them. Also I decided to take [PostgreSQL]() as database storage and [Google Storage]() to storing files.

## Implementation

### Server side

For the server side I use [NestJS]() as it is a powerful and extensible Node.js framework that follows the modular and scalable architecture of Angular. It's commonly used for building efficient and maintainable server-side applications. Server structure:

  -  `Controllers` - responsible for handling incoming requests and returning responses to the client.
  -  `Services` -  responsible for data storage and retrieval.
  -  `Models` -  responsible for the application's data logic.
  -  `Data Transfer Objects` - responsible for caring data between client and server.

To store data I use [PostgeSQL]() database and [Google Storage](). The database is used to save users, articles and other information while cloud storage saves images and files.

### Client side

I use [React]() for the client side which focuses on a component-based architecture. I implement client-side routing with React Router, utilize React Hooks for state and side effects, and ensure forms are handled with controlled components. For the styling approach I choose [Tailwind]() and handle API integration with [Axios]() and [React Query]().

### Features

#### Authentication

Authentication is the process of verifying the identity of a user, system, or entity. It involves confirming that the entity claiming a particular identity is, indeed, who or what it claims to be.
  -  `Sign Up` - create user account with email and password. User will receive verification code to his email.
  -  `Sign In` - access user account with email and password. Receive cookie with refresh token
  -  `Verify Email` - enter code that was send to email and verify user.
  -  `Refresh Token` - send refresh token and receive access token.
  -   `Sign Out` - clear refresh token cookie and current user session

#### Role Based Authorization

Role-Based Authorization is a security model where access permissions are assigned to users based on their roles within an application or system. In this model, users are assigned one or more roles, and each role is associated with specific permissions or access rights. Each user is assigned to specific role:

  -  `ADMIN` - can manage everything and has access to every route.
  -  `EDITOR` - can create and update articles, delete their own articles.
  -  `USER`  -  can write comments and add articles to features (*not implemented yet*)

#### CRUD Operations

CRUD operations refer to the fundamental actions that can be performed on data in a persistent storage system, such as a database. CRUD stands for Create, Read, Update, and Delete, and each operation corresponds to a basic data manipulation task. Here are resources that can be managed:
 
  - `Articles` - Information about my projects or some interesting information.
  -  `Tags` - Used to categorize articles, can be used to search articles
  -  `Projects` - A short description of projects that I did
  -  `Tools` - Tools that I used to create projects
  -  `Users`  - People that use my website

## Results

### Dashboard

![Screenshot of article update page](https://storage.googleapis.com/vocabulary-app/c41aeb16-e5a1-498c-86f6-171d2d5b63e2.png)

### Home page

![Screenshot of home page](https://storage.googleapis.com/vocabulary-app/ce6c5a53-1830-41cc-9d98-9d0dcbf7095d.png)

### Blog

![Screenshot of blog page](https://storage.googleapis.com/vocabulary-app/53a86311-0c66-4e10-8f95-9e762e7c25d3.png)

## Future plans
There are features that I would like to implement in future

  - `Comment section` - authorized users can write comments to articles, reply other user's comments.
  - `Featured articles` - user can save articles to featured.
  -  `Authentication with Google`  - person can use their Google Account to sign in instead of email and password.

## Conclusion

Overall, full-stack web development is a challenging but rewarding field that offers a range of opportunities for developers. It requires a broad range of skills and knowledge, but the result is a functional and visually appealing product. There is still a lot of features that I would like to implement. I will keep you updated!
