const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URl);
        console.log(`Connected to MOngoDB`);
    }
    catch(err){
        console.log(`Mongo connect Error`);
    }
};

module.exports=connectDB;