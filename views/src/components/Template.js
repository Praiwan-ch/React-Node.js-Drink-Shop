import '../Template.css';
import { React, useEffect, useState } from 'react';
import NavPage from './NavPage'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function Template() {
     // Set axios default baseURL 
     axios.defaults.baseURL = 'http://localhost:4000';

     const navigate = useNavigate();

     const [user, setUser] = useState('')
     
     const clearAuth = ()=>{
        
          axios.get('/logout').then((res)=>{
               if(res.data){
                     navigate('/Login') 
               }
          }) 
     }
     

     useEffect(()=>{
          const auth = ()=>{
               axios.get('/auth').then((res)=>{
                    if(res.data){
                         setUser(res.data)
                    }else{
                         navigate('/Login') 
                    }
               })
          }

          auth()
     },[])
     
     return (
          <div className="manage">
               <div className="background">
                    <div className="shape shape1"></div>
                    <div className="shape shape2"></div>
                    <div className="shape shape3"></div>
                    <div className="shape shape4"></div>
               </div>
               <div className="profile" id="logout" onClick={logout}>
                              <img className="img-profile" src="https://as1.ftcdn.net/v2/jpg/03/16/12/52/1000_F_316125289_3GTL3Yd9JVQz3Nw50uAEEkOpX6GvK0LE.jpg" alt=''/>
                              <div className="profile-content">
                                   <p className="profile-name">{user}</p>
                                   <p className="profile-role">Sensei</p>
                              </div>
                         </div>
               <div className="manage-content" onClick={tmp}>
                    <div className="header">
                         <div className="shop-name">I NEED SOMETHING HERE <i className="fa-solid fa-shop"></i></div>
                    </div>
                    <div className="main-content">
                         <div className="side-bar">
                              <div className="list-menu">
                                   <NavLink to={"./Manage"}>
                                        <div className="list-item" onClick={e=>listMenu(e) } id="Manage"><i className="fa-solid fa-list-check icon" aria-disabled></i><span className="link-text">จัดการเมนู</span></div>
                                   </NavLink>
                                   <NavLink to={"./Add"}>
                                        <div className="list-item" onClick={e=>listMenu(e)} id="Add"><i className="fa-solid fa-plus icon iconsF" aria-disabled></i><span className="link-text">เพิ่มเมนู</span></div>
                                   </NavLink>
                                   <NavLink to={"/Shop"}>
                                        <div className="list-item" onClick={e=>listMenu(e)}><i className="fa-solid fa-store icon" aria-disabled></i><span className="link-text">ร้าน</span></div>
                                   </NavLink>
                              </div>
                         </div>
                         {/*----- Main content -----*/}
                         <div className="display-content" id="display-content">
                              <NavPage/>
                         </div>
                         {/*----- Main content -----*/}
                    </div>
                    <div className="logout" id="modal-logout">
                         {/* <NavLink to={"/Login"}> */}
                              <div className="logout-btn" 
                                   onClick={()=>{
                                        clearAuth()
                                   }}
                              ><i className="fa-solid fa-right-from-bracket icon"></i>Logout</div>
                         {/* </NavLink> */}
                    </div>
               </div>
          </div>
          
     );
     
     function logout() {
          let logout = document.getElementById('modal-logout')
          logout.classList.toggle('active-logout')
     }

     function tmp() {
          let logout = document.getElementById('modal-logout')
          window.addEventListener('click', (event)=>{
               let e = event.target.classList[0]
               if(!(e === 'profile' || e === 'profile-name' || e === 'profile-role' || e === 'img-profile' || e === 'logout')){
                    logout.classList.remove('active-logout')
               }
          })
     }

     function listMenu(params){
          let menu = document.getElementsByClassName('list-item')
          for (let i=0; i<menu.length; i++) {
               menu[i].classList.remove('active-menu')
          }
          params.target.classList.add('active-menu')
     }
}