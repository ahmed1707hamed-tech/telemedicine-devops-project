# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Run stage
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# ❗ ناخد بس الملفات المهمة
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["npm", "start"]