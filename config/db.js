const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://chat-app:chatapp20@chat-app-pcbz4.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
module.exports = client;                 
