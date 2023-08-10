import express, { json, urlencoded } from 'express';
import cors from "cors";
import { connectPassport } from './utils/Provider.js'
import session from "express-session";
import passport from "passport";
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/errorMiddleware.js';


const app = express();

// CORS policy
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.json())
app.use(urlencoded({
    extended: true
}))

// Using Error Middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,

        cookie: {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: process.env.NODE_ENV === "development" ? false : true,
            sameSite: process.env.NODE_ENV === "development" ? false : "none",
        },
    })

);
app.use(cookieParser())

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

// connect google auth passport
connectPassport()

// import routes
import userRoute from './routes/user.js'
import orderRoute from './routes/order.js'

app.use('/api/user', userRoute)
app.use('/api/user', orderRoute)




// using error middleware
app.use(errorMiddleware)


export default app;

