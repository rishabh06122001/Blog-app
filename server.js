const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const colors=require('colors')
const dotenv=require('dotenv')
const connectDB = require('./config/connectDB')
// path for connectiong react app to backend server
const path=require ("path")

// env configuration
dotenv.config()

// route import
const userRoutes=require('./routes/userRoutes')
const blogRoutes=require('./routes/blogRoutes')
// mongoDb connection
connectDB();

// rest object
const app=express()

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// static file access 
//we will use express because express can help to access static file
app.use(express.static(path.join(__dirname,'./client/build')))


// routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog",blogRoutes);

// jo static file ka access diya usko ab serve karenge
app.get('*',function (req,res) {
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

// port
const PORT=process.env.PORT||8080
// listen
app.listen(8080,()=>{
    console.log(`Server Runing on ${process.env.DEV_MODE} mode port ${PORT}`.bgCyan.white);
});