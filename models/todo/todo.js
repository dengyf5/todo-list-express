import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    item: String,
    tag: String,
    description: String, 
    userId: Number,
    level: Number,
    finishedTime: Date,
    createTime: Date,
});


const Todo = mongoose.model('todos',todoSchema);


export default Todo;