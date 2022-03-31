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

module.exports = {
    createPost
}