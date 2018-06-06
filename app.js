import todos from "./controllers/todos";

let data = {
    item: 'Go shopping',
    tag: 'life',
    description: 'buy some tissue and some food!', 
    userId: 233,
    level: 99988888888888,
    finishedTime: new Date('2018-08-08'),
    createTime: new Date(),
};

todos.add(data);
setTimeout(() => todos.add(data),5000)