# Usa la imagen oficial de Node ligera
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copia todo el contenido del front
COPY . .

# Instala Express
RUN npm init -y && npm install express

# Expone el mismo puerto que usa tu server.js
EXPOSE 8080

# Comando de arranque
CMD ["node", "server.js"]
