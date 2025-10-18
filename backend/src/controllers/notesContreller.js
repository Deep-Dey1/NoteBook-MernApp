export function getAllNotes(req, res){
    res.status(200).send("fetched the notes sucessfully !");
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