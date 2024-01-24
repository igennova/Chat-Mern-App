import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
const ChatContainer=(props)=>{
    return(
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
                <Logout/>
            </div>
            <div className="chat-messages"></div>
            <div className="chat-input"></div>
        </Container>
    )

}
const Container=styled.div`
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
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`
export default ChatContainer