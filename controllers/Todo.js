import Todo from '../models/todo/todo'
import mongoose from "mongoose";

class Todos {
    constructor() {
        this.add = this.add.bind(this);
    }

    add(item, callback = (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Success!');
        }
    }) {
        const todo = Todo(item);
        todo.save(err => callback(err));
        //mongoose.disconnect();
    }

    connect(url, opts) {
        mongoose.connect(url, opts);
    }
}

export default new Todos()