# API Routes Documentation

This document outlines all the available API routes in the custom Sweven Games API service.

## Authentication Routes

### POST `/auth/login`
Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER"
  }
}
```

### POST `/auth/register`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "userpassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "username",
  "firstName": "John",
  "lastName": "Doe",
  "role": "USER",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## User Routes

All user routes require authentication with a valid JWT token in the Authorization header.

### GET `/users`
Get all users.

**Response:**
```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### GET `/users/:id`
Get a specific user by ID.

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "username",
  "firstName": "John",
  "lastName": "Doe",
  "role": "USER",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### PATCH `/users/:id`
Update a specific user by ID.

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "username",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "USER",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### DELETE `/users/:id`
Delete a specific user by ID (soft delete).

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "username",
  "firstName": "John",
  "lastName": "Doe",
  "role": "USER",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## Game Routes

### GET `/games`
Get all active games.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Game Name",
    "description": "Game description",
    "imageUrl": "https://example.com/image.jpg",
    "genre": "Action",
    "platform": "PC",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### GET `/games/:id`
Get a specific game by ID.

**Response:**
```json
{
  "id": "uuid",
  "name": "Game Name",
  "description": "Game description",
  "imageUrl": "https://example.com/image.jpg",
  "genre": "Action",
  "platform": "PC",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### GET `/games/name/:name`
Get a specific game by name.

**Response:**
```json
{
  "id": "uuid",
  "name": "Game Name",
  "description": "Game description",
  "imageUrl": "https://example.com/image.jpg",
  "genre": "Action",
  "platform": "PC",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### POST `/games` (Admin only)
Create a new game.

**Request Body:**
```json
{
  "name": "New Game",
  "description": "Game description",
  "imageUrl": "https://example.com/image.jpg",
  "genre": "Action",
  "platform": "PC"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "New Game",
  "description": "Game description",
  "imageUrl": "https://example.com/image.jpg",
  "genre": "Action",
  "platform": "PC",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### PATCH `/games/:id` (Admin only)
Update a specific game by ID.

**Request Body:**
```json
{
  "name": "Updated Game Name"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Updated Game Name",
  "description": "Game description",
  "imageUrl": "https://example.com/image.jpg",
  "genre": "Action",
  "platform": "PC",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### DELETE `/games/:id` (Admin only)
Delete a specific game by ID (soft delete).

**Response:**
```json
{
  "id": "uuid",
  "name": "Game Name",
  "description": "Game description",
  "imageUrl": "https://example.com/image.jpg",
  "genre": "Action",
  "platform": "PC",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## Session Routes

### GET `/sessions`
Get all sessions.

**Response:**
```json
[
  {
    "id": "uuid",
    "userId": "user-uuid",
    "gameId": "game-uuid",
    "gameName": "Game Name",
    "status": "ACTIVE",
    "serverId": "server-uuid",
    "startTime": "2023-01-01T00:00:00.000Z",
    "endTime": "2023-01-01T01:00:00.000Z",
    "webrtcOffer": "offer-sdp",
    "webrtcAnswer": "answer-sdp",
    "iceCandidates": "[\"candidate1\", \"candidate2\"]",
    "metadata": "{\"resolution\": \"1080p\"}",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "username": "username",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
]
```

### GET `/sessions/:id`
Get a specific session by ID.

**Response:**
```json
{
  "id": "uuid",
  "userId": "user-uuid",
  "gameId": "game-uuid",
  "gameName": "Game Name",
  "status": "ACTIVE",
  "serverId": "server-uuid",
  "startTime": "2023-01-01T00:00:00.000Z",
  "endTime": "2023-01-01T01:00:00.000Z",
  "webrtcOffer": "offer-sdp",
  "webrtcAnswer": "answer-sdp",
  "iceCandidates": "[\"candidate1\", \"candidate2\"]",
  "metadata": "{\"resolution\": \"1080p\"}",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### GET `/sessions/user/:userId`
Get all sessions for a specific user.

**Response:**
```json
[
  {
    "id": "uuid",
    "userId": "user-uuid",
    "gameId": "game-uuid",
    "gameName": "Game Name",
    "status": "ACTIVE",
    "serverId": "server-uuid",
    "startTime": "2023-01-01T00:00:00.000Z",
    "endTime": "2023-01-01T01:00:00.000Z",
    "webrtcOffer": "offer-sdp",
    "webrtcAnswer": "answer-sdp",
    "iceCandidates": "[\"candidate1\", \"candidate2\"]",
    "metadata": "{\"resolution\": \"1080p\"}",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "username": "username",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
]
```

### POST `/sessions`
Create a new session.

**Request Body:**
```json
{
  "userId": "user-uuid",
  "gameId": "game-uuid",
  "gameName": "Game Name",
  "status": "PENDING",
  "serverId": "server-uuid"
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "user-uuid",
  "gameId": "game-uuid",
  "gameName": "Game Name",
  "status": "PENDING",
  "serverId": "server-uuid",
  "startTime": null,
  "endTime": null,
  "webrtcOffer": null,
  "webrtcAnswer": null,
  "iceCandidates": null,
  "metadata": null,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### PATCH `/sessions/:id`
Update a specific session by ID.

**Request Body:**
```json
{
  "status": "ACTIVE",
  "startTime": "2023-01-01T00:00:00.000Z"
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "user-uuid",
  "gameId": "game-uuid",
  "gameName": "Game Name",
  "status": "ACTIVE",
  "serverId": "server-uuid",
  "startTime": "2023-01-01T00:00:00.000Z",
  "endTime": null,
  "webrtcOffer": null,
  "webrtcAnswer": null,
  "iceCandidates": null,
  "metadata": null,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### DELETE `/sessions/:id`
Delete a specific session by ID.

**Response:**
```json
{
  "id": "uuid",
  "userId": "user-uuid",
  "gameId": "game-uuid",
  "gameName": "Game Name",
  "status": "ACTIVE",
  "serverId": "server-uuid",
  "startTime": "2023-01-01T00:00:00.000Z",
  "endTime": "2023-01-01T01:00:00.000Z",
  "webrtcOffer": "offer-sdp",
  "webrtcAnswer": "answer-sdp",
  "iceCandidates": "[\"candidate1\", \"candidate2\"]",
  "metadata": "{\"resolution\": \"1080p\"}",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## Subscription Routes

### GET `/subscriptions`
Get all subscriptions.

**Response:**
```json
[
  {
    "id": "uuid",
    "userId": "user-uuid",
    "planId": "plan-uuid",
    "startDate": "2023-01-01T00:00:00.000Z",
    "endDate": "2023-12-31T00:00:00.000Z",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "username": "username",
      "firstName": "John",
      "lastName": "Doe"
    },
    "plan": {
      "id": "plan-uuid",
      "name": "Premium Plan",
      "description": "Premium plan with all features",
      "price": 19.99,
      "duration": 365,
      "maxSessions": 5
    }
  }
]
```

### GET `/subscriptions/:id`
Get a specific subscription by ID.

**Response:**
```json
{
  "id": "uuid",
  "userId": "user-uuid",
  "planId": "plan-uuid",
  "startDate": "2023-01-01T00:00:00.000Z",
  "endDate": "2023-12-31T00:00:00.000Z",
  "isActive": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe"
  },
  "plan": {
    "id": "plan-uuid",
    "name": "Premium Plan",
    "description": "Premium plan with all features",
    "price": 19.99,
    "duration": 365,
    "maxSessions": 5
  }
}
```

### GET `/subscriptions/user/:userId`
Get all subscriptions for a specific user.

**Response:**
```json
[
  {
    "id": "uuid",
    "userId": "user-uuid",
    "planId": "plan-uuid",
    "startDate": "2023-01-01T00:00:00.000Z",
    "endDate": "2023-12-31T00:00:00.000Z",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "username": "username",
      "firstName": "John",
      "lastName": "Doe"
    },
    "plan": {
      "id": "plan-uuid",
      "name": "Premium Plan",
      "description": "Premium plan with all features",
      "price": 19.99,
      "duration": 365,
      "maxSessions": 5
    }
  }
]
```

### POST `/subscriptions`
Create a new subscription.

**Request Body:**
```json
{
  "userId": "user-uuid",
  "planId": "plan-uuid",
  "startDate": "2023-01-01T00:00:00.000Z",
  "endDate": "2023-12-31T00:00:00.000Z",
  "isActive": true
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "user-uuid",
  "planId": "plan-uuid",
  "startDate": "2023-01-01T00:00:00.000Z",
  "endDate": "2023-12-31T00:00:00.000Z",
  "isActive": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### PATCH `/subscriptions/:id`
Update a specific subscription by ID.

**Request Body:**
```json
{
  "isActive": false
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "user-uuid",
  "planId": "plan-uuid",
  "startDate": "2023-01-01T00:00:00.000Z",
  "endDate": "2023-12-31T00:00:00.000Z",
  "isActive": false,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### DELETE `/subscriptions/:id`
Delete a specific subscription by ID.

**Response:**
```json
{
  "id": "uuid",
  "userId": "user-uuid",
  "planId": "plan-uuid",
  "startDate": "2023-01-01T00:00:00.000Z",
  "endDate": "2023-12-31T00:00:00.000Z",
  "isActive": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## Plan Routes

### GET `/plans`
Get all active plans.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Premium Plan",
    "description": "Premium plan with all features",
    "price": 19.99,
    "duration": 365,
    "maxSessions": 5,
    "features": "[\"4K Streaming\", \"Priority Support\"]",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### GET `/plans/:id`
Get a specific plan by ID.

**Response:**
```json
{
  "id": "uuid",
  "name": "Premium Plan",
  "description": "Premium plan with all features",
  "price": 19.99,
  "duration": 365,
  "maxSessions": 5,
  "features": "[\"4K Streaming\", \"Priority Support\"]",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### GET `/plans/name/:name`
Get a specific plan by name.

**Response:**
```json
{
  "id": "uuid",
  "name": "Premium Plan",
  "description": "Premium plan with all features",
  "price": 19.99,
  "duration": 365,
  "maxSessions": 5,
  "features": "[\"4K Streaming\", \"Priority Support\"]",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### POST `/plans` (Admin only)
Create a new plan.

**Request Body:**
```json
{
  "name": "New Plan",
  "description": "New plan description",
  "price": 9.99,
  "duration": 30,
  "maxSessions": 2,
  "features": "[\"HD Streaming\"]"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "New Plan",
  "description": "New plan description",
  "price": 9.99,
  "duration": 30,
  "maxSessions": 2,
  "features": "[\"HD Streaming\"]",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### PATCH `/plans/:id` (Admin only)
Update a specific plan by ID.

**Request Body:**
```json
{
  "price": 14.99
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Premium Plan",
  "description": "Premium plan with all features",
  "price": 14.99,
  "duration": 365,
  "maxSessions": 5,
  "features": "[\"4K Streaming\", \"Priority Support\"]",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### DELETE `/plans/:id` (Admin only)
Delete a specific plan by ID (soft delete).

**Response:**
```json
{
  "id": "uuid",
  "name": "Premium Plan",
  "description": "Premium plan with all features",
  "price": 19.99,
  "duration": 365,
  "maxSessions": 5,
  "features": "[\"4K Streaming\", \"Priority Support\"]",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## WebSocket Routes

WebSocket connections are established at `/socket.io/` and use the Socket.IO protocol.

### Events

1. `join_session` - Join a streaming session
2. `webrtc_offer` - Send WebRTC offer
3. `webrtc_answer` - Send WebRTC answer
4. `webrtc_ice_candidate` - Send ICE candidate
5. `leave_session` - Leave a streaming session
6. `user_joined` - Notification when a user joins
7. `user_left` - Notification when a user leaves

## Health Check

### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-01-01T00:00:00.000Z",
  "service": "Sweven Games Custom API"
}
}