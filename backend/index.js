import express, { request, response } from "express";
import { PORT ,mongoDBURL } from "./config.js"; // Make sure config.js exports PORT
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());
/*app.use(
    cors({
        origin: 'http://localhost:3000',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);*/

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('welcome'); 
});

app.use('/books',booksRoute);

 mongoose
    .connect(mongoDBURL)
    .then(()=> {
        console.log('app connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });

    })
    .catch((error) =>{
        console.log(error);
    });