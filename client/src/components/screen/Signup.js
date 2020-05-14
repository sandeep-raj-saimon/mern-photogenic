import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = ()=>{

    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const PostData=()=>{
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email address",classes:"#ec407a pink lighten-1"})
        }
        else{
            fetch("signup",
            {
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    password,
                    email
                })
            }).then(res=>res.json())
            .then(data=>{
                if (data.error){
                    M.toast({html:data.message,classes:"#ec407a pink lighten-1"})
                }
                else{
                    M.toast({html:"Registered Successfully!",classes:"#ec407a pink lighten-1"})
                    history.push('/signin')
                }
            }).catch(err=>{
                console.log(err)
            })
        }
       
    }
    return (
        <div className="mycard">
            <div className="auth-card input-field">
                <h2>PhotoGenic</h2>
                <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #f50057 pink accent-3" type="submit" name="action" onClick={()=>PostData()}>
                    Signup
                </button>
                <h6>
                    <Link to="/signin">Already have an Account?</Link>
                </h6>
        
            </div>
        </div>
    )
}


export default Signup