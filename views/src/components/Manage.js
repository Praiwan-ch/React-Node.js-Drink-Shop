import React from "react";
import '../Template.css';
import axios from 'axios';
import { useState, useEffect} from 'react';

export default function Manage() {

     const [menu, setMenu]= useState([])

     const getMenu = ()=>{
          axios.get('/getMenu/all').then((Response)=>{
              setMenu(Response.data)
          })
     }

     const searchMenu = val =>{
          const data = { search: val };
          axios.post('/getMenu/Search', data).then((res) => {
              setMenu(res.data)
          })
          .catch(err => {
              console.error(err);
          });
     }

     useEffect(() => {
          getMenu()
     },[]);

     return(
          <div>
               <p className="title-content">จัดการเมนู</p>
               <label htmlFor="search-menu">
                    <div className="search-menu">
                         <label htmlFor="search-menu">
                              <i className="fa-solid fa-magnifying-glass"></i>
                         </label>
                         <input type="text" id="search-menu" placeholder=" Search..."
                              onInput={(event)=>{
                                   searchMenu(event.target.value)
                               }}
                         ></input>
                    </div>
               </label>
               <table className="table">
                    <thead>
                         <tr>
                              <th>ลำดับ</th>
                              <th>ชื่อสินค้า</th>
                              <th>ประเภท</th>
                              <th>ราคา</th>
                              <th>ภาพสินค้า</th>
                              <th>ตัวดำเนินการ</th>
                         </tr>
                    </thead>
                    <tbody>
                         {
                              menu.map((val, key)=>{
                                   return (
                                        <tr key={val.menu_id.toString()}>
                                             <td>{val.menu_id}</td>
                                             <td>{val.menu_name}</td>
                                             <td>{val.menu_type_name}</td>
                                             <td>{val.menu_price}</td>
                                             <td>
                                                  <div className="table-img">
                                                       <img src={'/image/'+val.menu_image}></img>
                                                  </div>
                                             </td>
                                             <td>
                                                  <div className="btn-edit">
                                                       <i className="fa-solid fa-pen-to-square"></i>
                                                  </div>
                                                  <div className="btn-delete">
                                                       <i className="fa-solid fa-trash-can"></i>
                                                  </div>
                                             </td>
                                        </tr>
                                   )
                              })
                         }
                    </tbody>
               </table>
          </div>
     );
}