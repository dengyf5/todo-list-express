import Todo from '../models/todo/todo'
import mongoose from 'mongoose'
import db from '../models/db'
import Item from "./item";


class List {
    constructor() {
        this.add = this.add.bind(this)
    }
    
    add(data) {
        const item = new Item(data,Todo)
        item.save()
    }
}

export default new List()