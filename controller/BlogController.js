const mongoose = require('mongoose')
const blogModel=require('../models/blogModel')
const userModel = require('../models/userModel')


// get function
exports.getAllBlogController=async(req,res)=>{
    try {
        const blogs=await blogModel.find({}).populate("user");
        if(!blogs){
            return res.status(401).send({
                success:false,
                message:"blog data not found"
            })
        }
        return res.status(200).send({
            success:true,
            BlogCount:blogs.length,
            message:'All Blog lists',
            blogs
        })
    } catch (error) {
        return res.status(401).send({
            success:false,
            message:"Error in geting the all blogs",
            error
        })
    }
}

// create function
exports.createBlogController=async(req,res)=>{
    try {
        const {title,description,image,user}=req.body     //this user is for getting user id 
        // validdaiton
        if(!title||!description||!image||!user){
            return res.status(401).send(
                {
                    success:false,
                    message:"Please fill all details"
                }
            )
        }
        const existingUser= await userModel.findById(user)
        // validation for existing user is there in user model or not
        if(!existingUser){
            return res.status(401).send({
                success:false,
                message:"user id is not there inn user model data"
            })
        }

        const newblog=new blogModel({title,description,image,user})

         // we use mongoose session for updating the data
         const session=await mongoose.startSession();
         session.startTransaction()
         await newblog.save({session});
         existingUser.blogs.push(newblog);
         await existingUser.save({session})
         await session.commitTransaction();

    
        await newblog.save();
        return res.status(201).send({
            status:true,
            message:"blog is created",
            newblog
        })
    } catch (error) {
        return res.status(401).send({
            success:false,
            message:"Error in creating blog",
            error
        })
    }
}

// update function
exports.updateBlogController=async(req,res)=>{
    try {
        // since id we get from params therefore we have to destructure it
        const {id}=req.params
        const {title,description,image}=req.body;
        const blog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(201).send({
            success:true,
            message:"blog updated",
            blog
        })
    } catch (error) {
        return res.status(401).send({
            success:false,
            message:"error in UpdateBlog",
            error
        })
    }
}

// single block details geting function
// exports.getBlogByIdController=async(req,res)=>{
//     try {
//         const {id}=req.params()
//         const blog=await blogModel.findById({id})
//         if(!blog){
//             return res.status(401).send({
//                 success:false,
//                 error
//             })
//         }
//         return res.status(201).send({
//             status:true,
//             message:"blog found",
//             blog
//         })
        
//     } catch (error) {
//         return res.status(404).send({
//             success:false,
//             message:"error in geting blog",
//             error
//         })
//     }
// }

exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params; // Corrected access to req.params
        const blog = await blogModel.findById(id); // Corrected usage of findById
        if (!blog) {
            return res.status(404).send({ // Changed status code to 404
                success: false,
                message: "Blog not found"
            });
        }
        return res.status(200).send({ // 201 is typically for resource creation, 200 for successful fetch
            success: true,
            message: "Blog found",
            blog
        });
        
    } catch (error) {
        return res.status(500).send({ // 500 for internal server error
            success: false,
            message: "Error in getting blog",
            error: error.message // It's often helpful to send the error message for debugging
        });
    }
};

// deleting block function'
exports.deleteBlogController=async(req,res)=>{
    try {
        // const {id}=req.params
        // await blogModel.findByIdAndDelete(req.params.id)
        const blog=await blogModel.findByIdAndDelete(req.params.id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save();
        return res.status(201).send({
            success:true,
            message:'Blog is deleted',
            // blog
        })
    } catch (error) {
        return res.status(404).send({
            success:false,
            message:"error in deleting blog",
            error
        })
    }
};

// GET user Blog
exports.userBlogController=async(req,res)=>{
    try {
        const userBlog=await userModel.findById(req.params.id).populate("blogs")  //by populate we can get the blog
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:"blogs not foumd with this id"
        
            })
        }
        return res.status(202).send({
            success:true,
            userBlog
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:'Error in user blog',
            error
        })
    }
}