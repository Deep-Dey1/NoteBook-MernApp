import express from "express";
//const express = require("express")
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
// const notesRoutes = require("./routes/notesRoutes.js")
// import for the ratelimiter 
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// middleware we needed
// creating during the building of the create node controller
// to parse the json body
app.use(express.json()); // this is middle ware

// now genrating the console log in the backend server using the middle ware 
// our simple custom middleware
app.use((req,res,next) =>{
	console.log("Server got a New Request : ");
	console.log(`Req methode is ${req.method} & Req URL is ${req.url}`);
	next();
});

// middleware for the ratelimit 
app.use(rateLimiter);


app.use("/api/notes", notesRoutes)

// first connect to db and then listen from the port or dont start the server
connectDB().then(() =>{
	app.listen(PORT, () =>{
		console.log("Server started on PORT:", PORT);
	});
});


