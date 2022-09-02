import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import fb from '../img/fb.png';
import background from '../img/background.png';
import bubble from '../img/bubble.png';
import ig from '../img/ig.png';
import info from '../img/info.png';
import logo from '../img/logo.png';
import menu from '../img/menu.png';
import share from '../img/share.png';
import tw from '../img/tw.png';
import "../home.css";

const Home = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    // <div className="container">
    //   <header className="jumbotron">
    //     <h3>{content}</h3>
    //   </header>
    // </div>
    <div class="hero"> 
      <div class="content">
          <h1>W E L C O M E</h1>
          <h5>Tech Stack Used: React Js , Node Js,MySQL</h5>
      </div>
      {/* <div class="side-bar">
          <img src={menu} class="menu" />
          <div class="social-links" >
              <img src={fb}/>
              <img src={ig}/>
              <img src={tw}/>
          </div>
      </div> */}
    <div class="bubbles">
        <img src={bubble}/>
        <img src={bubble}/>
        <img src={bubble}/>
        <img src={bubble}/>
        <img src={bubble}/>
        <img src={bubble}/>
        <img src={bubble}/>
    </div>
  </div>
  );
};
export default Home;