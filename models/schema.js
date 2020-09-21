const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/packboxdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connection to DB successful"));

let models = {};

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Required field'],
        unique: true
    },
    emailid: {
        type: String,
        required: [true, 'Required field'],
    },
    password: {
        type: String,
        required: [true, 'Required field']
    },
    phoneno: {
        type: Number,
        required: [true, 'Required field']
    },
    bookings: {
        shiftingTo: {
            type: String
        },
        shiftingFrom: {
            type: String
        },
        shiftingType: {
            type: String
        }
    }
});

// creating User Model
models.userModel = new mongoose.model("userdetails", userSchema);

// Package Schema
let packageSchema = new mongoose.Schema({
    shiftingType: {
        type: String
    },
    description: {
        type: String
    }
});

models.packageModel = new mongoose.model("packagedetails", packageSchema);

models.packageDetails = [
    {
        shiftingType: "Home",
        description: "Depending upon BHK price varies => 1BHK : 3000 - 6000"
    },
    {
        shiftingType: "Vehicle",
        description: "Car/Bike, price within 10 km => Bike:4500, car:6500"
    }
];

module.exports = models;