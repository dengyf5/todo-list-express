import Item from './controllers/item'
import db from './models/db'
import Todo from './models/todo/todo'

let data = {
    id: 666233,
    item: 'shopping',
    tag: 'life',
    description: 'normal',
    userId: 233,
    level: 0,
    finishedTime: new Date(),
    createTime: new Date(),
}

let item = new Item(Todo,data);

item.add().then(() => console.log(`success`)).catch(err => console.log(`${err}`))