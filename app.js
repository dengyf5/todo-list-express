import Todos from "./controllers/Todo";

let data = {
    item: 'Go shopping',
    tag: 'life',
    description: 'buy some tissue and some food!', 
    userId: 233,
    level: 999,
    finishedTime: new Date('2018-08-08'),
    createTime: new Date(),
};

let url = 'mongodb://localhost/todos';

Todos.connect(url);
Todos.add(data);