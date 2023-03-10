import React from "react";
import '../App.css';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery'
import Swal from 'sweetalert2'

axios.defaults.baseURL = 'http://localhost:4000';

export default function Shop(){
    const [menu, setMenu] = useState([])

    const navigate = useNavigate()

    // Get all menu
    const getMenu = ()=>{
        axios.get('/getMenu/all').then((Response)=>{
            setMenu(Response.data)
        })
    }

    // Get hot menu
    const getMenuHot = ()=>{
        axios.get('/getMenu/Hot').then((Response)=>{
            setMenu(Response.data)
        })
    }

    // Get iced menu
    const getMenuIced = ()=>{
        axios.get('/getMenu/Iced').then((Response)=>{
            setMenu(Response.data)
        })
    }

    // Get frappe menu
    const getMenuFrappe = ()=>{
        axios.get('/getMenu/Frappe').then((Response)=>{
            setMenu(Response.data)
        })
    }

    // Search Menu
    const searchMenu = val =>{
        const data = { search: val };
        axios.post('/getMenu/Search', data).then((res) => {
            setMenu(res.data)
        })
        .catch(err => {
            console.error(err);
        });
    }
    
    // Set state order
    let order = []

    var index = 0
    const handleOrder = (val)=>{
        let indexOrder = order.findIndex(order => order.menu_id === val.menu_id)
        if(indexOrder < 0){
            order[index] = {
                menu_id: val.menu_id,
                menu_name: val.menu_name,
                menu_price: val.menu_price,
                menu_amount: 1
            }
            index++
        }else{
            order[indexOrder] = {
                menu_id: val.menu_id,
                menu_name: val.menu_name,
                menu_price: val.menu_price,
                menu_amount: parseInt(order[indexOrder].menu_amount) + 1
            }
        }
        bill(val)
    }

    function test(){
        console.log("object");
    }

    const bill = (val)=>{
        $('#tbody').empty()
        let total = 0
        for(let i=0; i<order.length; i++){
            total = parseFloat(total) + (parseFloat(order[i].menu_amount)*parseFloat(order[i].menu_price))
            $('#tbody').append(
                `<tr class='table-row'>
                    <td class='amount'>x${order[i].menu_amount}</td>
                    <td class='name'>${order[i].menu_name}</td>
                    <td class='price'>${order[i].menu_price} ???</td>
                </tr>`
            )
        }
        // $('#tag-subtotal').text(total)
        $('#tag-total').text(total)
    }

    const handleCancel = ()=>{
        index = 0   
        order = []
        // $('#tag-subtotal').text(0)
        $('#tag-total').text(0)
        $('#tbody').empty()
        $('#tbody').append(
            `<tr class='table-row'>
                <td width="300px">--- Empty ---</td>
            </tr>`
        )
    }

    // Send Order to db
    const handleOrdering = ()=>{
        if(order.length){
            axios.post('/addReceipt/', order).then((res) => {
                if(res.data){
                    Swal.fire({
                        title: '???????????????????????????????????????????????????',
                        icon: 'success',
                        confirmButtonText: '????????????',
                        confirmButtonColor: '#71DC88',
                    }).then(()=>{
                        handleCancel()
                    })
                }else{
                    Swal.fire({
                        title: '????????????????????????????????????????????????????????????!',
                        text: '????????????????????????????????????????????????',
                        icon: 'warning',
                        confirmButtonText: '??????????????????',
                        confirmButtonColor: '#B9B9B9',
                   })
                }
            })
        }
    }

    useEffect(() => {
        const auth = ()=>{
            axios.get('/auth').then((res)=>{
                if(!res.data){
                    navigate('/Login') 
                }
            })
        }
        auth()
        getMenu()
    },[]);

    return (
        <div className="display-shop">
            <button className="btn-exit"
                onClick={ ()=>{
                        navigate('/Home/Manage')
                    }
                }
            >Back</button>
            <div className='main-shop'>
                <p className="title-shop">"San-kai" Drink's Shop</p>
                <div className='search'>
                    <label htmlFor='searchInput'>
                        <div id='searchBox'>
                            <span id='searchIcon'><i className='bi bi-search'></i></span>
                            <span id='searchIcon2'>|</span>
                            <input id='searchInput' type='text' placeholder='???????????????...' autoComplete='off' 
                                onInput={(event)=>{
                                    searchMenu(event.target.value)
                                }}
                            ></input>
                        </div>
                    </label>
                </div>

                <div className='nav'>
                    <button className='btn' onClick={getMenu}>ALL</button>
                    <button className='btn' onClick={getMenuHot}>HOT</button>
                    <button className='btn' onClick={getMenuIced}>ICED</button>
                    <button className='btn' onClick={getMenuFrappe}>FRAPPE</button>
                </div>

                <div className="scroll-menu">
                    <div className='menu'>
                        {
                            menu.map((val)=>{
                                return (
                                    <div className='card' key={val.menu_id.toString()} 
                                        onClick={
                                            ()=>{
                                                handleOrder(val)
                                            }
                                        }
                                        >
                                        <div className='img'>
                                            <img src={'./image/'+val.menu_image} alt={val.menu_image}></img>
                                        </div>
                                        <div className='label-item'>
                                            <p className="menu-name">{val.menu_name}</p>
                                            <span className="menu-price">{val.menu_price} ???</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='bill' id='bill'>
                <h4 className="order-title">ORDER</h4>
                <div className='list'>
                    <table>
                        <tbody id="tbody">
                            <tr className="table-row">
                                <td width="300px">--- Empty ---</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr size='2'></hr>
                {/* <div className='footer'>
                    <div className='tag'>SUBTOTAL</div>
                    <div className='total'><span id="tag-subtotal">0</span> ???</div>
                </div> */}
                <div className='footer'>
                    <div className='tag'>TOTAL</div>
                    <div className='total'><span id="tag-total">0</span> ???</div>
                </div>
                <div className='footer button'>
                    <button className='order' onClick={()=>{handleCancel()}}>CANCEL</button>
                    <button className='order' onClick={()=>{handleOrdering()}}>ORDERING</button>
                </div>
            </div>
        </div>
    );
}
