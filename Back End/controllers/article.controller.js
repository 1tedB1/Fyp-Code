const catchAsync = require("../middlewares/catchAsync");
const ArticleData = require('../models/article.model')
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/Andaz-E-Bayan', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;

const createContent = catchAsync(async (req, res) => {
    console.log(req.body);
    const { title, content, author, prevPart } = req.body;
    const newArticle = await ArticleData.create({
        title,
        content,
        author,
        prevPart
    });
    if (prevPart) {
        const prevPartArticle = await ArticleData.findById(prevPart);
        prevPartArticle.nextPart = newArticle._id;
    }
    console.log("New article created:", newArticle);
    res.status(201).json({
        success: true,
        message: "Article created successfully",
        data: newArticle
    });
})
module.exports.createContent = createContent;

module.exports.likeContent = catchAsync(async (req, res) => {

    const { articleId, userId } = req.body;
    // console.log(articleId,"   ",'664ed78989f076f759eb06c4');
    const article = await ArticleData.findById(articleId);
    const likes = article.likes;
    const dislikes = article.dislikes;
    if (dislikes.includes(userId)) {
        const index = dislikes.indexOf(userId);
        dislikes.splice(index, 1);
    }
    if (likes.includes(userId)) {
        console.log("already liked");
        return
    }
    else {
        likes.push(userId);
    }
    // article.likes.push(userId);
    await article.save();

})


module.exports.disLikeContent = catchAsync(async (req, res) => {

    const { articleId, userId } = req.body;
    // console.log(articleId,"   ",'664ed78989f076f759eb06c4');
    const article = await ArticleData.findById(articleId);
    const likes = article.likes;
    const dislikes = article.dislikes;
    if (likes.includes(userId)) {
        const index = likes.indexOf(userId);
        likes.splice(index, 1);
    }
    if (dislikes.includes(userId)) {
        console.log("already disliked");
        return
    }
    else {
        dislikes.push(userId);
    }
    // article.likes.push(userId);
    await article.save();

})


module.exports.viewContent = catchAsync(async (req, res) => {

    const { articleId, userId } = req.body;
    // console.log(articleId,"   ",'664ed78989f076f759eb06c4');
    const article = await ArticleData.findById(articleId);
    const views = article.views;
    if (views.includes(userId)) {
        console.log("already viewed");
        return
    }
    else {
        views.push(userId);
    }
    // article.likes.push(userId);
    await article.save();

})

module.exports.removeContent = catchAsync(async (req, res) => {

    const { articleId } = req.body;
    // console.log(articleId,"   ",'664ed78989f076f759eb06c4');
    const article = await ArticleData.findById(articleId)
    const prevPart = article.prevPart;
    const nextPart = article.nextPart;
    if (prevPart) {
        const prevPartArticle = await ArticleData.findById(prevPart);
        if (nextPart) {
            const nextPartArticle = await ArticleData.findById(nextPart);
            prevPartArticle.nextPart = nextPart;
            nextPartArticle.prevPart = prevPart;
            await nextPartArticle.save();
        }
        await prevPartArticle.save();
    }
    else if (nextPart) {
        const nextPartArticle = await ArticleData.findById(nextPart);
        nextPartArticle.prevPart = null;
        await nextPartArticle.save();

    }
    await article.remove();
})

const getAllArticles = catchAsync(async (req, res) => {
    const articles = await ArticleData.find().populate(
        {
            path: 'author',
        }
    
    ).populate(
        {
            path: 'nextPart',
        }
    ).populate(
        {
            path: 'prevPart',
        }
    ).populate(
        {
            path: 'comments',
        }
    ).populate(
        {
            path: 'views',
        }
    ).populate(
        {
            path: 'likes',
        }
    ).populate(
        {
            path: 'dislikes',
        }
    );
    // console.log(articles);
    res.status(200).json({
        success: true,
        data: articles
    });
})

module.exports.getAllArticles = getAllArticles;



req = {
    body: {
        title:"dfd",
        content:"dfdfdf",
        author:"664e4b9b761ff701be245a1f",
        // prevPart:""
    }
}



res = {}
// createContent(req, res)
// getAllArticles(req, res)
// likeContent(req, res)

