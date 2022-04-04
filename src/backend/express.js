const express = require('express')
const cors = require('cors')
const databaseConfig = require('./database/mongoose')
const { login, register, getUserByID } = require('./services/userService')

var bodyParser = require('body-parser')

var cookieParser = require('cookie-parser');
const { createPost, getAllPosts, deletePost, findPostByID, addPostComment, removeLike, getAllUserPosts } = require('./services/CRUD_Service')



async function start()
{

    
    const app = express()
    app.use(cors()) // Use this after the variable declaration
    
    
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
        try
        {
            let user = await login(username, pass)
            res.status(200).send(user)
        }
        catch(err)
        {
            res.status(401).send(err.message)

        }
    })

    app.post('/register', async (req,res) => {
        let username = req.body.username
        let pass = req.body.pass
        let repass = req.body.repass
        if(pass === repass)
        {
            try
            {
                let user = await register(username, pass, 'SOME RANDOM STRING FOR THE SAKE OF IT')
                res.status(200).send(user)
                return res.status(200).send(user)
            }
            catch(err)
            {
                res.status(401).send(err.message)
    
            }
        }
        else
        {
            res.status(401).send('Passwords do not match !')
        }
    })

    app.post('/createPost', async (req,res) => {
        let postContent = req.body['content']
        let postOwner = req.body['owner']

        if(postContent.trim().length > 0)
        {
            await createPost(postContent, postOwner)
        }

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
        if(commContent != '')
        {
            let result = await addPostComment(commentObj)
        }
        else
        {
            res.json({error: 'Your comment cannot be empty !'})
        }
    })

    app.post('/likePost/:id', async (req,res) => {

        let targetPost = await findPostByID(req.params.id)
        let likeGiverID = req.body.likeGiverID
        
        if(targetPost.Likes.includes(likeGiverID) == false)
        {
            targetPost.Likes.push(likeGiverID)
        }
        else
        {
            const index = targetPost.Likes.indexOf(likeGiverID)
            targetPost.Likes.splice(index, 1)
        }

        await targetPost.save()

    })

    app.get('/getAllUserPosts/:id', async (req,res) => {
        let userPosts = await getAllUserPosts(req.params.id)
        res.status(200).send(userPosts)
    })

    app.get('/getUserByID/:id', async (req,res)=> {

        let user = await getUserByID(req.params.id)
        res.status(200).send(user)
    })

    app.post('/sharePost/:id', async ( req, res ) => {
        let sharerID = req.body.sharer
        let postID = req.body.post
        let targetPost = await findPostByID(req.params.id)
        let targetSharer = await getUserByID(sharerID)

        targetSharer.shares.push(postID)
        await targetSharer.save()
    })

    app.post('/changePFP/:id', async(req,res) => {
        console.log('changing pfp')
    })
    
    app.listen(3000, () => {
        console.log('server working')
    })
}

start()