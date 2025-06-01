FROM node:23 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build
 
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8888
CMD ["nginx", "-g", "daemon off;"]