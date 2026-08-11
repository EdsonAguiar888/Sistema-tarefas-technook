FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Porta padrão do NestJS
EXPOSE 3000

# Comando para iniciar o NestJS
CMD ["npm", "run", "start:dev"]