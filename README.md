# Spotify Clone

A full-stack Spotify Clone application featuring a modern React frontend and a Node.js/Express backend. This project demonstrates authentication, music streaming, playlist management, and admin features.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication (with Clerk)
- Browse, search, and play songs
- Create and manage playlists
- Admin panel for managing songs and albums
- Responsive UI with modern design

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Authentication:** Clerk
- **Other:** ESLint, Prettier

## Project Structure
```
SpotifyClone/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   └── middleware/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── README.md
└── ...
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/SpotifyClone.git
   cd SpotifyClone
   ```
2. **Install dependencies for both frontend and backend:**
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

### Running the App
**Start the backend:**
```sh
cd backend
npm run dev
```
**Start the frontend:**
```sh
cd frontend
npm run dev
```

The frontend will typically run on [http://localhost:5173](http://localhost:5173) and the backend on [http://localhost:3000](http://localhost:3000).

## Available Scripts
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

## Environment Variables
Create a `.env` file in both `frontend` and `backend` directories. Example variables:

**Backend:**
```
ADMIN_EMAIL=your-admin@email.com
CLERK_SECRET_KEY=your-clerk-secret
```
**Frontend:**
```
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)