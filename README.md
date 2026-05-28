# Caption Generator

A full-stack web application that lets users upload images and receive AI-generated captions in a tapori / dark-humor style, alternating between Hindi and English.

## Tech Stack

### Frontend

- **React 19** — UI library
- **Vite** — Build tool & dev server
- **React Context API** — State management (auth)
- **CSS** — Custom styling

### Backend

- **Express.js 5** — HTTP framework
- **MongoDB** + **Mongoose** — Database & ODM
- **JWT** (JSON Web Tokens) — Authentication via HTTP-only cookies
- **bcryptjs** — Password hashing
- **Multer** — Multipart file upload handling
- **Google Gemini AI** (`gemini-3-flash-preview`) — Caption generation
- **ImageKit** — Cloud image storage & CDN

---

## Project Structure



caption_generator/
├── backend/
│   ├── server.js                          # Entry point: connects to DB and starts Express
│   ├── .env                               # Environment variables (excluded from git)
│   ├── package.json
│   └── src/
│       ├── app.js                         # Express app config (CORS, cookies, routes)
│       ├── db/
│       │   └── db.js                      # MongoDB connection via Mongoose
│       ├── controllers/
│       │   ├── auth.controller.js         # Register & login logic
│       │   └── post.controller.js         # Image upload + caption generation handler
│       ├── middleware/
│       │   └── auth.middleware.js          # JWT cookie verification middleware
│       ├── models/
│       │   ├── user.model.js              # User schema (username, password)
│       │   └── post.model.js              # Post schema (image URL, caption, user ref)
│       ├── router/
│       │   ├── auth.routes.js             # /api/auth routes
│       │   └── posts.routes.js            # /api/posts routes
│       └── services/
│           ├── ai.service.js              # Google Gemini caption generation
│           └── storage.service.js         # ImageKit upload service
│
└── frontend/
├── index.html
├── vite.config.js
├── package.json
└── src/
├── main.jsx                       # React entry point
├── App.jsx                        # Root component with auth routing
├── App.css
├── index.css
├── assets/
│   └── hero.png
├── context/
│   └── AuthContext.jsx            # Auth state (login, register, logout)
├── pages/
│   ├── Login.jsx                  # Login form
│   ├── Register.jsx               # Registration form
│   └── Dashboard.jsx              # Image upload + generated caption display
├── services/
│   └── api.js                     # HTTP client for backend API calls
└── styles/
├── Auth.css                   # Styles for Login & Register
└── Dashboard.css              # Styles for Dashboard


---

## Features

- **User Authentication** — Register and login with username/password. Passwords are hashed with bcrypt. Auth state persisted via JWT stored in HTTP-only cookies.
- **Image Upload** — Upload any image from the dashboard.
- **AI Caption Generation** — Each uploaded image is sent to Google Gemini, which returns a short, aesthetic caption with hashtags and emojis in a tapori / dark-humor tone, in either Hindi or English.
- **Cloud Image Storage** — Uploaded images are stored on ImageKit CDN.
- **Post History** — Previously generated captions are displayed in a card grid on the dashboard.

---

## API Endpoints

| Method | Endpoint           | Description                    | Auth Required |
|--------|--------------------|--------------------------------|:---:|
| POST   | `/api/auth/register` | Register a new user          | No  |
| POST   | `/api/auth/login`    | Login and receive JWT cookie | No  |
| POST   | `/api/posts`         | Upload image & generate caption | Yes |

---

## Environment Variables

Create a `.env` file inside `backend/` with the following keys:

```env
# MongoDB connection string
MONGO=mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname

# JWT signing secret
SECRET_KEY=your_jwt_secret_key

# Google Gemini API key (used automatically via @google/genai)
GEMINI_API_KEY=your_gemini_api_key

# ImageKit credentials
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL=https://ik.imagekit.io/your_imagekit_id


Getting Started
Prerequisites
Node.js (v18+)
MongoDB (local or Atlas)
Google Gemini API key — Get one here
ImageKit account — Sign up
Installation
Clone the repository

git clone <repo-url>
cd caption_generator

Install backend dependencies

cd backend
npm install

Set up environment variables

Create backend/.env and populate it using the template above.

Install frontend dependencies

cd ../frontend
npm install

Running the Application
Start the backend server (port 3000)

cd backend
node server.js

Start the frontend dev server (port 5173)

cd frontend
npm run dev

Open http://localhost:5173 in your browser.

How It Works
User registers or logs in → JWT token is set as an HTTP-only cookie.
On the dashboard, the user selects an image file.
Frontend sends the image as multipart/form-data to POST /api/posts.
Backend middleware verifies the JWT cookie.
The image buffer is converted to Base64 and sent to Google Gemini AI.
Gemini returns a generated caption.
The image is uploaded to ImageKit using the ImageKit SDK.
A new post document (image URL + caption + user reference) is saved to MongoDB.
The response (post object) is returned to the frontend and displayed in the posts grid.
Key Dependencies
Backend
Package	Purpose
express	Web framework
mongoose	MongoDB ODM
@google/genai	Google Gemini AI SDK
imagekit	ImageKit upload SDK
bcryptjs	Password hashing
jsonwebtoken	JWT creation & verification
multer	File upload handling
cookie-parser	Cookie parsing
cors	Cross-origin requests
uuid	Unique filename generation
Frontend
Package	Purpose
react	UI library
react-dom	DOM rendering
vite	Build tool
@vitejs/plugin-react	Vite React plugin
License
This project is for personal/educational use.


---

This README covers the full project overview, architecture, setup instructions, API documentation, and a walkthrough of the data flow. You can copy it into a `README.md` at the root of your project. Let me know if you'd like any adjustments.
