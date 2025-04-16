FROM node:20-alpine

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install
# RUN rm -rf node_modules package-lock.json && npm install

COPY client ./

EXPOSE 3000

CMD ["npm", "run", "dev"]
