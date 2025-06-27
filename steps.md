# Bilarn DevOps Blog App: Project Overview & Setup Guide

## Purpose
This project demonstrates how to build a modern, full-stack blog application with a focus on DevOps best practices and cloud-native readiness. The app is designed to be resilient, observable, and easily deployable to environments like Kubernetes. It allows users to create, view, and manage blog posts with image uploads and Markdown support.

## Stack & Tools
- **Frontend:** React (with Material-UI for modern UI)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Image Uploads:** Multer (Express middleware)
- **Markdown Rendering:** marked (backend), react-markdown (frontend)
- **API Requests:** Axios
- **Dev Tools:** dotenv, cors, nodemon

## High-Level Steps to Build This App

### 1. Project Initialization
- Create a new directory for your project.
- Initialize a Node.js project with `npm init -y`.
- Install backend dependencies: `express`, `mongoose`, `multer`, `marked`, `dotenv`, `cors`.

### 2. Backend Setup
- Create `index.js` for the Express server.
- Set up MongoDB connection using Mongoose.
- Define a Blog model with fields: title, content (Markdown), imageUrl, createdAt.
- Implement CRUD API endpoints for blogs (`/blogs`).
- Add image upload support with Multer.
- Render Markdown to HTML on the backend for single blog fetches.
- Serve uploaded images as static files.

### 3. Frontend Setup
- Create a React app in a `frontend` folder using Create React App.
- Install frontend dependencies: `@mui/material`, `@emotion/react`, `@emotion/styled`, `axios`, `react-router-dom`, `react-markdown`.
- Clean up default files and set up a modern UI skeleton with MUI and React Router.
- Add a navigation bar, centered logo, and project heading/description visible on all pages.
- Implement the following pages:
  - **Home:** List all blogs with image, title, snippet, and delete button.
  - **Add Blog:** Form to create a new blog (title, content, image upload).
  - **View Blog:** Details page showing full blog post with rendered Markdown and image.
- Add a sticky footer and consistent color scheme.

### 4. Features Implemented So Far
- Add, view, and delete blog posts.
- Upload and display blog images.
- Write blog content in Markdown and render it as HTML.
- Modern, responsive UI with Material-UI.
- Sticky header and footer for consistent branding.
- All main features accessible via a clean navigation bar.

---

