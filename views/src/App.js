import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
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
        <section>
           
            <div className='bar'>
                <button className='toggle-menu' id='toggle-menu'>|||</button>
            </div>

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

            
            <div className='bill' id='bill'>
                <h4>ORDER</h4>

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
                    <button className='order' onClick={modal}>CANCEL</button>
                    <button className='order' onClick={modal}>ORDERING</button>
                </div>
            </div>
        </section>
    );
    
}

function modal() {
    alert('Test');
}


export default App;