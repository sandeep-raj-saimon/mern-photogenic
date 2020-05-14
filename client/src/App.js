import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screen/Home'
import Signin from './components/screen/Signin'
import Profile from './components/screen/Profile'
import Signup from './components/screen/Signup'
import CreatePost from './components/screen/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import AnotherUser from './components/screen/AnotherUser'
export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  //console.log(state,dispatch)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/')
    }else{
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/createpost">
          <CreatePost />
        </Route>
        <Route path="/others/:id">
          <AnotherUser />
        </Route>
        
    </Switch>
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  //console.log(state,dispatch)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
