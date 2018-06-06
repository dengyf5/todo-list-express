import Todo from '../models/todo/todo'
import mongoose from 'mongoose'
import db from '../models/db'


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
    }
}

export default new Todos()