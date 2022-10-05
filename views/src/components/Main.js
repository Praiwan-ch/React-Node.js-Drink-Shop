import React from "react";
import '../App.css';
import axios from 'axios';
import { useState, useEffect, useDeferredValue } from 'react';

export default function Main(props){
    const [menu, setMenu]= useState([])

    const getMenu = ()=>{
        axios.get('http://localhost:4000/getMenu/all').then((Response)=>{
            setMenu(Response.data)
        })
    }
    const getMenuHot = ()=>{
        axios.get('http://localhost:4000/getMenu/Hot').then((Response)=>{
            setMenu(Response.data)
        })
    }
    const getMenuIced = ()=>{
        axios.get('http://localhost:4000/getMenu/Iced').then((Response)=>{
            setMenu(Response.data)
        })
    }
    const getMenuFrappe = ()=>{
        axios.get('http://localhost:4000/getMenu/Frappe').then((Response)=>{
            setMenu(Response.data)
        })
    }
    
    const searchMenu = (search)=>{
        axios.post('http://localhost:4000/getMenu/Search', {search: search}).then((Response)=>{
            setMenu(Response.data)
        })
    }

    useEffect(() => {
        getMenu()
    },[]);


    return (
    
        

        <div className='main' id='main'>
                <div className='header'>
                    <h4>"San-kai" Drink's Shop</h4>
                    <div className='search'>
                        <label htmlFor='searchInput'>
                            <div id='searchBox'>
                                <span id='searchIcon'><i className='bi bi-search'></i></span>
                                <span id='searchIcon2'>|</span>
                                <input id='searchInput' type='text' placeholder='ค้นหา...' autoComplete='off' 
                                    // onInput={(event)=>{
                                    //     searchMenu(event.target.value)
                                    // }}
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
                                        <span>{val.menu_price} ฿</span>
                                    </div>
                                    </div>
                                )
                        })
                    }
                </div>
        </div>

    

    


        
        
    
    );
}