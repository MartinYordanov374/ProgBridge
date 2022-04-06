const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

const messageSchema = new Schema({
    Sender:{
        type: Object,
        ref: 'user'
    },
    ConvoID:{
        type: ObjectId,
        ref: 'convo'
    },
    Content:{
        type: String
    }
})

let message = model('convo', messageSchema)
module.exports =  message