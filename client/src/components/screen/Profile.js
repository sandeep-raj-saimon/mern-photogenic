import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import {useHistory} from 'react-router-dom'
import { set } from 'mongoose'

const Profile = ()=>{
    const [pics,setPics] = useState([])
    const [name,setName] = useState("")
    const {state,dispatch} = useContext(UserContext)
    const id = JSON.parse(localStorage.getItem("user"))
    const [picid,setPicid] = useState("")
    const findId = (id)=>{
        fetch(`user/${id}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           //console.log(result)
           setPicid(result.pic)
           setName(result.name)
           //console.log(picid)
        })
    }

    findId(id._id)
    const history = useHistory()

    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            setPics(result.mypost)
        })
    })
    return (
        <div>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid pink"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"100px"}}
                    src={picid}
                    />
                    <i class="material-icons" onClick={()=>{
                        // console.log(state,"hi state")
                        // console.log(picid)
                        history.push('/profile_edit')

                    }}>create</i>  
                </div>
                <div>
                    <h2 className="profileName">{state?name:"loading"}</h2>
                    <div className="info">
                        <h5>posts</h5>
                        <h5>followers</h5>
                        <h5>following</h5>
                    </div>               
                </div>
            </div>
            <div className="gallery">
                {
                    pics.map(item=>{
                        return (
                            <img key={item._id} className="items" src={item.photo} alt={item.title}/>
                        )
                    })
                }               
            </div>
        </div>
        
    )
}


export default Profile