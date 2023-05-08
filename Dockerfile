FROM node:alpine

COPY . /app
WORKDIR /app
RUN npm ci

ENV PORT=8080
EXPOSE $PORT

CMD ["npm", "start"]