import React, { useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

const ChatInput = (props  ) => {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmoji = () => {
    setEmojiPicker(!emojiPicker);
  };

  const handleClick = (emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };
const sendChat=(event)=>{
  event.preventDefault()
  if(msg.length>0){
    props.handlesendmsg(msg)
    setMsg("")
  }
}
  return (
    <>
      <Container>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmoji} />
            {emojiPicker && (
                <EmojiPicker height={350} width={400}  onEmojiClick={handleClick} />
            )}  
          </div>
        </div>
        <form className="input-container" onSubmit={sendChat}>
          <input
            type="text"
            placeholder="type your message here"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button type="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  overflow:hidden;
  bottom:50px;
  width:60%;
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding-top:2px;
  z-index:1;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
  }

  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: yellow;
      cursor: pointer;
    }
    .epr_6ocl7q {
      position: absolute;
      top: -350px;  
      background-color:#080420;
      box-shadow:0 5px 10px #9a86f3;
      border-color:#9186f3; 
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;
