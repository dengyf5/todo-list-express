'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _mongoose2.default.connect('mongodb://localhost/myItems');
var Schema = _mongoose2.default.Schema;
var Module = _mongoose2.default.model;

var PersonSchema = new Schema({
    name: String
});

var PersonModule = Module('Person', PersonSchema);

var person1 = new PersonModule({
    name: "everbrez"
});

console.log(person1.name);

// http.createServer((req, res) => {
//     res.end('HelloWorld!')
// }).listen(8888);
// console.log('listening to 8888');

//# sourceMappingURL=app.js.map