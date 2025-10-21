import express from "express";
//const express = require("express")
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
// const notesRoutes = require("./routes/notesRoutes.js")
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
connectDB();

// middleware we needed
// creating during the building of the create node controller
app.use(express.json()); // this is middle ware

// now genrating the console log in the backend server using the middle ware 
app.use((req,res,next) =>{
	console.log("Server got a New Request : ");
	console.log(`Req methode is ${req.method} & Req URL is ${req.url}`);
	next();
});


app.use("/api/notes", notesRoutes)

app.listen(PORT, () =>{
	console.log("Server started on PORT:", PORT);
});
