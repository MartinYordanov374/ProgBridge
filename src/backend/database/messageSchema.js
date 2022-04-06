const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

const messageSchema = new Schema({
    ConvoID:{
        type: ObjectId,
        ref: 'convo'
    },
    Content:{
        type: String
    }
})

let message = model('message', messageSchema)
module.exports =  message