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
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: white;
background: black;
flex: 7;

img {
  height: 15rem;
}

span {
  color: #4e0eff;
}
`;
export default Welcome

