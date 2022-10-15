import React from "react";
import styleApp from '../App.css';
import axios from 'axios';
import { useState, useEffect} from 'react';

axios.defaults.baseURL = 'http://localhost:4000';

export default function Main(props){
    const [menu, setMenu]= useState([])

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
        <div className='main' id='main'>
            <div className={styleApp}></div>
            <div className='header'>
                <h4>"San-kai" Drink's Shop</h4>
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
            </div>

            
            <div className='nav'>
                <button className='btn' onClick={getMenu}>ALL</button>
                <button className='btn' onClick={getMenuHot}>HOT</button>
                <button className='btn' onClick={getMenuIced}>ICED</button>
                <button className='btn' onClick={getMenuFrappe}>FRAPPE</button>
            </div>
            
            <div className='menu'>
                {

                    menu.map((val)=>{
                        return (
                            <div className='card'>
                                <div className='img'>
                                    <img src={'./image/'+val.menu_image} alt={val.menu_image}></img>
                                </div>
                                <div className='label-item'>
                                    <p>{val.menu_name}</p>
                                    <div className="btn-group">
                                        <span>{val.menu_price} ฿</span>
                                        <div className="btn-card" id={val.menu_id}  
                                            onClick={()=>{
                                            send_object(val)
                                        }}></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );

    function send_object(val){
        current_menu.push(val)
        console.log(current_menu);
    }
}