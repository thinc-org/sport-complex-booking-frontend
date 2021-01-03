FROM node:14-alpine AS build
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn --frozen-lockfile
COPY . .
ARG stage
RUN mv .env.$stage .env
RUN rm .env.* || true
# ENV CI=true
RUN yarn build

FROM nginx:1.19.5-alpine AS nginx
COPY --from=build /app/build /var/www
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
