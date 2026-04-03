# Multi-stage build for optimized production image

# Stage 1: Build
FROM node:18-alpine AS builder

LABEL stage=builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with cache optimization
RUN npm ci --only=production && \
  npm cache clean --force

# Copy source code
COPY . .

# Build React app
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

# Install serve to run the React static app
RUN npm install -g serve@^14.0.0 && \
  npm cache clean --force

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nextjs -u 1001

# Copy built app from builder stage
COPY --from=builder /app/build ./build

# Copy public assets if any
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Environment variables
ENV NODE_ENV=production \
  PORT=3000

# Start app with serve (serves static files with SPA routing)
CMD ["serve", "-s", "build", "-l", "3000"]
