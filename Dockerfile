# Use Node.js 18 alpine as base image
FROM node:18-alpine AS builder

# Install openssl for Prisma
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install dumb-init and openssl for Prisma
RUN apk add --no-cache dumb-init openssl

WORKDIR /app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy prisma schema
COPY prisma ./prisma/

# Copy generated Prisma client from builder
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Set ownership to nodejs user
RUN chown -R nodejs:nodejs /app

# Copy built application from builder
COPY --chown=nodejs:nodejs --from=builder /app/dist ./dist

# Copy startup script
COPY --chown=nodejs:nodejs start.sh ./
RUN chmod +x start.sh

# Set environment
ENV NODE_ENV=production

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3001

# Start the app with startup script
CMD ["./start.sh"]