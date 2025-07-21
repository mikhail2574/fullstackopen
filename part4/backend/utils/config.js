require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = `mongodb+srv://mikhail2574:${process.env.mongodb_password}@cluster.8rjbn1y.mongodb.net/?retryWrites=true&w=majority&appName=cluster`;

module.exports = { MONGODB_URI, PORT };
