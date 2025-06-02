FROM node:23 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build
 
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]