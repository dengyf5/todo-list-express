import Item from './controllers/item'
import db from './models/db'
import Todo from './models/todo/todo'

let data = {
    item: 'shopping',
    tag: 'work',
    description: 'normal',
    userId: 233,
    level: 0,
    finishedTime: new Date(),
    createTime: new Date(),
}

let item = new Item(Todo,data);
//item.emply().then(() => console.log(`emply`))
//item.add().then(() => console.log(`success`)).catch(err =>console.log( `${err}`))

item.setSort('id',3).getByProp('id').then((data) => console.log(`data:${data}`)).catch(err => console.log(`Error:${err}`))