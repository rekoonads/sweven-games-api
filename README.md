# Sweven Games Custom API Service

This is a custom API service for the Sweven Games cloud gaming platform built with NestJS and Prisma.

## Features

- User management
- Game session handling
- Subscription management
- WebRTC signaling via WebSocket
- Authentication with JWT
- RESTful API design
- PostgreSQL database with Prisma ORM
- Docker support

## Tech Stack

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [PostgreSQL](https://www.postgresql.org/) - Open source relational database
- [Socket.IO](https://socket.io/) - Real-time communication
- [JWT](https://jwt.io/) - JSON Web Tokens for authentication

## Prerequisites

- Node.js 16+
- npm or yarn
- PostgreSQL (or use Docker)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd backend-services/custom-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and modify as needed:

```bash
cp .env.example .env
```

Update the values in the `.env` file:

```
DATABASE_URL="postgresql://username:password@localhost:5432/sweven_games?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
```

### 4. Set up the database

Make sure PostgreSQL is running, then run the Prisma migrations:

```bash
npx prisma migrate dev --name init
```

### 5. Generate Prisma client

```bash
npx prisma generate
```

### 6. Run the development server

```bash
npm run start:dev
```

The server will start on http://localhost:3001

## Using Docker

### Start services with Docker Compose

```bash
docker-compose up -d
```

This will start both the PostgreSQL database and the API service.

### Run Prisma migrations in Docker

```bash
docker-compose exec api npx prisma migrate dev --name init
```

## API Documentation

For detailed API routes documentation, see [API_ROUTES.md](API_ROUTES.md).

### Swagger Documentation

When the server is running, you can access the Swagger API documentation at:

```
http://localhost:3001/api
```

## Project Structure

```
src/
├── auth/            # Authentication module
├── games/           # Games module
├── plans/           # Subscription plans module
├── prisma/          # Prisma module
├── sessions/        # Game sessions module
├── subscriptions/   # Subscriptions module
├── users/           # Users module
├── websocket/       # WebSocket gateway for WebRTC signaling
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start the application in development mode with hot-reload
- `npm run start:debug` - Start the application in debug mode
- `npm run start:prod` - Start the application in production mode
- `npm run build` - Build the application
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run Prisma migrations
- `npm run prisma:studio` - Open Prisma Studio

## Database Schema

The database schema is defined in [prisma/schema.prisma](prisma/schema.prisma) and includes:

- Users
- Games
- Sessions
- Subscriptions
- Plans

## WebRTC Signaling

WebRTC signaling is handled via WebSocket using Socket.IO. The WebSocket gateway is implemented in [src/websocket/websocket.gateway.ts](src/websocket/websocket.gateway.ts).

## Authentication

The API uses JWT for authentication. To access protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.