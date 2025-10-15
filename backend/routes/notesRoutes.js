import express from "express";

//const express = require("express")

const router = express.Router();

router.get("/",(req, res) => {
    res.status(200).send("fetched the notes sucessfully !");
});

router.post("/",(req , res) => {
    res.status(201).json({message: "Notes created Sucessfully !"});
});

router.put("/:id", (req,res) => {
	res.status(200).json({message:"Notes Updated Sucessfully!"});
});

router.delete("/:id", (req,res) => {
	res.status(200).json({message:"Notes Updated Sucessfully!"});
});

export default router;
