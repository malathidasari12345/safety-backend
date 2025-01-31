let mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGO_URI;

mongoose.connect(url)

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB server successfully");
})
db.on('error', (err) => {
    console.log("error occured" , err);
})
db.on('disconnected', () => {
    console.log("Disconnected to MongoDB server successfully");
})