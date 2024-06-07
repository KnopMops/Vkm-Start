const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const router = require('./routes/index');
const cookiesParser = require('cookie-parser');
const { app, server } = require('./socket/index');

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
    optionsSuccessStatus : 200
}));
app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get('/', (request, response) => {
    response.json({
        message : `🚀 Сервер: Запущен\n📦 Порт: ${PORT || 8080}`,
    });
});

app.use('/api/v1',router)

server.listen(PORT, () => {
    console.log(`🚀 Сервер: Запущен\n📦 Порт: ${PORT || 8080}`);
    connectDB()
}); 