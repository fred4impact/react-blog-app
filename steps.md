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