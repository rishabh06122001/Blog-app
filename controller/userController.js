const userModel=require('../models/userModel')
const bcrypt=require('bcrypt')
// get all users
exports.getAllusers=async(req,res)=>{
    try {
        const user=await userModel.find({})
        return res.status(201).send({
            // also counting the user length
            userCount:user.length,
            sucess:true,
            message:"all user data",
            user,
        })
    } catch (error) {
        return res.status(404).send({
            success:false,
            message:"Error in Get all users",
            error,
        })
    }
};

// create user register user
exports.registerController=async(req,res)=>{
    try {
        const{username, email, password}=req.body
        // validation
        if(!username||!email||!password){
            return res.status(404).send({
                success:false,
                message:'Please Fill all fields'
            })
        }
        // existing user hai
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:"user already exists"
            })
        } 

        // hashing the password before saving it
        const hashpassword=await bcrypt.hash(password,10)
        // replaceing the password with hashpassword

        // saving the new user
        const user=new userModel({username,email,password:hashpassword})
        await user.save()
        return res.status(201).send({
            success:true,
            message:"New User Created",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:"Error in Register callback",
            success:false,
            error
        })
    }
};

// login
exports.loginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email||!password){
            res.status(401).send({
                success:false,
                message:"Please provide email or password"
            })
        }
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                message:"Email is not found"
            })
        }
        // password
        const ismatch=await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(401).send({
                message:"Invalid username or password"
            })
        }
        return res.status(200).send({
            success:true,
            message:"Login sucesssfully",
            user,
        })
    } catch (error) {
        return res.status(401).send({
            status:false,
            message:"Error in login",
            error,
        })
    }
};