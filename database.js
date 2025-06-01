const mongoose = require('mongoose');
const constants = require('./constant');

const connectDB = async (uri = constants.DATABASE_URI) => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

module.exports = { connectDB, mongoose };