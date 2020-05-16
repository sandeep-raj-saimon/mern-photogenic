const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	pic:{
		type:String,
		default:"https://res.cloudinary.com/dv7eozzeh/image/upload/v1589560644/lwuypznpldeorqwtlx1v.jpg"
	}
})
mongoose.model("User",userSchema)