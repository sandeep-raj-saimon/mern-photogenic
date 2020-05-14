import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'

const Profile = ()=>{
    const [pics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    //console.log(state)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
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
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.unsplash.com/photo-1582607450312-0b0e45fc9fe6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"
                    />
                </div>
                <div>
                    
                    <h2 className="profileName">{state.name}</h2>      
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