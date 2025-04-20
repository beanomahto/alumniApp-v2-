# Reunite - Alumni Connect Portal

![Project Structure](https://img.shields.io/badge/Project%20Structure-MERN%20Stack-blue)

**[Project link](https://aluminiapp-five.vercel.app/)** 

Reunite is a comprehensive alumni connection portal designed to help former students stay connected with their alma mater and fellow alumni. This platform facilitates networking, sharing updates, and maintaining professional relationships.

## Project Structure

The application follows a MERN stack architecture (MongoDB, Express.js, React, Node.js) with a clear separation between frontend and backend components.

### Backend Structure (`/backend`)

```
backend/
├── controllers/            # Business logic handlers
│   ├── authController.js    # Authentication logic
│   └── userController.js    # User management logic
├── middleware/             # Express middleware
│   └── authMiddleware.js    # Authentication middleware
├── models/                 # MongoDB data models
│   ├── Alumni.js           # Alumni-specific schema
│   ├── Post.js             # Post/content schema
│   └── User.js             # User schema
├── routes/                 # API route definitions
│   ├── authRoutes.js       # Authentication routes
│   └── userRoutes.js       # User management routes
├── src/config/
│   └── db.js               # Database connection setup
├── .env                    # Environment variables
├── .gitignore              
├── package.json            # Backend dependencies
├── package-lock.json       
└── server.js               # Main server entry point
```

### Frontend Structure (`/frontend`)

```
frontend/
├── public/                 # Static assets
│   └── site_vite.svg       # Application logo
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Directory.jsx   # Alumni directory component
│   │   ├── Feed.jsx        # News feed component
│   │   ├── Home.jsx        # Homepage component
│   │   ├── Login.jsx       # Login form component
│   │   ├── Navbar.jsx      # Navigation component
│   │   ├── Profile.jsx     # Profile component
│   │   └── SignUp.jsx      # Registration component
│   ├── pages/              # Page-level components
│   │   ├── DirectoryPage.jsx  # Directory page
│   │   ├── FeedPage.jsx    # Feed page
│   │   ├── LoginPage.jsx   # Login page
│   │   ├── ProfilePage.jsx # Profile page
│   │   └── SignUpPage.jsx  # Registration page
│   ├── App.css             # Main styles
│   ├── App.jsx             # Root component
│   ├── index.css           # Global styles
│   ├── main.jsx            # Application entry point
├── .env                    # Frontend environment variables
├── .gitignore              
├── eslint.config.js        # ESLint configuration
├── index.html              # Base HTML template
├── package.json            # Frontend dependencies
├── tailwind.config.js      # Tailwind CSS config
└── vite.config.js          # Vite build configuration
```

## Key Features

1. **User Authentication**
   - Secure login and registration system
   - JWT-based authentication
   - Protected routes

2. **Alumni Directory**
   - Searchable database of alumni
   - Filter by graduation year, department, etc.
   - Profile viewing capabilities

3. **News Feed**
   - Post updates and announcements
   - Like and comment functionality
   - Media sharing

4. **Profile Management**
   - Personal profile customization
   - Professional information tracking
   - Contact information management

5. **Networking Tools**
   - Connection requests
   - Messaging system
   - Event announcements

## Technology Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication

### Frontend
- **React**: JavaScript library for building UIs
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing

## Development Setup

### Backend Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and configure your environment variables.

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and configure your frontend environment variables.

4. Start the development server:
   ```bash
   npm run dev
   ```

## Configuration

Ensure you have the following environment variables configured:

**Backend (.env)**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d
```

**Frontend (.env)**
```
VITE_API_BASE_URL=http://localhost:5000
```



## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please contact the project maintainers.
