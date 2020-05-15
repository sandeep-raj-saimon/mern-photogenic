import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../App'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const ProfileEdit = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const [pic,setPic] = useState("")
    const [url,setUrl] = useState("")
    const user = JSON.parse(localStorage.getItem("user"))
    const [name,setName]= useState("")
    const history = useHistory()

    console.log(user)

    useEffect(()=>{
        if (url){
            fetch(`/updateprofile/${user._id}`,{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    name,
                    pic:url,
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
        data.append("file",pic)
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
    return(
        <div className="card input-field createpost">
            <input type="text" placeholder={user.name} value={name} onChange={(e)=>setName(e.target.value)}/>
            
            <div className="file-field input-field">
                <div className="btn #f50057 pink accent-3">
                    <span className="Profile photo">File</span>
                    <input type="file" onChange={(e)=>setPic(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #f50057 pink accent-3 submit" type="submit" name="action" onClick={()=>postDetails()}>
                    Submit
            </button>
        </div>
    )
}

export default ProfileEdit