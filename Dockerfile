FROM node:24 AS base
WORKDIR /usr/local/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

FROM base AS dev
CMD ["npm", "run", "start:dev"]

FROM base AS build
RUN npm run build

FROM base AS final
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --production && \
    npm cache clean --force
COPY --from=build /usr/local/app/dist ./dist
COPY public ./public
EXPOSE 4001
CMD ["npm", "run", "start:prod"]
