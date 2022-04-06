const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

const convoSchema = new Schema({
    Messages: {
        type: [ObjectId],
        ref: 'message'
    }
})

let convo = model('convo', convoSchema)
module.exports =  convo