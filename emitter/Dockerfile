FROM node:18-alpine
WORKDIR /app
COPY package.json tsconfig.json jest.config.js README.md ./
RUN npm install
COPY src ./src
COPY tests ./tests
RUN npm run build && npm test
CMD ["node", "dist/index.js"]
