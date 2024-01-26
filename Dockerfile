FROM node:14-alpine AS x86
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["sh", "-c", "ulimit -v 1500000 && ulimit -m 1500000 && ulimit -c unlimited && node index.js"]

FROM node:14-alpine AS arm
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["sh", "-c", "ulimit -v 1500000 && ulimit -m 1500000 && ulimit -c unlimited && node index.js"]

FROM scratch AS final
COPY --from=x86 / /
COPY --from=arm / /
