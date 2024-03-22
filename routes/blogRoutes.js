const express=require('express')
const { getAllBlogController,
     createBlogController,
    updateBlogController,
    getBlogByIdController,
    deleteBlogController,
    userBlogController }
    = require('../controller/BlogController')

// router object
const router=express.Router()

// routes
// getting all block
router.get('/all-blog',getAllBlogController)

// create blog || POST
router.post('/create-blog',createBlogController)

//updating blog ||PUT
router.put('/update-blog/:id',updateBlogController)

// GET || Single Blog details
router.get('/get-blog/:id',getBlogByIdController)

// DELETE || delete blog
router.delete('/delete-blog/:id',deleteBlogController)

// GET || user blog by there blog id
router.get('/user-blog/:id',userBlogController)

module.exports=router