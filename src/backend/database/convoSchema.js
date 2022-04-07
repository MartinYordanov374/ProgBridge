const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

const convoSchema = new Schema({
    Sender:{
        type: ObjectId,
        ref: 'user',
        required: true
    },
    Receiver:{
        type: ObjectId,
        ref: 'user',
        required: true
    },
    Messages: {
        type: [ObjectId],
        ref: 'message',
        default: []
    }
})

let convo = model('convo', convoSchema)
module.exports =  convo