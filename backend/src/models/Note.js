import mongoose from "mongoode";
// Steps to create a model :
// 1: first need to create a schema for the model
// 2: second create a model based on that schema.

const noteSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {timestamps: true} // by default mongodb gives the created at and updated at timestamps
);
const Note = mongoose.model("Note", noteSchema);
export default Note;