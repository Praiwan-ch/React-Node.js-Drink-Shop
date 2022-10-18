import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios';
import $ from 'jquery'
import '../Login.css';

export default function Login(){
    
     // Set default axios baseURL 
     axios.defaults.baseURL = 'http://localhost:4000';

     let navigate = useNavigate()

     // Set state username password
     const [username, setUsername] = useState('')
     const [password, setPassword] = useState('')

     // Send request to login 
     const handleSubmit = ()=>{
          axios.post('/login', {username: username, password:password}).then((res)=>{
               if(res.data){
                    navigate('/Home/Manage')
               }else{
                    setAlert()
               }
          })
     }

     // Alert login failed
     const setAlert = ()=>{
          Swal.fire({
               title: 'Login failed',
               text: 'กรุณาตรวจสอบข้อมูลอีกครั้ง',
               icon: 'error',
               confirmButtonText: 'ตกลง',
               confirmButtonColor: '#B9B9B9',
          })
     }

     return (
          <div className="login-bg">
               <div className="background">
                    <div className="shape shape1"></div>
                    <div className="shape shape2"></div>
                    <div className="shape shape3"></div>
                    <div className="shape shape4"></div>
               </div>
               <div className="login">
                    <img src="/Login.webp" className="img" alt=""></img>
                    <h2>Login</h2>
                    <div className="form">
                         <label htmlFor="username">Username</label>
                         <label htmlFor="username" className="inputLogin">
                                   <div id="insertBox">
                                        <span id="icon"><i className="fa-solid fa-circle-user"></i></span>
                                        <input id="username" name="username" type="text" placeholder=" Username" autoComplete="off"
                                        onInput={
                                             (e)=>{setUsername(e.target.value)}
                                        }
                                        ></input>
                                   </div>
                         </label>
                         <label htmlFor="password" className="label">Password</label>
                         <label htmlFor="password" className="inputLogin">
                                   <div id="insertBox">
                                        <span id="icon"><i className="fa-solid fa-unlock-keyhole"></i></span>
                                        <input id="password" name="password" type="password" placeholder=" Password" autoComplete="off"
                                        onInput={
                                             (e)=>{setPassword(e.target.value)}
                                        }
                                        ></input>
                                   </div>
                         </label>
                         <p className="error" id="err">Wrong username or password.</p>
                    </div>
                    <button className="btn-login"
                         onClick={()=>{handleSubmit()}}
                    >เข้าสู่ระบบ</button>
               </div>
          </div> 
     );

}