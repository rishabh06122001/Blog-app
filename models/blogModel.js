const mongoose=require('mongoose')

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        require:[true,"title is required"],
    },
    description:{
        type:String,
        require:[true,"description is required",]
    },
    image:{
        type:String,
        required:[true,"image is require"]
    },
    // for making a relationship between blog model and user model 
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require:[true,'User id required']
    }
},
{timestamps:true}
);

const blogModel=mongoose.model("Blog",blogSchema);

module.exports=blogModel;