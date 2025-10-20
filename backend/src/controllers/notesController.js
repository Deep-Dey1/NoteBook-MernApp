import Note from "../models/Note.js";
export async function getAllNotes(req, res){
    // res.status(200).send("fetched the notes sucessfully !"); // initially to learn how it works
    try{
        const notes = await Note.find();
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes controller",error);
        res.status(500).json({message:"INternal server error"})

    }
}

export function createNote(req , res){
    res.status(201).json({message: "Notes created Sucessfully !"});
}

export function updateNote(req,res){
	res.status(200).json({message:"Notes Updated Sucessfully!"});
}

export function deleteNote(req,res){
	res.status(200).json({message:"Notes Updated Sucessfully!"});
}