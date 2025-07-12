# 🏠 Wanderlust - Airbnb Clone

A full-stack Airbnb clone built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring modern UI/UX design and comprehensive functionality for property listings, user authentication, and booking management.

![Wanderlust Airbnb Clone](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration & Login**: Secure authentication with JWT tokens
- **Session Management**: Persistent login sessions with cookies
- **User Profiles**: Personalized user experience with profile management
- **Password Security**: Bcrypt encryption for secure password storage

### 🏡 Property Listings
- **Create Listings**: Upload property details with images via Cloudinary
- **Edit Listings**: Modify existing property information
- **Delete Listings**: Remove properties with owner verification
- **Property Categories**: 15+ categories including Amazing Views, Beachfront, Cabins, Castles, etc.
- **Rich Property Details**: Title, description, location, price, amenities, and more

### 🔍 Search & Filtering
- **Location Search**: Find properties by city, country, or location
- **Category Filtering**: Filter by property types (Amazing Views, Arctic, Beachfront, etc.)
- **Advanced Filters**: 
  - Price range filtering
  - Property type filtering (Entire Home, Room, Other)
  - Essential amenities (WiFi, Pool, Parking)
- **Real-time Search**: Instant search results with dynamic filtering

### 📱 Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Interactive Elements**: Smooth animations and transitions
- **User-Friendly Navigation**: Easy-to-use navigation and menus

### 🗺️ Interactive Maps
- **Mapbox Integration**: Interactive maps showing property locations
- **Location Visualization**: Visual representation of property locations
- **Geographic Context**: Enhanced user experience with map views

### 💬 Reviews & Ratings
- **User Reviews**: Authenticated users can leave reviews
- **Rating System**: Comprehensive review and rating functionality
- **Review Management**: View and manage property reviews

### 🎨 Modern UI Components
- **Loading States**: Smooth loading animations with Lottie
- **Toast Notifications**: User feedback with react-hot-toast
- **Modal Dialogs**: Clean modal interfaces for forms and filters
- **Form Validation**: Comprehensive form validation with react-hook-form

## 🛠️ Tech Stack

### Frontend
- **React 19.0.0** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form handling and validation
- **Axios** - HTTP client for API requests
- **Mapbox GL** - Interactive maps
- **React Hot Toast** - Toast notifications
- **Ant Design** - UI component library
- **Lottie** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Passport.js** - Authentication middleware
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud image storage
- **Joi** - Data validation
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling

### Development Tools
- **ESLint** - Code linting
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/airbnb-clone-mern.git
   cd airbnb-clone-mern
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the backend directory:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=http://localhost:5173
   ```

   Create `.env` file in the frontend directory:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   VITE_MAPBOX_TOKEN=your_mapbox_access_token
   ```

5. **Start the Development Servers**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm start
   ```
   Server will run on: http://localhost:3000

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```
   Client will run on: http://localhost:5173

## 📖 Usage

### For Users
1. **Browse Properties**: Visit the homepage to see all available listings
2. **Search & Filter**: Use the search bar and filters to find specific properties
3. **View Details**: Click on any listing to see detailed information
4. **Create Account**: Sign up to access additional features
5. **Leave Reviews**: Authenticated users can leave reviews on properties

### For Hosts
1. **Create Account**: Sign up for a host account
2. **Add Listings**: Use the "Airbnb your home" button to create new listings
3. **Upload Images**: Add property photos via Cloudinary integration
4. **Manage Properties**: Edit or delete your listings as needed

## 🏗️ Project Structure

```
airbnb-clone-mern/
├── backend/
│   ├── controllers/     # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middlewares/    # Custom middleware
│   ├── utils/          # Utility functions
│   ├── joiSchemas/     # Validation schemas
│   └── uploads/        # File uploads
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── redux/      # State management
│   │   ├── config/     # Configuration files
│   │   ├── utils/      # Utility functions
│   │   └── assets/     # Static assets
│   └── public/         # Public assets
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/logout` - User logout
- `GET /auth/status` - Check authentication status

### Listings
- `GET /listings` - Get all listings
- `GET /listings/:id` - Get specific listing
- `POST /listings` - Create new listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

## 🎯 Key Features Implementation

### Image Upload with Cloudinary
- Secure cloud storage for property images
- Automatic image optimization
- CDN delivery for fast loading

### Real-time Search & Filtering
- Client-side filtering for instant results
- Server-side search capabilities
- Advanced filter combinations

### Responsive Design
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shukardeen**
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Airbnb](https://airbnb.com) for inspiration
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [Mapbox](https://mapbox.com) for mapping services
- [Cloudinary](https://cloudinary.com) for image management
- [Lottie](https://lottiefiles.com) for animations

## 📞 Support

If you have any questions or need support, please open an issue on GitHub or contact the maintainer.

---

⭐ **Star this repository if you found it helpful!** 