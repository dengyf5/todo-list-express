import Todo from '../models/todo/todo'
import mongoose from 'mongoose'
import db from '../models/db'



class Todos {
    constructor() {
        this.add = this.add.bind(this)
    }


    /**
     * add some item to the database
     * and return a promise
     * @param {*} item
     * @returns Promise
     * @memberof Todos
     */
    add(item) {
        return new Promise((resolve, rejects) => {
            const todo = Todo(item)
            todo.save(err => {
                if (err) {
                    rejects(err)
                } else {
                    resolve()
                }
            })
        })
    }

    find(item, callback = () => {}) {

    }
}

export default new Todos()