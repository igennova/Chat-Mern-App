import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { alluserroute,host } from "../utils/Apiroute";
import Contacts from "../components/Contacts";
import Welcome from "../components/welcome";
import ChatContainer from "../components/ChatCointainer";
import {io} from "socket.io-client"

const Chat = () => {
  const socket=useRef()
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentchat,setcurrentchat]=useState(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUser(user);

        if (user.isAvatarimageset) {
          try {
            const response = await axios.get(`${alluserroute}/${user._id}`);
            setContacts(response.data);
          } catch (error) {
            console.error("Error fetching contacts:", error);
          }
        } else {
          navigate("/setavatar");
        }
      }
    };

    fetchData();
  }, [navigate]);
  useEffect(()=>{
    if (currentUser){
      socket.current=io(host)
      socket.current.emit("add-user",currentUser._id)

    }
  },[currentUser]) 
  const hanadlechatchange=(chat)=>{
    setcurrentchat(chat)
  }

  return (
    <Container>
      
      <div className="container">
      
        
        <Contacts contacts={contacts} currentUser={currentUser} changechat={hanadlechatchange}/>
        {currentchat===undefined ? (<Welcome currentUser={currentUser}/>) :
          (<ChatContainer currentchat={currentchat} currentUser={currentUser} socket={socket}/>)
        }
      </div>

    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324; /* Set a background color for the whole container */

  .container {
    background-color: #green; /* Set a background color for the container */
    height: 85vh;
    width: 85vw;
    display: flex; /* Use flexbox layout */
    flex-direction: row; /* Horizontal layout */
    justify-content: space-between; /* Distribute space between child components */
  }
`;

export default Chat;
