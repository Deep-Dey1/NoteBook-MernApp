//import express from "express";
const express = require("express")
const app = express();

app.get("/api/notes", (req,res) => {
	res.send("First API");
});

app.listen(5001, () =>{
	console.log("Server started on PORT: 5001");
});
