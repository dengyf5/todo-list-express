import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    id: Number,
    item: String,
    tag: String,
    description: String, 
    userId: Number,
    level: Number,
    finishedTime: Date,
    createTime: Date,
});


const Todo = mongoose.model('todolist',todoSchema);


export default Todo;