import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import { sendmessageroute } from "../utils/Apiroute";
import Message from "./Message";
import axios from "axios";
import { getallmsgRoute } from "../utils/Apiroute";
import {v4 as uuidv4} from "uuid";
const ChatContainer = (props) => {
  const [messages, setmessages] = useState([]);
  const [arrivalmsg,setarrivalmsg]=useState(null)
  const ScrollRef=useRef()
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.currentchat){
        const response = await axios.post(getallmsgRoute, {
          from: props.currentUser._id,
          to: props.currentchat._id,
        });

        if (response.data) {
          setmessages(response.data);
        } else {
          console.warn("No data received from the server");
        }
    }  } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.post(getallmsgRoute, {
    //       from: props.currentUser._id,
    //       to: props.currentchat._id
    //     });
    //     console.log('Response data:', response.data);
    //     setmessages(response.data);
    //   } catch (error) {
    //     console.error('Error fetching messages:', error);
    //   }
    // };

    fetchData();
  }, [props.currentchat]);

  const handlesendmsg = async (msg) => {
    try {
      await axios.post(sendmessageroute, {
        from: props.currentUser._id,
        to: props.currentchat._id,
        message: msg,
      });
      props.socket.current.emit("send-msg",{
        from: props.currentUser._id,
        to: props.currentchat._id,
        message: msg,
        
      })
      const msgs=[...messages]
      msgs.push({fromSelf:true,message:msg})
      setmessages(msgs)
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  useEffect(()=>{
    if(props.socket.current){
      props.socket.current.on("msg-recieve",(msg)=>{
        setarrivalmsg({fromSelf:false,message:msg})

      })
    }
  },[])
  useEffect(()=>{
    arrivalmsg && setmessages((prev)=>[...prev,arrivalmsg])
  },[arrivalmsg])
useEffect(()=>{
  ScrollRef.current?.scrollIntoView({behaviour:"smooth"})
},[messages])
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${props.currentchat.avatarimage}`}
              alt=""
            />
          </div>
          <div className="user-name">
            <h3>{props.currentchat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={uuidv4} ref={ScrollRef} >
            <div
              className={`${message.fromSelf ? "messagesended" : "messagereceived"}`}
            >
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handlesendmsg={handlesendmsg} />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;

  background: black;
  flex: 7;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .user-name {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
        margin-top:10px;
      }
    }
  }

  .messagesended {
    display: flex;
    align-items: center;

    .content {
      background-color: #4f04ff21;
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
    }
    justify-content: flex-end;
  }

  .messagereceived {
    display: flex;
    align-items: center;

    .content {
      background-color: #9900ff20;
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
    }
    

  }
`;
export default ChatContainer;
