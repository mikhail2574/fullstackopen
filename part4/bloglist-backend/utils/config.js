require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = `mongodb+srv://mikhail2574:${process.env.NODE_ENV === "test" ? process.env.TEST_MONGODB_PASSWORD : process.env.MONGODB_PASSWORD}@cluster.8rjbn1y.mongodb.net/?retryWrites=true&w=majority&appName=cluster`;

module.exports = { MONGODB_URI, PORT };
