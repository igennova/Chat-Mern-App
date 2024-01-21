import React from "react";
import styled  from "styled-components";
import robot from "../assets/robot.gif"
const Welcome=(props)=>{
    return (
        <Container1>
          <img src={robot} alt="" />
          <h1>
            {/* Welcome, <span>{props.currenuser}!</span> */}
          </h1>
          <h3>Please select a chat to Start messaging.</h3>
        </Container1>
      );
    }
const Container1 = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  color: white;
    
  // flex-direction:column;
  img {
    height: 15rem;
  }
  span {
    color: #4e0eff;
  }
`;
export default Welcome
