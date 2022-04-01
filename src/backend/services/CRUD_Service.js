let postModel = require('../database/postsSchema')
let commentModel = require('../database/commentSchema')

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
    let allPosts = await postModel.find({}).populate('Author Comments')
    console.log(allPosts[0].Comments)
    return allPosts
}

async function deletePost(id)
{
    let targetPost = await postModel.findByIdAndDelete({_id: id})
    
    return targetPost
}

async function findPostByID(id)
{
    let targetPost = await postModel.findById({_id: id})
    
    return targetPost
}


async function addPostComment(content)
{
    let targetPost = await postModel.findById({_id: content.postID})
    
    let commAuthor = content.author
    let commContent = content.content

    let comment = new commentModel({
        Author: commAuthor,
        Content: commContent
    })

    await comment.save()

    targetPost.Comments.push(comment['_id'])
    
    await targetPost.save()

    // res.status(200).send()
}
module.exports = {
    createPost,
    getAllPosts,
    deletePost,
    findPostByID,
    addPostComment
}