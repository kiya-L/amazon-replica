import React, { useEffect, useContext } from 'react'
import Routing from './Router'
import { DataContext } from "./Components/DataProvider.js/DataProvider"
import { Type } from './Utility/Action'
import {auth} from "./Utility/firebase"
function App() {
  const[{user},dispatch]=useContext(DataContext)
  useEffect(()=>{
   auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      dispatch({
        type:Type.SET_USER,
        user:authUser
      })
    }else{
      dispatch({
        type:Type.SET_USER,
        user:null,
      })
    }
   })
  },[])
  return (
    <>
    <Routing/>
    </>
  )
}

export default App
