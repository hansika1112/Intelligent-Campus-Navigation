# Intelligent Campus Navigation & Mobility Assistant

An intelligent campus navigation and mobility platform designed to help students, faculty members, staff, and visitors find campus facilities and navigate between university locations through an interactive map and accessible navigation interface.

## Overview

Navigating a large university campus can be challenging, especially for new students, visitors, and people who need accessible routes. This project provides a centralized platform for exploring campus locations, finding facilities, and viewing navigation guidance.

The application combines an interactive map, a facility finder, route navigation preferences, and assistance modules in a web-based interface.

## Key Features

### 1. Interactive Campus Map
- Displays campus locations on an interactive map.
- Uses OpenStreetMap map tiles.
- Shows campus facilities with location markers.
- Allows users to explore and select locations.

### 2. Campus Facility Finder
- Browse available campus facilities.
- Search locations by name.
- Filter facilities by category.
- View facility information and accessibility indicators.

### 3. Smart Campus Navigation
- Select a starting location and destination.
- Generate route guidance using the campus path graph.
- Display route instructions.
- Support navigation preferences such as avoiding stairs and restricted paths.

### 4. Accessibility Support
- Identify locations marked as wheelchair accessible.
- Provide accessibility-related route preferences.
- Help users explore facilities based on accessibility information.

### 5. AI Assistant
- Includes an assistant interface for campus-related guidance.
- Designed to help users find information about campus navigation and facilities.
- Currently implemented as a prototype interface.

### 6. Emergency Assistance
- Includes an emergency assistance interface.
- Displays emergency-related campus information and assistance options.
- Currently a prototype and not connected to a live emergency-response service.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Styling | Tailwind CSS, CSS |
| Routing | React Router DOM |
| Maps | Leaflet, React Leaflet, OpenStreetMap |
| Icons | React Icons |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| API Communication | REST API |
| Development Tools | VS Code, Git, GitHub |

## Project Architecture

The application follows a frontend-backend architecture.

- **Frontend:** Provides the user interface, interactive map, facility finder, and navigation pages.
- **Backend:** Provides API endpoints and handles communication with the database.
- **Database:** Stores campus location and facility information.
- **Map Layer:** Uses Leaflet and OpenStreetMap to display campus locations.

## Project Structure

```text
Intelligent-Campus-Navigation/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   └── locationRoutes.js
│   ├── models/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── CampusMap.jsx
│   │   │   ├── CampusMarker.jsx
│   │   │   ├── FacilityFinder.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── RouteInstructions.jsx
│   │   ├── data/
│   │   │   ├── campusLocations.js
│   │   │   └── campusPaths.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── MapPage.jsx
│   │   │   ├── NavigationPage.jsx
│   │   │   ├── AssistantPage.jsx
│   │   │   └── EmergencyPage.jsx
│   │   ├── services/
│   │   │   ├── locationService.js
│   │   │   └── routingService.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB Atlas account or a MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/hansika1112/Intelligent-Campus-Navigation.git

cd Intelligent-Campus-Navigation
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
```

Replace the placeholder with your own MongoDB connection string. Never commit your actual `.env` file or database credentials.

Start the backend:

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:5001
```

### 3. Set Up the Frontend

Open a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will display the local development URL, usually:

```text
http://localhost:5173
```

Open that URL in your browser.

## API Information

The backend exposes the following location endpoint:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/locations` | Retrieves campus locations |

The backend base URL is:

```text
http://localhost:5001
```

Example request:

```bash
curl http://localhost:5001/api/locations
```

## Navigation and Data Notes

- Campus location records are stored in MongoDB and retrieved through the backend API.
- The navigation module uses a predefined campus path graph for route calculation.
- The campus coordinates and path graph are sample project data and should be validated against the actual campus before real-world deployment.
- Route results should be treated as demonstration guidance, not verified pedestrian directions.
- Wheelchair accessibility and other facility attributes depend on the available location data.

## Current Project Scope

This project provides a working web application with campus mapping, location retrieval, facility discovery, navigation interfaces, and supporting assistance modules.

Some features, including the AI assistant and emergency assistance, are prototype implementations. The application is not currently a live emergency-response system.

## Future Enhancements

- Integrate verified campus maps and pedestrian pathways.
- Improve real-time pedestrian route calculation.
- Add live campus updates and location services.
- Integrate a production-ready AI assistant.
- Connect emergency assistance to authorized campus response services.
- Expand accessibility information and route validation.
- Add user authentication and personalized preferences.

## Contributors

**Hansika Gehlot**  
Project Developer

GitHub: [@hansika1112](https://github.com/hansika1112)

## Repository

[Intelligent Campus Navigation & Mobility Assistant](https://github.com/hansika1112/Intelligent-Campus-Navigation)

---

*Developed as an academic project to explore intelligent campus mobility, interactive mapping, and accessible navigation.*
