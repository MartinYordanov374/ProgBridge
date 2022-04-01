const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

const commentSchema = new Schema({
    Author: 
    { 
        type: ObjectId, 
        required: true,
        ref: 'user'
    },
    Content: 
    { 
        type: String, 
        required: true 
    }
})

let comment = model('comment', commentSchema)
module.exports =  comment