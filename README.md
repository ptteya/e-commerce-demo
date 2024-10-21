# HOMELY - Furniture E-Commerce Website

![React](https://img.shields.io/badge/React-36454F?style=for-the-badge&logo=react)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Javascript](https://img.shields.io/badge/Javascript-gray?style=for-the-badge&logo=javascript)
![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)

HOMELY is a personal project that showcases the core features of a furniture e-commerce platform. This project serves as a practical exercise in full-stack development.

## Features

- User Authentication: Register/Login with JWT and bcrypt.
- Furniture Catalog: Browse and filter furniture items by category, price range, color and keyword search.
- Favorite Items: Like/unlike items as a guest or registered user.
- Shopping Cart: Add items to the cart and checkout (accessible to both guests and users).
- Admin Functionality: Manage furniture (CRUD operations) and user roles (assign roles as user or admin).
- Sample data is added at server startup, including 10 furniture items and the following user accounts:
  - User: `peter@abv.bg` / `Peter123`
  - Admin: `admin@abv.bg` / `Admin123`

## Installation

Before you get started, ensure you have the following installed:

- **Node.js** and **npm**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Download MongoDB](https://www.mongodb.com/try/download/community)

### 1. **Clone the Repository**:

Run the following commands in your terminal to clone the repository:
```bash
git clone https://github.com/ptteya/e-commerce-demo.git
cd e-commerce-demo
```

### 2. Start the Server
Navigate to the server directory and install the dependencies:
  ```bash
  cd server
  npm install
  ```

Set up environment variables:
  - Create a `.env` file in the `/server` directory and add the necessary environment variables.
  - You can refer to the `.env.example` file for guidance.

Start the Server:
  ```bash
  npm start
  ```

> The default endpoint for handling API requests is http://localhost:5000.

### 3. Run the Client
Open a new terminal window, navigate to the `client` directory, install the dependencies and then start the application:
```bash
cd client
npm install
npm start
```
> Client runs on http://localhost:3000.

## API Documentation
For detailed information about the API routes, including request and response formats, refer to the [API Routes Documentation](API_ROUTES.md).
