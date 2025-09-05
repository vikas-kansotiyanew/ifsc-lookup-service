# IFSC Code Lookup Service

A production-ready microservice for looking up Indian Financial System Code (IFSC) details with caching and database persistence.

## Features

- 🔍 IFSC code validation and lookup
- 💾 MySQL database storage with Sequelize ORM
- 🚀 Redis caching for improved performance
- 📱 Responsive React frontend with dark theme
- 🐳 Docker containerization
- ⚡ Automatic data freshness checking
- 🔄 Fallback to external APIs when needed

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

- Docker and Docker Compose
- Node.js 18+ (for local development)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ifsc-lookup-service