import express from "express";

//const express = require("express")
import { createNote, deleteNote, getAllNotes, updateNote } from "../controllers/notesContreller.js";

const router = express.Router();

router.get("/",getAllNotes);
router.post("/",createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);

export default router;
