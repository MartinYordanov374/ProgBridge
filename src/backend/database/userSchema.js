const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

const userSchema = new Schema({
    username: 
    { 
        type: String, 
        required: true,
    },
    hashedPass: 
    { 
        type: String, 
        required: true 
    },
    posts:{
        type: [ObjectId],
        ref: 'post'
    },
    shares:{
        type: [ObjectId],
        ref: 'post'
    }
})

let user = model('user', userSchema)
module.exports =  user
