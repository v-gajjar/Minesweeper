FROM node:26-alpine as build

workdir /app

copy package*.json ./

run npm install

copy . .

run npm run build

from; nginx:alpine

copy --from=build /app/dist /usr/share/nginx/html

expose 80

cmd ["nginx", "-g", "daemon off;"]