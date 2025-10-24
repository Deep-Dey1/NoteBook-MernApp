import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Protect all note routes - require authentication
router.get("/", protect, getAllNotes);
router.get("/:id", protect, getNoteById);
router.post("/", protect, createNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;
