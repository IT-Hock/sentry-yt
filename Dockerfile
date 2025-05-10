FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV YOUTRACK_URL=https://youtrack.example.com
ENV YOUTRACK_TOKEN=your-youtrack-token
ENV YOUTRACK_PROJECT=your-youtrack-project

EXPOSE 3000

CMD ["node", "dist/app.js"]