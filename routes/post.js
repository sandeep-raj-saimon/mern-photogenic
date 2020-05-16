const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.get('/allpost',requireLogin,(req,res)=>{
	Post.find()
	.populate("postedBy","_id name")
	.populate("comments.postedBy","_id name")
	.then(posts=>{
		res.json({posts})
	})
	.catch(err=>{
		console.log(err)
	})
})

router.post('/createpost',requireLogin,(req,res)=>{
	const {title,body,pic} = req.body
	if (!title || !body || !pic){
		return res.status(422).json({error:"please add all fields"})
	}
	req.user.password = undefined
	const post = new Post({
		title,
		body,
		photo:pic,
		postedBy:req.user
	})
	post.save().then(result=>{
		res.json({post:result})
	})
	.catch(err=>{
		console.log(err)
	})
})

router.post('/updateprofile/:id',requireLogin,(req,res)=>{
	console.log("server reached",req.params.id)
	const {name,pic} = req.body
	if (!name || !pic){
		return res.status(422).json({error:"please add all fields"})
	}

	User.findOneAndUpdate({_id:req.params.id},
		{$set: {name:name,pic:pic}}
	).populate().then(result=>{
		res.json(result)
	}).catch(err=>{
		console.log(err)
	})

})
    
router.get('/mypost',requireLogin,(req,res)=>{
	// const user = User.findOne({_id:req.user._id})
	// console.log(user._id)
	Post.find({postedBy:req.user._id})
	.populate("postedBy","_id name")
	.then(mypost=>{  
		res.json({mypost})
	})
	.catch(err=>{
	console.log(err)
	})
})

router.put('/like',requireLogin,(req,res)=>{
	Post.findByIdAndUpdate(req.body.postId,{
		$push:{likes:req.user._id}
	},{
		new:true
	}).exec((err,result)=>{
		if (err){
			return res.status(422).json({error:err})
		}else{
			res.json(result)
		}
	})
})

router.put('/unlike',requireLogin,(req,res)=>{
	Post.findByIdAndUpdate(req.body.postId,{
		$pull:{likes:req.user._id}
	},{
		new:true
	}).exec((err,result)=>{
		if (err){
			return res.status(422).json({error:err})
		}else{
			res.json(result)
		}
	})
})

router.put('/comment',requireLogin,(req,res)=>{

	const comment = {
		text:req.body.text,
		postedBy:req.user._id
	}
	Post.findByIdAndUpdate(req.body.postId,{
		$push:{comments:comment}
	},{
		new:true
	}).populate("comments.postedBy","_id name")
	.exec((err,result)=>{
		if (err){
			return res.status(422).json({error:err})
		}else{
			res.json(result)
		}
	})
})

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
	console.log(req)
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                	res.json(result)
              }).catch(err=>{
            		console.log(err)
              })
        }
    })
})

router.delete('/deletecomment'+'/:postId'+'/:commentId'+'/:commentedBy',requireLogin,(req,res)=>{
	// console.log("server reached")
	// console.log(req.params.commentedBy)
	Post.findOne({_id:req.params.postId})
    .exec((err,post)=>{
        if(err || !post.comments){
            return res.status(422).json({error:err})
		}
		//console.log("to be deleted")

		if ((post.postedBy._id.toString()===req.user._id.toString())||req.params.commentedBy.toString()===req.user._id.toString()){
			//console.log("user authorized for deleting comment")
			
			Post.findByIdAndUpdate( req.params.postId,
				{ $pull: { "comments" :
					{ _id: req.params.commentId } }, },
					{ new: true, } )
					.exec((error, result) =>
						{ if (error) {
							return res.status(402).json(error); }
						else {
							res.json(result); 
							console.log(result)
						} 
						});
		}

	}) 
		
})

module.exports = router