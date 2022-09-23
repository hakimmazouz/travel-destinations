const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_CONNECTION_URI);

module.exports = client.db("travel-app");
