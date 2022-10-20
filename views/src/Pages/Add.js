import {React, useState, useEffect} from "react";
import axios from 'axios';
import '../Template.css';
import Swal from 'sweetalert2'
import $ from 'jquery'

export default function Manage() {
     // Set axios default baseURL 
     axios.defaults.baseURL = 'http://localhost:4000';
      
     // Menu type 
     const [type, setType]= useState([])

     const [menuInfo, setMenuInfo] = useState([])

     // Get all type of menu
     const getType = ()=>{
          axios.get('/getType').then((Response)=>{
               setType(Response.data)
          })
     }

     // New menu info
     let [menu_name, setMenu_name] =  useState("")
     let [menu_price, setMenu_price] = useState("")
     let [menu_type_id, setMenu_type_id] = useState("1")
     let [menu_image, setMenu_image] = useState("")
     

     // Add new menu
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
                    }).then((result)=>{
                         if(result.isConfirmed){
                              window.location.reload()
                         }
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
          if(menu_name === '' || menu_price === '' || menu_type_id === '' || menu_image === ''){
               Swal.fire({
                    title: 'ข้อมูลไม่ครบ!',
                    text: 'กรุณาตรวจสอบการกรอกข้อมูล',
                    icon: 'warning',
                    confirmButtonText: 'ยกเลิก',
                    confirmButtonColor: '#B9B9B9',
               })
          }else{
               addMenu()
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
               if(!res){
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

     useEffect(()=>{
          getType()
     },[])

     return(
          <div>
               <p className="title-content">เพิ่มเมนู</p>
               <div className="content-add">
                    <div className="flex">
                         <div className="mr-400">
                              <div className="wrap-input">
                                   <label htmlFor="name-menu">ชื่อสินค้า<span className="required"><sup><b>*</b></sup></span></label>
                                   <input type="text" id="name-menu" className="input-add" required
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
                                   <input type="text" id="price" className="input-add" required
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
                                                       }
                                                  }>
                                             </input>
                                             <div className="alt-image" id="alt-image">
                                                  <i className="fa-solid fa-image"></i>
                                                  <p>เพิ่มรูป</p>
                                             </div>
                                             <img className="image-output" id="image-output" src={image}/>
                                        </div>
                                   </label>
                              </div>
                              <button className="clear-image"
                                        onClick={()=>{
                                             setMenu_image('')
                                             $('#input-image').val('')
                                             imageOutput($('#input-image').val());
                                        }}
                                   >Clear Image</button>
                         </div>
                    </div>

                    <button className="add-btn" 
                         onClick={e => {
                              checkInput()
                         }}>
                         เพิ่มเมนู
                    </button>
               </div>
          </div>
     );

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