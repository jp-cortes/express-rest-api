# express-rest-api

* This is the backend repository for an e-commerce website built using Express, Docker, Sequelize, Sequelize CLI, PostgreSQL, MySQL, Passport for authentication, and JWT for authorization.

# Features
* Express: A fast and minimalistic web application framework for Node.js.
* Docker: A containerization platform that enables easy deployment and scalability.
* Sequelize: A powerful and flexible Object-Relational Mapping (ORM) tool for Node.js.
* Sequelize CLI: A Command Line Interface (CLI) for managing database migrations and generating models with Sequelize.
* PostgreSQL: A robust open-source relational database management system.
* Passport: An authentication middleware for Node.js that supports various authentication strategies.
* JWT: JSON Web Token for authorization, providing a secure way to transmit information between parties.


# Installation
1. Clone the repository:
```git clone git@github.com:jp-cortes/express-rest-api.git```

2. Change into the project directory:
```cd express-rest-api```

3. Install the dependencies:
```npm install```

4. Create a .env file in the root directory and configure the following environment variables:
* Check .env.example file as reference
```
# express
PORT="5432"   # or your PostgreSQL port
SERVER=""
DATABASE_URL=""
JWT_SECRET=""
# Docker
DB_HOST="localhost"
DB_NAME=""
DB_USER=""
DB_PASSWORD=""
DB_PORT=""

#PGADMIN
PGADMIN_USER=""
PGADMIN_PASSWORD=""

#nodemailer
NODE_MAILER_PORT=""
NODE_MAILER_HOST=""
NODE_MAILER_APP_USER=""
NODE_MAILER_APP_PASSWORD=""
```
5. Run docker:
```docker compose up -d```

7. Run the database migrations:
```npm run migrations:run```

8. Start the server:
```npm run dev```

9. Endpoints
* Start the server on **http://localhost:3000** or on the port of your choice.

```
// products
http://localhost:3000/api/v1/products

// categories
http://localhost:3000/api/v1/categories

// orders protected route
http://localhost:3000/api/v1/orders

// relation orders to products N:N 
http://localhost:3000/api/v1/orders/add-item

// customers
http://localhost:3000/api/v1/customers

// login
http://localhost:3000/api/v1/auth/login
```

10. Schemas
* Create a category
```
{
  "name": "Category",
  "image": "https://image.com"
}
```
* Create a Product
 ```
{
   "name": "Product 1",
   "description": "This is a demo product",
   "image": "https://image.com",
   "price": 747,
   "categoryId": 1
}
 ```
* Create an order
  ```
  {
    "paid":true,
    "status":"on the way"
  }
  ```
  * Relation order products N:N. Do this for every product attached to an order
  ```
  {
    "orderId": 1,
    "productId": 1,
    "amount": 2
  }
  ```
  * Create a customer
  ```
  {
    "name": "jhon",
    "lastName": "doe",
    "phone": "987-123-456",
    "avatar": "https://image.com",
    "user": {
      "email": "demouse01@mail.com",
      "password":"123456789",
      "role": "customer" // You may skip this line. The role is set as customer by default 
  }
  }
  ```
11. interaction with the server Accessing protected routes
* First you may login 
    ```
    {
        "email":"demouser01@mail.com",
        "password":"123456789"
    }
    ```
* Server may response
```
{
   "user": {
        "id": 1,
        "email": "demouser@mail.com",
        "role": "customer",
        "createdAt": "2023-08-12T10:33:50.639Z"
    },
    "token": "example" // use this token as header to access the protected routes
}
```
**Note that many routes provide exclusive access to the admin and seller roles. Check the folder route for mor information**

12. Aditional information
* All endpoints in folder routes/index.js
* You may first create at least 1 category in order to start creating products.
* Check the set up of the evironment variables in folder config/
* For migrations check the file dataBase/
* For Schemas validation with joi check folder schemas/
* For the logic of the routes check file services/
* For user authentication and authorization check folder utils/
* The docker set up is in the file docker-compose.yml

# Branches
The project is divided into three branches, each representing a different version of the backend:

* main: The stable version of the backend, suitable for production use.
* development-postgres: The branch for ongoing development with **postgreSQL and pgdadmin**, containing the latest features and bug fixes.
* development-mySql:The branch for ongoing development with **mySQL and phpmyadmin**, containing the latest features and bug fixes.
* express: A branch with a raw version fully functional. Running in Node.js

# Contributing
We welcome contributions to help improve this project. To contribute, please follow these steps:

* Fork the repository.
* Create a new branch based on the branch you want to contribute to.
* Make your changes and commit them.
* Push your changes to your forked repository.
* Open a pull request, clearly describing the changes you made.
* Please note that all contributions are subject to review and acceptance by the project maintainers.

# License
This project is licensed under the MIT License.
