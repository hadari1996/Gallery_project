import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";


dotenv.config();

const app= express();
const PORT=process.env.PORT;
const MONGO_URI=process.env.MONGO_URI;
mongoose.set('strictQuery', true);

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
mongoose.connect(MONGO_URI).then(()=>{
    console.log("Connected to DB")
}).catch((error)=>{
    console.log("mongoose Error")
    console.log(error.message);
})

import userRoutes from "./API/users/userRoutes"
app.use("/api/v1/users", userRoutes);
import imageRoutes from "./API/images/imageRoutes"
app.use("/api/v1/images", imageRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is listening in PORT ${PORT}`)
})