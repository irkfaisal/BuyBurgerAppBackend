import app from './app.js'
import connectDB from "./config/database.js";
import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;


// connect DB
connectDB(DATABASE_URL);

app.get("/", (req, res, next) => {
    res.send("<h1>Working</h1>");
});

// SERVER 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`)
})