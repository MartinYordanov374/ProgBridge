let userModel = require('../database/userSchema')
let bcrypt = require('bcrypt')

const saltRounds = 9
const mongoose = require('mongoose')

async function register(username, password, address)
{
    const user = await getUserByUsername(username)
    if(user)
    {
        throw new Error('This user is already taken!')    
    }
    else
    {
        const hashedPass = await bcrypt.hash(password, saltRounds)

        const user = new userModel({
            username, 
            hashedPass,
            address
        })

        await user.save()

        return user
    }
}

async function login(username, password)
{
    const user = await getUserByUsername(username)

    if (user == null)
    {
        throw new Error('This user doesn\'t exist!')
    }
    else
    {
        const hashedPasswordsMatch = await bcrypt.compare(password, user.hashedPass)

        if( hashedPasswordsMatch == false)
        {
            throw new Error('Wrong passwod!')
        }

        return user

    }
}

async function getUserByUsername(username)
{
    let user = await userModel.findOne({ username })

    return user 
}

async function getUserByID(id)
{
    let user = await userModel.findById({ _id: id}).populate('followers following')
    return user 
}

async function getAllUnfollowedUsers(idArray)
{
    let unfollowed = await userModel.find({ _id: {'$nin': idArray} })
    return unfollowed
}

module.exports = {
    login,
    register,
    getUserByID,
    getAllUnfollowedUsers
}