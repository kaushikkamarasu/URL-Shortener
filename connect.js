const mongoose = require("mongoose");

async function handleMongoConnection(url){
    //console.log("MongoDB connection established");
    return mongoose.connect(url)
}

module.exports = {
    handleMongoConnection,
};