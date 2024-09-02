FROM node:18 AS build

ARG EVIRONMENT=production

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build -- --configuration=$EVIRONMENT


FROM nginx:alpine

COPY --from=build /app/dist/todo-app/browser /usr/share/nginx/html

RUN sed -i 's/listen       80;/listen       3100;/' /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]