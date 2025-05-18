# Etapa de construcción
FROM node:18-alpine AS builder
WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copia el código y construye la aplicación
COPY . .
RUN npm run build

# Etapa de producción
FROM node:18-alpine AS runner
WORKDIR /app

# Ajusta entorno a producción
env NODE_ENV=production

# Copia los archivos necesarios desde el builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]