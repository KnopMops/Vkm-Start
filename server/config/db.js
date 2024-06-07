const mongoose = require('mongoose');
require('dotenv').config();

function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log(`🔓 MongoDB: ${connection.host}`);
        });

        connection.on('error', () => {
            console.log(`🔐 Не удалось подключиться к MongoDB: ${error}`);
        });
    } catch (error) {
        console.log(`🔐 Не удалось подключиться к MongoDB: ${error}`);
    }
};

module.exports = connectDB;