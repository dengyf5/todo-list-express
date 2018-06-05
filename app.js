import mongoose from "mongoose";
import Todo from "./models/todos/todos";

let data = {
    item: 'Go shopping',
    tag: 'life',
    description: 'buy some tissue and some food!', 
    userId: 233,
    level: 2,
    finishedTime: new Date('2018-06-06'),
    createTime: new Date(),
};


mongoose.connect('mongodb://localhost/todos');

Todo(data).save(err => {
    if(err) {
        console.log(`error!`);
    } else {
        console.log(`success!`)
    }
});