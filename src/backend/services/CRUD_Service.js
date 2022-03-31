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

async function deletePost(id)
{
    let targetPost = await postModel.findByIdAndDelete({_id: id})
    
    return targetPost
}

module.exports = {
    createPost,
    getAllPosts,
    deletePost
}