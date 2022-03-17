const express = require('express')
const cors = require('cors')
const databaseConfig = require('./database/mongoose')
const { login, register } = require('./services/userService')

var bodyParser = require('body-parser')
const session = require('express-session')

async function start()
{
    const app = express()

    app.use(bodyParser.json())


    await databaseConfig(app)

    app.use(express.urlencoded({
        extended: true
    }))

    app.use(session(
            { 
                secret: 'secret',
                resave: false,
                saveUninitialized: true,
                cookie:
                    {
                        secure: 'auto'
                    }
            }
        )
    )
 
    app.post('/login', async (req,res) => {
        let username = req.body.username
        let pass = req.body.password
        console.log('logged')
        try
        {
            let user = await login(username, pass)
            req.session.user = user
        }
        catch(err)
        {
            console.log(err)
        }
    })

    app.post('/register', async (req,res) => {
        let username = req.body.username
        let pass = req.body.password
        let repass = req.body.repass
        try
        {
            let user = await register(username, pass)
            req.session.user = user
            
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