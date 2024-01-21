import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { alluserroute } from "../utils/Apiroute";
import Contacts from "../components/Contacts";
import Welcome from "../components/welcome";

const Chat = () => {
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
  const hanadlechatchange=(chat)=>{
    setcurrentchat(chat)
  }

  return (
    <Container>
      <div className="container">
        Hello Chat 
        <Contacts contacts={contacts} currentUser={currentUser} changechat={hanadlechatchange} >
        <Welcome  currentUser={currentUser}/>
        </Contacts>
       
      </div>

    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 75% 25%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
