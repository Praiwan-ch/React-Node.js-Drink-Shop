import React from "react";
import '../App.css';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:4000';

export default function Main(props){
    const [menu, setMenu]= useState([])

    const navigate = useNavigate()

    let current_menu = []

    const getMenu = ()=>{
        axios.get('/getMenu/all').then((Response)=>{
            setMenu(Response.data)
        })
    }
    const getMenuHot = ()=>{
        axios.get('/getMenu/Hot').then((Response)=>{
            setMenu(Response.data)
        })
    }
    const getMenuIced = ()=>{
        axios.get('/getMenu/Iced').then((Response)=>{
            setMenu(Response.data)
        })
    }
    const getMenuFrappe = ()=>{
        axios.get('/getMenu/Frappe').then((Response)=>{
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
                            <input id='searchInput' type='text' placeholder='ค้นหา...' autoComplete='off' 
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
                                        <div className='card' key={val.menu_id.toString()}>
                                            <div className='img'>
                                                <img src={'./image/'+val.menu_image} alt={val.menu_image}></img>
                                            </div>
                                            <div className='label-item'>
                                                <p className="menu-name">{val.menu_name}</p>
                                                <span className="menu-price">{val.menu_price} ฿</span>
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
                        <tbody>
                            <tr className='table-row'>
                                <td className='amount'>x1</td>
                                <td className='name'>Americano</td>
                                <td className='price'>50 ฿</td>
                            </tr>
                            <tr className='table-row'>
                                <td className='amount'>x2</td>
                                <td className='name'>Green Tea</td>
                                <td className='price'>200 ฿</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr size='2'></hr>
                <div className='footer'>
                    <div className='tag'>SUBTOTAL</div>
                    <div className='total'>250 ฿</div>
                </div>
                <div className='footer'>
                    <div className='tag'>TOTAL</div>
                    <div className='total'>250 ฿</div>
                </div>
                <div className='footer button'>
                    <button className='order' >CANCEL</button>
                    <button className='order' >ORDERING</button>
                </div>
            </div>
        </div>
    );

    function send_object(val){
        current_menu.push(val)
        console.log(current_menu);
    }
}