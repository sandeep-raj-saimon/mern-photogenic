const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.get('/user/:id',requireLogin,(req,res)=>{
    //console.log("server reached")
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        res.json(user)
    }).catch(err=>{
        return res.json(422).json({error:"User not found"})
    })
})
module.exports = router