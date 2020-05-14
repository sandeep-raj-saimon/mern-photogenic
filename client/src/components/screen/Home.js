import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'

const Home = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)

    useEffect(()=>{
        fetch("/allpost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")}
        }).then(res=>res.json())
        .then(result=>{
           // console.log(result)
            setData(result.posts)
        })
    },[])

    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log("result",result)
            const newdata = data.map(item=>{
                if (item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newdata)
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newdata = data.map(item=>{
                if (item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newdata)
        }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newdata = data.map(item=>{
                if (item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newdata)
        }).catch(err=>{
            console.log(err)
        })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }

    const deleteComment= (postid,commentid)=>{
        fetch(`/deletecomment/${postid}/${commentid}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("client",result)
            // const newData = data.filter(item=>{
            //     return item._id !== result._id
            // })
            // setData(newData)
        })
    }

    return (
        <div className="Home">
            {
                data.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                            <h5 style={{padding:"5px"}}>{item.postedBy.name}
                            {item.postedBy._id == state._id &&
                            <i class="material-icons" style={{float:"right"}}
                            onClick={()=>deletePost(item._id)}>delete</i>}
                            </h5>
                            <div className="card-image">
                                <img src ={item.photo} />

                            </div>
                            <div className="card-content">
                                {item.likes.includes(state._id)?
                                    <i className="material-icons"onClick={()=>unlikePost(item._id)}>thumb_down</i>:
                                    <i className="material-icons" onClick={()=>likePost(item._id)}>thumb_up</i>
                                }
    
                                <h6>{item.likes.length} Likes</h6>

                                <h4 className="commentTitle">{item.title} : 
                                    <span className="commentBody"> {item.body}</span></h4>
                                
                                {
                                    item.comments.map(record=>{
                                        console.log(record._id)
                                        
                                        return(
                                            <h6><span style={{fontWeight:"500"}} className="postedByName">{record.postedBy.name}</span> {record.text}
                                            <i class="material-icons" style={{float:"right",fontSize:"20px"}}
                                            onClick={()=>deleteComment(item._id,record._id)}>delete</i>
                                            </h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                    <input type="text" placeholder="Add a comment"/>
                                </form>
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    )
}


export default Home