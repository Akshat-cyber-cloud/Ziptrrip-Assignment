# Productivity Dashboard - Full-Stack React & Express App

A full-stack task management application featuring a React Frontend (multi-page routing) and an Express.js Backend with JSON file data persistence.

## Architecture

- **Backend (`server/`)**: Express.js REST API running on port 5000. Data is saved asynchronously in `server/data/todos.json`.
- **Frontend (`client/`)**: React application powered by Vite and React Router DOM, featuring a custom dark theme (`Aeonik` font, curated color palette `#1B3C53`, `#234C6A`, `#456882`).

---

## Features & Pages

### 1. Multi-Page Routing
- **` / ` or ` /todos ` - Main Dashboard & Todos List Page**:
  - Task creation form (Title, Details, Category, Due Date, Importance flag).
  - Task filtering (All, Pending, Completed, Important).
  - Search bar for quick keyword filtering across task titles and descriptions.
  - Interactive cards to toggle task completion status, delete items, or view details.
- **` /todo?id=:id ` - Single Todo Item Detail Page**:
  - Reads `id` query parameter from the URL.
  - Fetches and displays full task details (Title, Notes, Category, Creation & Due Dates, Importance, Status).
  - Inline edit form to update task fields.
  - Quick action buttons to toggle completion, edit, or delete task with redirection back to list view.

### 2. Express Backend REST API (`/api/todos`)
- `GET /api/todos` - Retrieve all todo items (with search & filter parameters).
- `GET /api/todos/:id` - Retrieve single todo details by ID.
- `POST /api/todos` - Create a new todo item.
- `PUT /api/todos/:id` - Update existing todo item.
- `DELETE /api/todos/:id` - Delete a todo item.

---

## Running the Application Locally

### 1. Start the Express Backend Server
```bash
cd server
npm install
npm run dev
```
The server runs on `http://localhost:5000`.

### 2. Start the React Frontend Application
```bash
cd client
npm install
npm run dev
```
The frontend runs on `http://localhost:3000` (or `http://localhost:5173`) and automatically proxies `/api` calls to the Express server.
