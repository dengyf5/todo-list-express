import todos from "./controllers/todos";
import express from 'express'

const app = express();

app.post('/', (req, res) => {
    let data = ''
    req.on('data', chunks => {
        data += chunks;
    })
    req.on('end', () => {
        todos.add(Object.assign({}, JSON.parse(data.toString('utf8')), {createTime: new Date()}))
            .then(() => {
                console.log('success!')
                res.json({
                    type: 'SUCCESS',
                    result: 'SUCCESS'
                });
            })
            .catch(
                err => {
                    console.log('error')
                    res.json({
                        type: 'ERROR_FORMAT',
                        result: 'FAILURE'
                    })
                }
            )
    })
})

app.listen(8888)
console.log(`listening on localhost:8888`)