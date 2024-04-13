import React, { Fragment, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader from "../assets/loader.gif";
import "./setAvatar.css";
import { setAvatarRoute } from "../utils/Apiroute";
import { Buffer } from "buffer";
const SetAvatar = () => {
  const api = "https://api.multiavatar.com/random/?apikey=9eHXr3Ck0Ou8QS";
  const navigate = useNavigate();
  const [avatars, setavatar] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [selectedAvatar, setselectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(()=>{
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
    }
  },[])
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      console.log(user);
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarimageset = true;
        user.avatarimage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar", toastOptions);
      }
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          var a = Math.round(Math.random() * 1000);
          const api1 = api.replace("random", a);
          const image = await axios.get(api1);
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        setavatar(data);
        setisLoading(false);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="main">
        {isLoading ? (
          <img src={Loader} alt="loader" className="loader" />
        ) : (
          <>
            <div className="title-container">
              <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    key={index}
                    className={`avatar1 ${
                      selectedAvatar === index ? "selected" : " "
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      onClick={() => setselectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
            <button  onClick={setProfilePicture} className="button-setavatar">Set as Profile Pic</button>
          </>
        )}
      </div>

      <ToastContainer />
    </Fragment>
  );
};
export default SetAvatar;
