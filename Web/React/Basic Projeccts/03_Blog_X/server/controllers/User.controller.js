const User = require('../models/user.model')
const asyncHandler = require("express-async-handler")
const generateToken = require('../utils/generateToken')



// ------ Register User -------
const registerUser = asyncHandler(async (req,res)=>{
    const {name , email, password} = req.body

    




})