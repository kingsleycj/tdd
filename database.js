const mongoose = require('mongoose');
const constants = require('./constant');

const connectDB = async (uri = constants.DATABASE_URI) => {
    try {
        await mongoose.connect(uri);
        console.log('Database connected');
        return true;
    } catch (err) {
        console.error('Database connection error:', err);
        return false;
    }
};

module.exports = { connectDB, mongoose };