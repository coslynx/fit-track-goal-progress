<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
  fitness-tracker-app
</h1>
<h4 align="center">Track fitness goals, progress, and share achievements easily.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React_19.0.0-blue" alt="React 19.0.0">
  <img src="https://img.shields.io/badge/Frontend-JavaScript,_HTML,_CSS-red" alt="JavaScript, HTML, CSS">
  <img src="https://img.shields.io/badge/Backend-Node.js_18.18.2-blue" alt="Node.js 18.18.2">
   <img src="https://img.shields.io/badge/Database-MongoDB_6.2.0-green" alt="MongoDB 6.2.0">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains a Minimum Viable Product (MVP) for a web application named "fitness-tracker-app". This MVP allows users to track their fitness goals, monitor progress, and share achievements. The application is built using React for the frontend, Node.js for the backend, and MongoDB for data storage. It provides an easy way for fitness enthusiasts to monitor their progress and share achievements with friends.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔑 | **User Authentication**   | Secure user authentication system with registration and login functionalities.                                            |
| 🎯 | **Goal Setting**  | Allows users to set fitness goals with descriptions, target values, and progress tracking.                                               |
| 📈 | **Progress Tracking**  | Enables users to track their progress towards their fitness goals.                                               |
| 🔗 | **Social Sharing**   | Provides a basic ability to share fitness achievements.   |
| ⚙️ | **Architecture**   |  Uses a modular architecture, separating the frontend (React), backend (Node.js), and database (MongoDB) layers.           |
| 📄 | **Documentation**  |  Includes a detailed README file with project overview, installation, and usage instructions.                               |
| 🔗 | **Dependencies**   |  Utilizes dependencies like `axios`, `bcrypt`, `cors`, `express`, `joi`, `jsonwebtoken`, `mongoose`, `react`, `react-dom`, `react-router-dom`, `dotenv`, and `tailwindcss`.  |
| 🧩 | **Modularity**     |  The project is structured into modules like components, pages, hooks, context, services, utils, and api for better maintainability.        |
| 🧪 | **Testing**        |  Includes unit tests for components and validation utilities using `@testing-library/react` and Jest.         |
| ⚡️  | **Performance**    |  Uses efficient database queries and optimized rendering practices.                                        |
| 🔐 | **Security**       |  Implements JWT for secure authentication and password hashing using bcrypt.                                     |
| 🔀 | **Version Control**|  Utilizes Git for version control.                         |
| 🔌 | **Integrations**   |  Integrates with MongoDB for data persistence and local storage for token management.          |
| 📶 | **Scalability**    | Designed with a scalable architecture, suitable for future feature expansions.                                          |

## 📂 Structure
```text
├── README.md
├── package.json
├── .env
├── config
│   └── database.js
├── api
│   ├── auth.js
│   └── goals.js
├── models
│   ├── User.js
│   └── Goal.js
├── services
│   ├── api.js
│   └── auth.js
├── controllers
│   ├── authController.js
│   └── goalController.js
├── middlewares
│   └── authMiddleware.js
├── utils
│   ├── helpers.js
│   └── validators.js
├── constants
│   └── apiEndpoints.js
├── components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Modal.jsx
│   └── GoalCard.jsx
├── pages
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   └── Goals.jsx
├── hooks
│   ├── useAuth.js
│   └── useFetch.js
├── context
│   └── AuthContext.js
├── public
│   ├── index.html
│   └── favicon.ico
├── styles
│   └── global.css
├── assets
│   ├── images
│   │   └── logo.png
│   └── icons
│       └── settings.svg
└── tests
    ├── components
    │   └── Button.test.js
    └── utils
        └── validators.test.js
```

## 💻 Installation
 > [!WARNING]
 > ### 🔧 Prerequisites
 > - Node.js v18.18.2 or higher
 > - npm 6+ or higher
 > - MongoDB v6.2.0 or higher

### 🚀 Setup Instructions
1.  Clone the repository:
    ```bash
    git clone https://github.com/coslynx/fitness-tracker-app.git
    cd fitness-tracker-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3. Set up the database:
    - Make sure MongoDB is running and accessible using `mongodb://localhost:27017/fitness_tracker`.
4. Configure environment variables:
    ```bash
    cp .env.example .env
    ```
    - Update the `.env` file with your desired MongoDB connection URI and JWT secret.

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
    ```bash
    npm run dev
    ```
2. Access the application:
    - Web interface: `http://localhost:3000`
3. The backend server will automatically be started using the development server.

> [!TIP]
> ### ⚙️ Configuration
> - The application uses environment variables for configuration.
> - Modify the `.env` file to set your MongoDB connection URI (`MONGO_URI`), JWT secret (`JWT_SECRET`), and client URL (`CLIENT_URL`).
> -  The client URL is set to `http://localhost:3000` by default.

