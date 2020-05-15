import React, { useContext } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = ()=>{
        if (state){
            return[
            <li><i class="material-icons user" onClick={()=>{
                history.push('/profile')
            }}>account_circle</i></li>,
            <li><Link to="/createpost">CreatePost</Link></li>,
            <li>
                <Link to="signin" onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
            }}>Signout</Link>
            </li>
        ]
        }else{
            return[
                <li><Link to="/signin">Signin</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return(
        <nav>
        <div className="nav-wrapper">
        <Link to={state?"/":"/signin"} className="brand-logo left">PhotoGenic</Link>
        <ul id="nav-mobile" className="right">
            {renderList()}
        </ul>
        </div>
    </nav>        
    )
}

export default NavBar