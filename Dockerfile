FROM node:18-alpine
WORKDIR /pm-api

# Install dependencies
COPY package*.json ./
RUN npm install --include=dev

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Expose port and run
EXPOSE 3000
CMD ["npm", "run", "dev"]