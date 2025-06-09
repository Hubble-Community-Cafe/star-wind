# Build in a different image to keep the target image clean
FROM node:22 AS build
ENV NODE_ENV=development
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build
RUN npm ci --production

# Target image that will be run
FROM node:22-alpine AS target
ENV NODE_ENV=production

WORKDIR /app
COPY --from=build --chown=node /app/node_modules /app/node_modules
COPY --from=build --chown=node /app/dist /app

CMD [ "node", "src/index.js" ]
EXPOSE 3000