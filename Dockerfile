FROM node:22-alpine
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install
RUN npm ci

# Copy source code
COPY . .

# Expose port 3000 for Nuxt dev server
EXPOSE 3000

# Run development server with hot reload
CMD ["npm", "run", "dev"]