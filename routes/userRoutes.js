const express=require('express');
const { getAllusers, registerController, loginController } = require('../controller/userController');

// router object
const router=express.Router();

// all APIs
// get all user|| get
router.get('/all-user',getAllusers)

// create user || post
router.post('/register',registerController)

// login||post
router.post('/login',loginController);


module.exports=router;
