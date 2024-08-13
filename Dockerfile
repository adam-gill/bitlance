FROM node:20
ARG DATABASE_URL

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

RUN DATABASE_URL=$DATABASE_URL npx prisma generate
RUN DATABASE_URL=$DATABASE_URL npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]