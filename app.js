import Item from './controllers/item'
import db from './models/db'
import Todo from './models/todo/todo'

let data = {
    item: 'homework11',
    tag: 'life',
    description: 'normal',
    userId: 233,
    level: 1,
    finishedTime: new Date(),
    createTime: new Date(),
}

let item = new Item(Todo,data);

//item.sortBy('id').getsByProp('tag','work').then(data => console.log(data)).catch(err => console.log(`${err}`))

//item.add().then(()=>console.log(`add success`)).catch(err => console.log(`${err}`))

item.deleteByPattern({tag:'work'}).then((x) => console.log(x)).catch(err => console.log(`${err}`));