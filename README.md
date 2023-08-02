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

9. Aditional information
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
