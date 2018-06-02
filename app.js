import http from 'http'
import mongoose from 'mongoose'
const db = mongoose.createConnection('mongodb://localhost/myItems');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: String
});

const PersonModule = mongoose.model('person', PersonSchema);

const person = new PersonModule({
    name: "kizana"
});

// 
let collection = PersonModule.collection.name
console.log(db.dropCollection(collection));
// PersonModule.findById('5b125f6e0ce934122c34662f', (err, docs) => {
//     if(err){
//         console.log(`error`)
//     } else {
//         console.log(docs)
//     }
// })



// PersonModule.deleteMany({name: 'everbrez'},(err) => {
//     if(!err){
//         console.log(`success!`);
//     } else {
//         console.log(`error!`);
//     }
// });
// person.save(err => {
//     if(err) {
//         console.log(`error`);
//     } else {
//         console.log(`success save ${person.name}`);
//     }
// });



// http.createServer((req, res) => {
//     res.end('HelloWorld!')
// }).listen(8888);
// console.log('listening to 8888');