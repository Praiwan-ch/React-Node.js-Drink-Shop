import React from "react";
import '../Template.css';

export default function Manage() {
     return(
          <div>
               <p className="title-content">เพิ่มเมนู</p>
               <div className="content-add">
                    <div className="wrap-input">
                         <label htmlFor="name-menu">ชื่อสินค้า</label>
                         <input type="text" id="name-menu" className="input-add" required></input>
                    </div>
                    <div className="wrap-input">
                         <label htmlFor="type">ประเภท</label>
                         <select name="type" id="type" className="select" required>
                              <option value='0'>Hot</option>
                              <option value='1'>Cold</option>
                              <option value='2'>Frappe</option>
                         </select>
                    </div>
                    <div className="wrap-input">
                         <label htmlFor="price">ราคา</label>
                         <input type="text" id="price" className="input-add" required></input>
                    </div>
                    <div className="wrap-input">
                         <label htmlFor="input-image" className="label-input-img">รูปสินค้า</label>
                         <label htmlFor="input-image">
                              <div className="input-image">
                                   <input type="file" id="input-image" name="image" hidden></input>
                              </div>
                         </label>
                    </div>
               </div>
          </div>
     );
}