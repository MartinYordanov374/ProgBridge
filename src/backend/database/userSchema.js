const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

const userSchema = new Schema({
    username: 
    { 
        type: String, 
        required: true,
    },
    profilePicture:{
        type: String,
        required: true,
        default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F7%2F7c%2FProfile_avatar_placeholder_large.png&f=1&nofb=1'
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

