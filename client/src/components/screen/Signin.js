import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
const Signin  = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const PostData=()=>{
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email address",classes:"#ec407a pink lighten-1"})
        }
        else{
            fetch("/signin",
            {
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    password,
                    email
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log("data",data)
                if (data.error){
                    M.toast({html:data.message,classes:"#ec407a pink lighten-1"})
                }
                else{
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    console.log(dispatch({type:"USER",payload:data.user}))
                    console.log("hi")
                    M.toast({html:"Logged in Successfully!",classes:"#ec407a pink lighten-1"})
                    history.push('/')
                }
            }).catch(err=>{
                console.log("err",err)
                M.toast({html:"Invalid Email or Password",classes:"#ec407a pink lighten-1"})
            })
        }
       
    }

    return (
        <div className="mycard">
            <div className="auth-card input-field">
                <h2>PhotoGenic</h2>
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #f50057 pink accent-3" type="submit" name="action" onClick={()=>PostData()}>
                    SignIn
                </button>
                <h6>
                    <Link to="/signup">Dont have an Account?</Link>
                </h6>       
            </div>
        </div>
    )
}


export default Signin