FROM --platform=linux/amd64 nginx:alpine

LABEL name = "angular-frontend-developer-joyofenergy"

WORKDIR /app

COPY dist/angular-frontend-developer-joyofenergy/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]