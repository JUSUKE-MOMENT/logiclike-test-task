FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD sh -c "npx prisma db push && npx prisma db seed && npm run dev"