### 📚 Examples
Provide specific examples relevant to the MVP's core features:

- 📝 **User Registration**:
    ```bash
    curl -X POST http://localhost:5000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"username": "newuser", "email": "user@example.com", "password": "securepass123"}'
    ```

- 📝 **User Login**:
  ```bash
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username": "newuser", "password": "securepass123"}'
  ```
  
- 📝 **Adding a Goal**:
   ```bash
    curl -X POST http://localhost:5000/api/goals \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"description": "Run 5 miles", "target": 5, "progress": 0}'
   ```

## 🌐 Hosting
### 🚀 Deployment Instructions
Provide detailed, step-by-step instructions for deploying to the most suitable platform for this MVP. For example:

#### Deploying to a Cloud Server

1. Build the React frontend:
    ```bash
    cd client
    npm run build
    cd ..
    ```
2. Build the backend by running the command
   ```bash
    npm run build:backend
   ```
3. Copy the contents of the frontend build folder to the server.
4. Set up environment variables on the server:
   - Set `NODE_ENV` to `production`.
   - Set `MONGO_URI` to your production MongoDB connection string.
   - Set `JWT_SECRET` to your production JWT secret.
   - Set `CLIENT_URL` to your production URL.
5. Start the Node.js backend server using a process manager like pm2 or forever
   ```bash
    npm start
   ```

### 🔑 Environment Variables
Provide a comprehensive list of all required environment variables, their purposes, and example values:

- `MONGO_URI`: Connection string for the MongoDB database.
 Example: `mongodb://localhost:27017/fitness_tracker`
- `JWT_SECRET`: Secret key for JWT token generation.
 Example: `your_jwt_secret`
- `PORT`: Port for the Node.js server
 Example: `5000`
- `CLIENT_URL`: URL for the client-side React application.
 Example: `http://localhost:3000`

## 📜 API Documentation
### 🔍 Endpoints
Provide a comprehensive list of all API endpoints, their methods, required parameters, and expected responses:

- **POST /api/auth/register**
    - Description: Register a new user.
    - Body: `{ "username": string, "email": string, "password": string }`
    - Response: `{ "id": string, "username": string, "email": string, "token": string }`

- **POST /api/auth/login**
    - Description: Login an existing user.
    - Body: `{ "username": string, "password": string }`
    - Response: `{ "id": string, "username": string, "email": string, "token": string }`
-   **GET /api/auth/me**
    - Description: Get current logged in user info
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `{ "id": string, "username": string }`

- **POST /api/goals**
    - Description: Create a new fitness goal.
    - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "description": string, "target": number, "progress": number }`
    - Response: `{"_id": string, "user": string, "description": string, "target": number, "progress": number, "createdAt": string, "updatedAt": string, "__v": number }`

- **GET /api/goals**
    - Description: Get all goals for the logged in user.
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `[{"_id": string, "user": string, "description": string, "target": number, "progress": number, "createdAt": string, "updatedAt": string, "__v": number }]`
    
- **PUT /api/goals/:id**
    - Description: Update an existing goal.
    - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "description": string, "target": number, "progress": number }`
    - Response: `{"_id": string, "user": string, "description": string, "target": number, "progress": number, "createdAt": string, "updatedAt": string, "__v": number }`

- **DELETE /api/goals/:id**
    - Description: Delete an existing goal.
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `{ "message": string }`

### 🔒 Authentication
Explain the authentication process in detail:

1.  Register a new user or login to receive a JWT token.
2.  Include the token in the Authorization header for all protected routes:
    ```
    Authorization: Bearer YOUR_JWT_TOKEN
    ```
3. Token expiration is set to 1 hour, after which you need to login again.

### 📝 Examples
Provide comprehensive examples of API usage, including request and response bodies:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username": "fitnessuser", "email": "user@example.com", "password": "securepass123"}'

# Response
{
  "id": "user123",
  "username": "fitnessuser",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# Login user
curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username": "fitnessuser", "password": "securepass123"}'
    
# Response
{
  "id": "user123",
  "username": "fitnessuser",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
    
# Get current user
curl -X GET http://localhost:5000/api/auth/me \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Response
{
    "id": "user123",
    "username": "fitnessuser"
}

# Create a new goal
curl -X POST http://localhost:5000/api/goals \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
-d '{"description": "Run 5 miles", "target": 5, "progress": 0}'

# Response
{
 "_id": "goal123",
 "user": "user123",
 "description": "Run 5 miles",
 "target": 5,
 "progress": 0,
 "createdAt": "2023-01-01T00:00:00.000Z",
 "updatedAt": "2023-01-01T00:00:00.000Z",
 "__v": 0
}

```


> [!NOTE]
> ## 📜 License & Attribution
> 
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
> 
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
> 
> No human was directly involved in the coding process of the repository: fitness-tracker-app
> 
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>