const express = require("express")
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys') 
require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connect(MONGOURI,{
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
	console.log("connected to mongo")
})

mongoose.connection.on('error',(err)=>{
	console.log("error connecting",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

/*const customMiddleware = (req,res,next)=>{
	console.log("middleware executed")
	next()
}

app.use(customMiddleware)


app.get('/',(req,res)=>{
	console.log("home")
	res.send("hello world")
})

app.get('/about',customMiddleware,(req,res)=>{
	console.log("About")
})*/

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
	console.log("server is running on",PORT)
})
