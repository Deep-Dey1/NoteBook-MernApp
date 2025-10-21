import Note from "../models/Note.js";
export async function getAllNotes(req, res){
    // res.status(200).send("fetched the notes sucessfully !"); // initially to learn how it works
    try{
        const notes = await Note.find().sort({createdAt:-1}); // sort to show the newest first using -1 and oldest first using 1
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes controller",error);
        res.status(500).json({message:"Internal server error"})

    }
}

export async function getNoteById(req,res){
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message: "Note not found"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller",error);
        res.status(500).json({message:"Internal server error"})
    }
}

export async function createNote(req , res){
    // res.status(201).json({message: "Notes created Sucessfully !"}); // initially to test the controller working 
    try{
        const { title, content } = req.body;
        const note = new Note({title,content});
        const savedNote = await note.save();
        // res.status(201).json({message: "NOte Created Sucessfully"});
        res.status(201) .json(savedNote); 
    } catch (error){
        console.error("Error in createNotes controller",error);
        res.status(500).json({message:"Internal server error"})
    }
}

export async function updateNote(req,res){
	// res.status(200).json({message:"Notes Updated Sucessfully!"}); // initially to test the working of the controller
    try {
        const { title, content } = req.body;
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {
                new: true,
            }
        );
        if(!updateNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json(updateNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function deleteNote(req,res){
	// res.status(200).json({message:"Notes Updated Sucessfully!"}); // initiall code to check the working of the controller 
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json(
            {
                message: "Below Note Deleted Sucessfully !",
                deleteNote
            }
        );
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }

}