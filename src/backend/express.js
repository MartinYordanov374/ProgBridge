const express = require('express')
const cors = require('cors')
const databaseConfig = require('./database/mongoose')
const { login, register } = require('./services/userService')

var bodyParser = require('body-parser')

var cookieParser = require('cookie-parser');

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
        let pass = req.body.password
        try
        {
            let user = await login(username, pass)
            console.log(user)
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

    
    app.listen(3000, () => {
        console.log('server working')
    })
}

start()