import {React, useState, useEffect} from "react";
import axios from 'axios';
import '../Template.css';
import 'bootstrap/dist/css/bootstrap.css'
import Swal from 'sweetalert2'
import $ from 'jquery'

export default function Manage() {
     // Set axios default baseURL 
     axios.defaults.baseURL = 'http://localhost:4000';
     const [type, setType]= useState([])

     const [menuInfo, setMenuInfo] = useState([])
     const [menu, setMenu] = useState([])

     // Get all menu
     const getMenu = ()=>{
          axios.get('/getMenu/all').then((Response)=>{
              setMenu(Response.data)
          })
     }

     // Search menu
     const searchMenu = val =>{
          const data = { search: val }
          axios.post('/getMenu/Search', data).then((res) => {
              setMenu(res.data)
          })
          .catch(err => {
              console.error(err)
          })
     }
     let [menu_id, setMenu_id] = useState('')
     let [menu_name, setMenu_name] =  useState("")
     let [menu_price, setMenu_price] = useState("")
     let [menu_type_id, setMenu_type_id] = useState("1")
     let [menu_image, setMenu_image] = useState("")

     const addMenu = ()=>{
          axios.put('/addMenu', {
               menu_name:     menu_name,
               menu_price:    menu_price,
               menu_type_id:  menu_type_id,
               menu_image:    menu_image
          }).then((res)=>{
               handleUpload()
               setMenuInfo([
                    ...menuInfo,
                    {
                         menu_name:     menu_name,
                         menu_price:    menu_price,
                         menu_type_id:  menu_type_id,
                         menu_image:    menu_image 
                    }
               ])
               if(res.data){
                    Swal.fire({
                         title: 'เพิ่มข้อมูลสำเส็จ',
                         icon: 'success',
                         confirmButtonText: 'ตกลง',
                         confirmButtonColor: '#71DC88',
                    })  
               }else{
                    Swal.fire({
                         title: 'เพิ่มข้อมูลไม่สำเส็จ',
                         text: 'กรุณาลองอีกครั้ง',
                         icon: 'warning',
                         confirmButtonText: 'ยกเลิก',
                         confirmButtonColor: '#B9B9B9',
                    })
               }
          })
     }

     const checkInput = ()=>{
          if(menu_name == '' || menu_price == '' || menu_type_id == '' || menu_image == ''){
               Swal.fire({
                    title: 'ข้อมูลไม่ครบ!',
                    text: 'กรุณาตรวจสอบการกรอกข้อมูล',
                    icon: 'warning',
                    confirmButtonText: 'ยกเลิก',
                    confirmButtonColor: '#B9B9B9',
               })
          }else{
               updateMenu()
          }
     }

     let [file, setFile] = useState()

     const handleSelectFile = val => {
          setFile(val)
     }

     const handleUpload = () => {
          const data = new FormData()
          data.append('file',file)
          console.log(data);
          axios.post('/upload',data).then(res => {
               if(res){
                    Swal.fire({
                         title: 'อัพโหลดรูปไม่สำเร็จ!',
                         text: 'กรุณาลองอีกครั้ง',
                         icon: 'warning',
                         confirmButtonText: 'ยกเลิก',
                         confirmButtonColor: '#B9B9B9',
                    })
               }
          })
     }

     const [image, setImage] = useState()
     const onImageChange = (event) => {
          if (event.target.files && event.target.files[0]) {
               setImage(URL.createObjectURL(event.target.files[0]))
          }
     }

     const getType = ()=>{
          axios.get('/getType').then((Response)=>{
               setType(Response.data)
          })
     }

     const handleEdit = (val)=>{
          setMenu_id(val.menu_id)
          setMenu_name(val.menu_name)
          setMenu_price(val.menu_price)
          setMenu_type_id(val.menu_type_id)
          setMenu_image(val.menu_image)
     }

     const updateMenu = ()=>{
          axios.post('/updateMenu', {
               menu_id:       menu_id,
               menu_name:     menu_name,
               menu_price:    menu_price,
               menu_type_id:  menu_type_id,
               menu_image:    menu_image
          }).then((res)=>{
               updateImage()
               setMenuInfo([
                    ...menuInfo,
                    {
                         menu_id:       menu_id,
                         menu_name:     menu_name,
                         menu_price:    menu_price,
                         menu_type_id:  menu_type_id,
                         menu_image:    menu_image 
                    }
               ])
               if(!res.data){
                    Swal.fire({
                         title: 'แก้ไขข้อมูลไม่สำเส็จ',
                         text: 'กรุณาลองอีกครั้ง',
                         icon: 'warning',
                         confirmButtonText: 'ยกเลิก',
                         confirmButtonColor: '#B9B9B9',
                    })
               }else{
                    Swal.fire({
                         title: 'แก้ไขข้อมูลสำเส็จ',
                         icon: 'success',
                         confirmButtonText: 'ตกลง',
                         confirmButtonColor: '#71DC88',
                    }) 
               }
          })
     }

     const updateImage = ()=>{
          if(file != ''){
               uploadImage()
          }else{
               Swal.fire({
                    title: 'อัพโหลดรูปไม่สำเร็จ!',
                    text: 'กรุณาลองอีกครั้ง',
                    icon: 'warning',
                    confirmButtonText: 'ยกเลิก',
                    confirmButtonColor: '#B9B9B9',
               })
          }
     }

     const uploadImage = ()=>{
          let data = new FormData()
          data.append('file',file)
          if(file){
               axios.post('/updateImage',data)
          }else{
               Swal.fire({
                    title: 'อัพโหลดรูปไม่สำเร็จ!',
                    text: 'กรุณาลองอีกครั้ง',
                    icon: 'warning',
                    confirmButtonText: 'ยกเลิก',
                    confirmButtonColor: '#B9B9B9',
               })
          }
     }

     useEffect(()=>{
          getMenu()
          getType()
     },[])

     return(
          <div>
               <div>
                    <p className="title-content">จัดการเมนู</p>
                    <label htmlFor="search-menu" className="label-search">
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
                                   menu.map((val, index)=>{
                                        return (
                                             <tr key={val.menu_id.toString()}>
                                                  <td>{index+1}</td>
                                                  <td>{val.menu_name}</td>
                                                  <td>{val.menu_type_name}</td>
                                                  <td>{val.menu_price}</td>
                                                  <td>
                                                       <div className="table-img">
                                                            <img src={'../../image/'+val.menu_image}></img>
                                                       </div>
                                                  </td>
                                                  <td>
                                                       <div className="btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                            onClick={()=>{
                                                                 // App(val.menu_id)
                                                                 handleEdit(val)
                                                                 edit()
                                                            }}
                                                       >
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
               <div className="modal modal-lg fade" id="exampleModal" tabIndex="99" aria-hidden="true" data-bs-focus="true" data-bs-backdrop="false">
                    <div className="modal-dialog">
                         <div className="modal-content">
                              <div className="modal-header">
                                   <h5 className="modal-title" id="exampleModalLabel">แก้ไขรายละเอีดเมนู</h5>
                                   <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                              <div className="content-add">
                                   <div className="flex">
                                        <div className="mr-400">
                                             <div className="wrap-input">
                                                  <label htmlFor="name-menu">ชื่อสินค้า<span className="required"><sup><b>*</b></sup></span></label>
                                                  <input type="text" id="name-menu" value={menu_name} className="input-add" required
                                                       onInput={
                                                            e => {
                                                                 setMenu_name(e.target.value)
                                                            }
                                                       }>
                                                  </input>
                                             </div>
                                             <div className="wrap-input">
                                                  <label htmlFor="type">ประเภท<span className="required"><sup><b>*</b></sup></span></label>
                                                  <select name="type" id="type" className="select" required
                                                       onChange={
                                                            e => {setMenu_type_id(e.target.value)}
                                                       }>
                                                       {
                                                            type.map((val)=>{
                                                                 return (
                                                                      <option key={val.menu_type_id.toString()} value={val.menu_type_id}>{val.menu_type_name}</option>
                                                                 )
                                                            })
                                                       }
                                                  </select>
                                             </div>
                                             <div className="wrap-input">
                                                  <label htmlFor="price">ราคา<span className="required"><sup><b>*</b></sup></span></label>
                                                  <input type="text" id="price" value={menu_price} className="input-add" required
                                                       onChange={
                                                            e => {setMenu_price(e.target.value)}
                                                       }>
                                                  </input>
                                             </div>
                                        </div>
                                        <div className="mr-400">
                                             <div className="wrap-input">
                                                  <label htmlFor="input-image" className="">รูปสินค้า<span className="required"><sup><b>*</b></sup></span></label>
                                                  <label htmlFor="input-image">
                                                       <div className="input-image">
                                                            <input type="file" id="input-image" name="image" accept="image/*" hidden
                                                                 onChange={
                                                                      e => {
                                                                           setMenu_image(e.target.value)
                                                                           imageOutput(e.target.value)
                                                                           handleSelectFile(e.target.files[0])
                                                                           onImageChange(e)
                                                                           $('#image-edit').css("display", "none");
                                                                      }
                                                                 }>
                                                            </input>
                                                            <div className="alt-image" id="alt-image">
                                                                 <i className="fa-solid fa-image"></i>
                                                                 <p>เพิ่มรูป</p>
                                                            </div>
                                                            <img className="image-edit" id="image-edit" src={'../../image/'+menu_image}/>
                                                            <img className="image-output" id="image-output" src={image}/>
                                                       </div>
                                                  </label>
                                             </div>
                                                  <button className="clear-image"
                                                       onClick={()=>{
                                                            setMenu_image('')
                                                            $('#input-image').val('')
                                                            imageOutput($('#input-image').val());
                                                            $('#image-edit').css("display", "none");
                                                       }}>Clear Image
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div className="modal-footer">
                                   <button type="button" className="btn-cancel" data-bs-dismiss="modal">Close</button>
                                   <button type="button" className="btn-submit-edit" 
                                        onClick={()=>{
                                                  checkInput()
                                             }
                                        }
                                   >Save changes</button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );

     function edit() {
          $('#image-edit').css("display", "block")
          $('#alt-image').css("display", "none")
          $('#image-output').css("display", "none")
     }

     function imageOutput(params) {
          if(params){
               $('#image-output').css("display", "block")
               $('#alt-image').css("display", "none")
          }else{
               $('#image-output').css("display", "none")
               $('#alt-image').css("display", "block")
          }
     }
}