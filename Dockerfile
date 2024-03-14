FROM node:20-alpine as build

WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build


FROM node:20-alpine as runner
ENV PORT=3000
ENV NODE_ENV=production

WORKDIR /app
COPY package.json ./
COPY --from=build /app/build ./
RUN yarn install --frozen-lockfile
EXPOSE 3000
CMD ["node", "./server.js"]
