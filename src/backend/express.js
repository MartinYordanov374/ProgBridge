const express = require('express')
const cors = require('cors')
const databaseConfig = require('./database/mongoose')
const { login, register } = require('./services/userService')

var bodyParser = require('body-parser')

async function start()
{
    const app = express()

    app.use(bodyParser.json())


    await databaseConfig(app)

    app.use(express.urlencoded({
        extended: true
    }))
 
    app.post('/login', async (req,res) => {
        let username = req.body.username
        let pass = req.body.password
        console.log('logged')
        try
        {
            let user = await login(username, pass)
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

        try
        {
            let user = await register(username, pass, 'test')
            console.log(user)
            
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