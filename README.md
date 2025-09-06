# IFSC Code Lookup Service

A production-ready microservice for looking up Indian Financial System Code (IFSC) details with caching and database persistence.

## Features

- IFSC code validation and lookup
- MySQL database storage with Sequelize ORM
- Redis caching for improved performance
- Responsive React frontend with dark theme
- Automatic data freshness checking
- Fallback to external APIs when needed

## Tech Stack

### Backend
- Node.js with TypeScript
- Express.js framework
- MySQL with Sequelize ORM
- Redis for caching
- Axios for external API calls

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- Axios for API communication

## Prerequisites

- Node.js 18+
- MySQL 8.0+
- Redis

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/vikas-kansotiyanew/ifsc-lookup-service.git
   cd ifsc-lookup-service
   ```

2. **Setup MySQL and Redis using Docker (Recommended)**
   ```bash
   # Start MySQL and Redis containers
   docker run --name ifsc-mysql -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=ifsc_db -p 3306:3306 -d mysql:8.0
   docker run --name ifsc-redis -p 6379:6379 -d redis:7-alpine
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install

   # Create environment file
   cp .env.example .env
   # Edit .env with your configuration (see below)
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install

   # Create environment file
   cp .env.example .env
   # Edit .env with your configuration (see below)
   ```

5. **Start the application**
   ```bash
   # Terminal 1 - Start backend
   cd backend
   npm run dev

   # Terminal 2 - Start frontend
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api/health

## Environment Configuration

### Backend (.env)

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ifsc_db
DB_USER=root
DB_PASSWORD=rootpassword

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Application Configuration
NODE_ENV=development
PORT=3001
IFSC_FRESHNESS_DAYS=7
CACHE_TTL_SECONDS=300
EXTERNAL_API_BASE_URL=https://ifsc.razorpay.com
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Manual Database Setup (Alternative to Docker)

If you prefer not to use Docker, you can install MySQL and Redis manually:

### MySQL Setup
1. Install MySQL 8.0+ on your system
2. Create database: `CREATE DATABASE ifsc_db;`
3. Update backend/.env with your MySQL credentials

### Redis Setup
1. Install Redis on your system
2. Start Redis server
3. Update backend/.env if using non-default Redis configuration

## API Endpoints

### GET /api/ifsc/:ifsc
Fetch IFSC code details.

**Example:**
```bash
curl http://localhost:3000/api/ifsc/HDFC0CAGSBK
```

### GET /api/health
Health check endpoint.

## Project Structure

```
ifsc-lookup-service/
├── backend/
│   ├── src/
│   │   ├── config/                  
│   │   │   ├── database.config.ts   # Sequelize + MySQL setup
│   │   │   ├── redis.config.ts      # Redis client setup
│   │   │   └── index.ts
│   │   ├── controllers/             
│   │   │   ├── ifsc.controller.ts   # Handles /ifsc requests
│   │   │   └── health.controller.ts # Health check
│   │   ├── models/                  
│   │   │   ├── ifsc.model.ts        # Sequelize model for IFSC details
│   │   │   └── index.ts             # Export all models
│   │   ├── repositories/            
│   │   │   └── ifsc.repository.ts   # DB queries (via Sequelize)
│   │   ├── services/                
│   │   │   ├── ifsc.service.ts      # Business logic (cache → DB → API)
│   │   │   ├── cache.service.ts     # Redis caching logic
│   │   │   └── providers/           
│   │   │       ├── base.provider.ts     # Abstract provider class
│   │   │       ├── razorpay.provider.ts # Razorpay IFSC provider
│   │   │       └── provider.factory.ts  # Factory to choose provider
│   │   ├── middlewares/             
│   │   │   ├── error.middleware.ts      # Global error handler
│   │   │   ├── validation.middleware.ts # Request validation
│   │   │   ├── logger.middleware.ts     # Request logging
│   │   │   └── rateLimit.middleware.ts  # Rate limiting
│   │   ├── routes/                  
│   │   │   ├── ifsc.routes.ts       # /ifsc endpoints
│   │   │   ├── health.routes.ts     # /health endpoint
│   │   │   └── index.ts             # Register all routes
│   │   ├── utils/                   
│   │   │   ├── logger.ts            # Winston/Pino logger setup
│   │   │   ├── validators.ts        # Extra validation functions
│   │   │   └── constants.ts         # Constants (TTL, freshness window, etc.)
│   │   ├── types/                   
│   │   │   └── index.ts             # Shared TS types/interfaces
│   │   └── app.ts                   # Express app bootstrap
│   ├── .env.example                 
│   ├── package.json                 
│   ├── tsconfig.json                
│
├── frontend/                        
│   ├── src/
│   │   ├── components/              
│   │   │   ├── SearchBar.tsx        
│   │   │   ├── ResultCard.tsx       
│   │   │   ├── LoadingSpinner.tsx   
│   │   │   └── ErrorAlert.tsx       
│   │   ├── services/                
│   │   │   └── api.ts               # Axios/fetch wrapper
│   │   ├── types/                   
│   │   │   └── index.ts             
│   │   ├── hooks/                   
│   │   │   └── useDebounce.ts       
│   │   ├── App.tsx                  
│   │   ├── index.css                
│   │   └── main.tsx                 
│   ├── public/                      
│   ├── .env.example
│   ├── package.json                 
│   ├── tsconfig.json                
│   ├── vite.config.ts               
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   ├── index.html                   
│
├── .gitignore                       # Git ignore rules
├── .env.example                     
└── README.md
```

## Development

### Running in development mode

```bash
# Backend with hot reload
cd backend
npm run dev

# Frontend with hot reload
cd frontend
npm run dev
```

### Building for production

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

## Troubleshooting

1. **Port already in use**: Change PORT in backend/.env if 3000 is occupied
2. **Database connection issues**: Verify MySQL is running and credentials are correct
3. **Redis connection issues**: Verify Redis server is running

## License

MIT License - see LICENSE file for details.