## How to Replicate This Project
1. **Clone or create a new directory.**
2. **Follow the backend setup steps** to create the Express/MongoDB API.
3. **Follow the frontend setup steps** to create the React UI.
4. **Run MongoDB locally** (e.g., with Homebrew on Mac: `brew services start mongodb-community`).
5. **Start the backend** (`node index.js` or `npx nodemon index.js`).
6. **Start the frontend** (`npm start` in the `frontend` folder).
7. **Access the app at** [http://localhost:3000](http://localhost:3000) and enjoy!

---

## How to Start the App

### 1. Start the Backend (API Server)
Navigate to your project root (where `index.js` is):
```bash
cd /path/to/bilarn-blog-app
# Install dependencies if you haven't already
npm install
# Start the backend server
node index.js
# Or, for auto-reload during development:
npx nodemon index.js
```

### 2. Start the Frontend (React UI)
Open a new terminal, then:
```bash
cd /path/to/bilarn-blog-app/frontend
# Install dependencies if you haven't already
npm install
# Start the React development server
npm start
```

- The backend will run on [http://localhost:5050](http://localhost:5050)
- The frontend will run on [http://localhost:3000](http://localhost:3000)

This guide should help anyone understand, replicate, and extend the Bilarn DevOps Blog App project.

---

## How to Start and Stop MongoDB on Mac

If you installed MongoDB using Homebrew, use these commands:

### Start MongoDB
```bash
brew services start mongodb-community
```

### Stop MongoDB
```bash
brew services stop mongodb-community
```

- You can check the status with:
```bash
brew services list
```
- MongoDB will run in the background as a service.

### View and Administer MongoDB with MongoDB Compass (GUI)

1. **Download MongoDB Compass:**
   - Go to [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass) and download the version for your operating system.
2. **Install and open MongoDB Compass.**
3. **Connect to your local MongoDB:**
   - Use the connection string:
     ```
     mongodb://localhost:27017
     ```
4. **Click "Connect".**
5. **Browse your databases, collections, and documents visually.**
   - You can view, edit, create, and delete data using the Compass UI.

This makes it easy to administer your MongoDB instance and is helpful for developing and managing future apps.

---

## Adding User Authentication with JWT (MongoDB Backend)

### Why JWT?
- Stateless, secure, and easy to implement.
- No server-side session storage needed.
- Works well with REST APIs and MongoDB.

### How JWT Auth Works
1. User registers or logs in (POST to `/register` or `/login`).
2. Backend checks credentials and, if valid, creates a JWT token and sends it to the frontend.
3. Frontend stores the token (in localStorage or a cookie).
4. Frontend sends the token in the `Authorization` header for protected API requests.
5. Backend verifies the token on each request to protected routes.

### Minimal Tech Stack
- Backend: Express, MongoDB, `jsonwebtoken`, `bcryptjs`
- Frontend: React (store token, manage auth state)

### Example: Minimal Backend Auth Setup

**Install dependencies:**
```bash
npm install express mongoose bcryptjs jsonwebtoken cors
```

**User model (models/User.js):**
```js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
module.exports = mongoose.model('User', userSchema);
```

**Register/Login routes (routes/auth.js):**
```js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash });
  await user.save();
  res.json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
  res.json({ token });
});

module.exports = router;
```

**Protecting routes:**
```js
const jwt = require('jsonwebtoken');
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, 'SECRET_KEY');
    req.user = payload;
    next();
  } catch {
    res.sendStatus(403);
  }
}
```

### Frontend (React)
- On login/register, store the token in localStorage.
- For protected API calls, send the token in the `Authorization` header:  
  `Authorization: Bearer <token>`
- Use React context or state to track if the user is logged in.

### Summary
- JWT with Express and MongoDB is the simplest, most flexible solution for your stack.
- You can add features like password reset, email verification, or social login later if needed.

---

## API Endpoints (Backend)

- **POST /auth/register** — Register a new user (body: `{ username, password }`). Returns `{ message, token }` and auto-logs in the user.
- **POST /auth/login** — Log in and receive a JWT token (body: `{ username, password }`). Returns `{ token }`.
- **POST /blogs** — Create a new blog post (protected, requires JWT in `Authorization` header`). Fields: `title`, `content`, `image` (multipart/form-data). Automatically sets `creator` from JWT.
- **GET /blogs** — Get all blog posts.
- **GET /blogs/:id** — Get a single blog post by ID.
- **PUT /blogs/:id** — Update a blog post (protected, requires JWT).
- **DELETE /blogs/:id** — Delete a blog post (protected, requires JWT).

For protected routes, include the JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Frontend Routes (React)

- **/** — Blog list (all blogs, public)
- **/blogs/:id** — Blog details (public)
- **/register** — Register page (redirects to dashboard if already logged in)
- **/login** — Login page
- **/dashboard** — User dashboard (shows username, user's blogs, create new blog button, logout)
- **/add** — Add new blog (protected, only for logged-in users)
- **/edit/:id** — Edit blog (protected, only for logged-in users and only for their own blogs)

**Frontend Logic:**
- Only show "Edit" and "Delete" buttons for blogs created by the logged-in user.
- Dashboard shows all blogs authored by the current user.
- Register and Login pages are hidden/redirected if already logged in.
- Add Blog and Edit Blog are protected routes (require login).
- JWT token is stored in localStorage and sent with all protected API requests.

---

## Proposed Next Features

1. **User-Specific Blog Management**
   - Only show "Edit" and "Delete" buttons for blogs created by the logged-in user.
   - On the dashboard, list all blogs authored by the current user.

2. **User Profile Page**
   - Allow users to update their username or password.
   - Show user info and their blog stats (number of posts, last post date, etc.).

3. **Comments System**
   - Allow logged-in users to comment on blog posts.
   - Display comments under each blog post, with the commenter's username and timestamp.

4. **Likes or Reactions**
   - Add a like button or emoji reactions to each blog post.
   - Show the number of likes/reactions per post.

5. **Password Reset**
   - Add a "Forgot Password?" feature to let users reset their password via email.

6. **Social Login**
   - Allow users to register/login with Google, GitHub, or other providers (using OAuth).

7. **Rich Text/Markdown Editor**
   - Replace the plain textarea with a rich Markdown editor (like react-markdown-editor-lite or react-quill).

8. **Blog Categories or Tags**
   - Let users assign categories/tags to their blogs.
   - Allow filtering blogs by category/tag.

9. **Image Gallery**
   - Allow users to upload multiple images per blog post.
   - Show an image gallery in the blog view.

10. **Admin Panel**
    - Add an admin role that can manage all users and blogs.
    - Admin can delete any blog or user.

11. **Notifications**
    - Show notifications for actions like successful post creation, comment replies, etc.

12. **Search and Filter**
    - Add a search bar to find blogs by title/content.
    - Filter blogs by date, author, or popularity.

This guide should help anyone understand, replicate, and extend the Bilarn DevOps Blog App project.

---

## Docker & Docker Compose Steps

### Build Images

# Backend (from project root)
docker build -t yourusername/bilarn-backend:latest .

# Frontend (from frontend directory)
cd frontend
docker build -t yourusername/bilarn-frontend:latest .

### Push Images to Docker Hub

docker login
docker push yourusername/bilarn-backend:latest
docker push yourusername/bilarn-frontend:latest

### Using Docker Compose (from project root)

# Build all images
docker-compose build

# Start all services
docker-compose up
# Or, to run in the background
docker-compose up -d

# Stop all services
docker-compose down

# View logs for all services
docker-compose logs -f

# Rebuild after code changes
docker-compose build
docker-compose up

---

- The frontend will be available at http://localhost:3000
- The backend API will be available at http://localhost:5000
- MongoDB will be available internally as mongo:27017 