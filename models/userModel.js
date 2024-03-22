const mongoose=require('mongoose')

// defining user model schema
const usreSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    blogs:[
        {
            type: mongoose.Types.ObjectId,
            ref:"Blog",
        }
    ]
},{timestamps:true})  //timestamp is used to get the time when user is created 

// createing a variable userModel which have collection name (User) and which have schema type of userSchema
const userModel=mongoose.model("User",usreSchema);

// export
module.exports=userModel;
