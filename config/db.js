require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const mongoDB = process.env.DB_URL;

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000
};

mongoose.connect(mongoDB, options)
.then(() =>  {
    console.log("Connected to Mongo client");
})
.catch(err => {
    console.error(err);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
    console.log("Connecting to database...");
});

module.exports = db;