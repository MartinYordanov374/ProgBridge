const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

const postSchema = new Schema({
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
    },
    Shares:{
        type: Number,
        default: 0
    },
    Likes:{
        type: [ObjectId],
        ref: 'user'
    },
    Comments:{
        type: [ObjectId],
        ref: 'comment'
    }
})

let post = model('post', postSchema)
module.exports =  post