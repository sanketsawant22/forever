# Base image
FROM node:18-alpine

# Create app folder inside container
WORKDIR /app

# Copy package.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose a port (change if needed)
EXPOSE 4000

# Start the app
CMD ["npm", "start"]