const express = require('express')
const cors = require('cors')
const databaseConfig = require('./database/mongoose')
const { login, register } = require('./services/userService')

var bodyParser = require('body-parser')

var cookieParser = require('cookie-parser');
const { createPost, getAllPosts, deletePost, findPostByID, addPostComment } = require('./services/CRUD_Service')



async function start()
{
    const app = express()
    
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(cookieParser());


    await databaseConfig(app)

    // app.use(express.urlencoded({
    //     extended: true
    // }))
 
    app.post('/login', async (req,res) => {
        let username = req.body.username
        let pass = req.body.pass
        console.log(username, pass)
        try
        {
            let user = await login(username, pass)
            res.status(200).send(user)
        }
        catch(err)
        {
            console.log(err)
        }
    })

    app.post('/register', async (req,res) => {
        let username = req.body.username
        let pass = req.body.pass
        let repass = req.body.repass
        console.log('registering')
        try
        {
            let user = await register(username, pass, 'SOME RANDOM STRING FOR THE SAKE OF IT')
            res.status(200).send(user)
            console.log(user)
            // return res.status(200).send(user)
        }
        catch(err)
        {
            console.log(err)
        }
    })

    app.post('/createPost', async (req,res) => {
        let postContent = req.body['content']
        let postOwner = req.body['owner']
        createPost(postContent, postOwner)
    })

    app.get('/getAllPosts', async (req,res) => {
        let allPosts = await getAllPosts()
        res.status(200).send(allPosts)
    })

    app.post('/deletePost/:id', async (req,res) => {
        let result = await deletePost(req.params.id)
        // res.status(200)
    })

    app.post('/addComment/:id', async (req,res) => {
        let commContent = req.body['content']
        let commAuthor = req.body['commentAuthor']

        let commentObj = {content: commContent, author: commAuthor, postID: req.params.id }
        let result = await addPostComment(commentObj)
    })
    
    app.listen(3000, () => {
        console.log('server working')
    })
}

start()