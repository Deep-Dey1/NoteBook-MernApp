//import express from "express";
const express = require("express")
const app = express();

app.get("/api/notes", (req,res) => {
	res.send("you got 20 notes");
});

app.post("/api/notes", (req,res) => {
	res.status(201).json({message:"Notes created sucessfully!"});
});

app.put("/api/notes/:id", (req,res) => {
	res.status(200).json({message:"Notes Updated Sucessfully!"});
});

app.delete("/api/notes/:id", (req,res) => {
	res.status(200).json({message:"Notes Updated Sucessfully!"});
});

app.listen(5001, () =>{
	console.log("Server started on PORT: 5001");
});
