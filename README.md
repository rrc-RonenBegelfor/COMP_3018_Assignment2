# Project Overview

This porject was developed in a hope of creating a working API which manages employees and branches collections. The API uses firebase databases to store and call it's data from. For both the collections, you can get all instances or get them one by id. You can create an instance for each, update one, or delete one.

## Installation Instructions

In this section I would go over the prerequisites for the project and then the setup steps.

### Prerequisites

- Node.js and npm
- Firebase
  - with admin credentials

### Setup Steps

Installing dependencies:

Start with cloning the repository

```bash
git clone https://github.com/rrc-RonenBegelfor/COMP_3018_Assignment2
```

Then, to ensure all dependencies are installed after cloning, run the following

```bash
npm install
```

You will need a `.env` to store your credentials from firebase in, so do the following:

```env
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
PORT=3000
```

And now, you should be ready to run on the server:

```bash
npm run build
npm start
```

## API Request Examples

This section will include examples of how to make request to this API.

It is recommended to get `Postman` or installing `Postman CLI`.

[Link to Postman Webiste](https://www.postman.com/)

### Employees

1. `GET` Employees method

    This method is used to get all the data within the database about Employoes.

    You can also choose to be specific with what you request. This method includes:

    - `GET` all employees

        ```bash
        postman request 'http://localhost:3000/api/v1/employees/'
        ```

    - `GET` an employee by Id

        ```bash
        postman request 'http://localhost:3000/api/v1/employees/{id}'
        ```

    - `GET` get all employees by branchId

        ```bash
        postman request 'http://localhost:3000/api/v1/employees/branch/11'
        ```

    - `GET` employees by department

        ```bash
        postman request 'http://localhost:3000/api/v1/employees?department=RRC%20Polytech'
        ```

2. `POST` Employees method

    This method is used to create an employee.

    ```bash
    postman request POST 'http://localhost:3000/api/v1/employees/' \
    --header 'Content-Type: application/json' \
    --body '{...}'
    ```

    The following fields are required in the body:

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | name | string | Employee name |
    | position | string | Job position |
    | department | string | Departmet name |
    | email | string | Email address |
    | phone | string | Phone number |
    | branchId | number | Branch Id |

    Example of a valid body:

    ```json
    {    
        "name": "John Doe",
        "position": "Manager",
        "department": "Sales",
        "email": "john@example.com",
        "phone": "+1234567890",
        "branchId": 1
    }
    ```

3. `PUT` Employees method

    This method is used to update an employee's existing data. Make sure to select the employee using an id.

    ```bash
    postman request PUT 'http://localhost:3000/api/v1/employees/{id}' \
    --header 'Content-Type: application/json' \
    --body '{...}'
    ```

    The following are optional but body must contain one:

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | name | string | Employee name |
    | position | string | Job position |
    | department | string | Departmet name |
    | email | string | Email address |
    | phone | string | Phone number |
    | branchId | number | Branch Id |

    Example of a valid body:

    ```json
    {    
        "name": "John Doe",
        "position": "Manager",
        "department": "Sales",
        "email": "john@example.com",
        "phone": "+1234567890",
        "branchId": 1
    }

    // or

    {    
        "email": "john@example.com",
        "phone": "+1234567890",
        "branchId": 1
    }
    ```

4. `DELETE` Employees method

    This method is used to delete an employee using an id.

    ```bash
    postman request DELETE 'http://localhost:3000/api/v1/employees/{id}/'
    ```

### Branches

1. `GET` Branches method

    This method is used to get all the data within the database about Branches.

    You can also choose to be specific with what you request. This method includes:

    - `GET` all branches

        ```bash
        postman request 'http://localhost:3000/api/v1/branches/'
        ```

    - `GET` an branch by Id

        ```bash
        postman request 'http://localhost:3000/api/v1/branches/{id}'
        ```

2. `POST` Branches method

    This method is used to create a branch.

    ```bash
    postman request POST 'http://localhost:3000/api/v1/branches/' \
    --header 'Content-Type: application/json' \
    --body '{...}'
    ```

    The following fields are required in the body:

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | name | string | Branch name |
    | address | string | Address position |
    | phone | string | Phone number |

    ```json
    {    
        "name": "IT Ops",
        "address": "123 exampleaddress road",
        "phone": "+1234567890"
    }
    ```

3. `PUT` Branches method

    This method is used to update an Branch's existing data. Make sure to select the branch using an id.

    ```bash
    postman request PUT 'http://localhost:3000/api/v1/branches/{id}' \
    --header 'Content-Type: application/json' \
    --body '{...}'
    ```

    The following are optional but body must contain one:

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | name | string | Branch name |
    | address | string | Address position |
    | phone | string | Phone number |

    Example of a valid body:

    ```json
    {    
        "name": "IT Ops",
        "address": "123 example road",
        "phone": "+1234567890"
    }

    // or

    {    
        "phone": "+1234567890"
    }
    ```

4. `DELETE` Branches method

    This method is used to delete an branch using an id.

    ```bash
    postman request DELETE 'http://localhost:3000/api/v1/branches/{id}/'
    ```

## Public Documentation

If you would like to access the public documentation to this project. You can do so here <[Public Documentation](https://rrc-ronenbegelfor.github.io/COMP_3018_Assignment2/)>.

## Local Documenation

If you would like to access the local documentation to this project, you can do so by doing the following:

- Start the server

    ```bash
    npm start

    # or

    npm run start
    ```

- Open this link <[Swagger UI](http://localhost:3000/api-docs/)>.

## Security Configuration

This project utilizes two securtiy features, both for different use.

First, what they are and what they focus on:

1. Helmet

    A JavaScript middleware for Express applications that enhances security by setting a range of HTTP headers.

2. CORS (Cross-Origin Resource Sharing)

    A security feature that controls how your back-end API allows resources to be accessed from different domains.

### Implementation within the Project

1. Helmet

    ```json
    noSniff: true,

    hidePoweredBy: true,

    referrerPolicy: { policy: "no-referrer" }
    ```

    - I use `noSniff` to prevent browsers from MINE-sniffing.
        - What this can translate to is, prevention of Cross-Site Scripting, or XSS for short. If an attacker finds a vulnerability which can be abused by injecting their own script, which could fish up sensitive data depending on what the attacker gets their hands on.
    - I use `hidePoweredBy` to limit the information about my framework.
        - It is better to reduce the danger of attackers knowing which web framework I am utilizing. Just hiding what your web framework is powered by is not enough, and there are probably alternatives to get that kind of information, but it helps slow the attackers down from trying to exploit known vulnerabilities with your web framework and its current version.
    - I use `referrerPolicy` with the `policy` of `no-referrer` to enhance user privacy.
        - It provides users with high level privacy when browsing as their destination cannot be tracked. It also helps prevent leakage of sensitive information.

2. CORS

    I chose to create a public CORS and a private CORS which you would not have access to from a different site.

    - Public CORS Code

        ```json
        origin: "*",
        methods: ["GET"],
        ```

        This CORS is used on the employees collection.

        The CORS allows you to call it from any origin. The origin could be <https://google.ca>.

        It only allows you to get.

    - Private CORS Code

        ```json
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"]
        ```

        This CORS is used on the branches collection.

        It does not allow you to call for it from any other origin other than the locally hosted server (`http://localhost:3000`).

        Realistically, headers such as Content-Type and Authorization would be required when authenticating and authorizing.

### Secure Enivornment Variable Setup

To start the setup of your secure environment variables, you need to ensure you have the following files:

- `.env`
  - This file would contain your secrets.

- `.gitignore`
  - This file will be used to ignore your `.env` file as it contains your **secrets**.

`.env` example with Firebase:

```json
FIREBASE_PROJECT_ID=your_project_id_here
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nREPLACE_WITH_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_client_email_here
```

#### Firebase Relations

The `.env` file helps you with passing your credentials to the Firebase much safely.

- project_id &rarr; FIREBASE_PROJECT_ID
  - The name of your project.
- client_email &rarr; FIREBASE_CLIENT_EMAIL
  - Your firebase provided service account email.
- private_key &rarr; FIREBASE_PRIVATE_KEY
  - Your **secret** authentication key.

These are all the credentials your Firebase would need for you to access it's services.

#### Environment Variables in this Project

For this project you'd need just the following envrionment variables.

```json
FIREBASE_PROJECT_ID=your_project_id_here
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nREPLACE_WITH_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_client_email_here
PORT=3000
NODE_ENV=development
```

- NODE_ENV
  - Environment mode which helps distinguish between development and production modes.
- PORT
  - Which port the server is going to run or which port the server listens on.
