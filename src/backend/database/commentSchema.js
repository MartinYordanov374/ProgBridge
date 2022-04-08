const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

const commentSchema = new Schema({
    Author: 
    { 
        type: String, 
        required: true,
        ref: 'user'
    },
    Content: 
    { 
        type: String, 
        required: true 
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

let comment = model('comment', commentSchema)
module.exports =  comment