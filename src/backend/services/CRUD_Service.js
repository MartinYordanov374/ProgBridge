let postModel = require('../database/postsSchema')
async function createPost(content, owner)
{
    let post = new postModel({
        Author: owner,
        Content: content
    })

    await post.save()

    return post
}

async function getAllPosts()
{
    let allPosts = await postModel.find({}).populate('Author')

    
    return allPosts
}

module.exports = {
    createPost,
    getAllPosts
}