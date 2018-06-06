import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.uri)

const db = mongoose.connection

// deal with disconnect
// reconnect
const reconnect = ((n) => {
    let i = 0
    return () => {
        if (i < n) {
            mongoose.connect(config.uri)
            i++
            //console.log(i)
        } else {
            mongoose.disconnect()
            console.log(`disconnect from database!`)
        }

    }
})(5)

// listen on connect ready state
// connecting -- connected -- disconnected -- error
db.on('connecting', () => {
    console.log(`connecting to database ......`)
})

db.on('connected', () => {
    console.log(`connected to database`)
})

db.on('disconnected', () => {
    console.log(`disconnected, trying to reconnect .......`)
    mongoose.disconnect()
    setTimeout(reconnect, 3000)

})

db.on('error', err => {
    console.log(`${err}`)
})


export default db