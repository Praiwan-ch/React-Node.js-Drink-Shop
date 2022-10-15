import React from "react";
import Style from '../Login.css';

export default function Login(){
    
     return (
          <div className="login-bg">
               <div className="background">
                    <div className="shape shape1"></div>
                    <div className="shape shape2"></div>
                    <div className="shape shape3"></div>
                    <div className="shape shape4"></div>
               </div>
               <div className="login">
                    <img src="/Login.webp" className="img"></img>
                    <h2>Login</h2>
                    <div className="form">
                         <label htmlFor="username">Username</label>
                         <label htmlFor="username" className="inputLogin">
                                <div id="insertBox">
                                    <a id="icon"><i className="fa-solid fa-circle-user"></i></a>
                                    <input id="username" name="username" type="text" placeholder=" Username" autoComplete="off"></input>
                                </div>
                         </label>
                         <label htmlFor="password" className="label">Password</label>
                         <label htmlFor="password" className="inputLogin">
                                <div id="insertBox">
                                    <a id="icon"><i className="fa-solid fa-unlock-keyhole"></i></a>
                                    <input id="password" name="passowrd" type="text" placeholder=" Password" autoComplete="off"></input>
                                </div>
                         </label>
                         <p className="error">Wrong username or password.</p>
                    </div>
                    <button className="btn">เข้าสู่ระบบ</button>
               </div>
          </div> 
     );
}