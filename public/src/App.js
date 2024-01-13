import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./pages/register"
import Login from "./pages/Login"
import Chat from "./pages/Chat"
import SetAvatar from "./pages/setAvatar"
const App=()=>{
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/setavatar" element={<SetAvatar/>}></Route>
      <Route path="/" element={<Chat/>}></Route>
      </Routes></BrowserRouter>
    
  )}
export default App;