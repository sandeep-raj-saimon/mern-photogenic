import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

const CreatePost = ()=>{
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl] = useState("")
    const history = useHistory()
    
    useEffect(()=>{
        if (url)
        {
            fetch("/createpost",
            {
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    pic:url
                })
            })
        .then(res=>res.json())
        .then(data=>{
            console.log(data,"hi")
            if (data.error){
                console.log(data.error)
                M.toast({html:data.error,classes:"#ec407a pink lighten-1"})
            }
            else{
                M.toast({html:"Posted Successfully!",classes:"#ec407a pink lighten-1"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
        }

    },[url])
    const postDetails = ()=>{

        const data = new FormData()

        data.append("file",image)
        data.append("upload_preset","photogenic")
        data.append("cloudname","dv7eozzeh")
        fetch("https://api.cloudinary.com/v1_1/dv7eozzeh/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })

    }
    return (
        <div className="card input-field createpost">
            <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)} />

            <div className="file-field input-field">
                <div className="btn #f50057 pink accent-3">
                    <span className="file">File</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #f50057 pink accent-3 submit" type="submit" name="action" onClick={()=>postDetails()}>
                    Post
            </button>
        </div>
    )
}

export default CreatePost