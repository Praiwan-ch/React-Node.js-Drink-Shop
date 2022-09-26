import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
    return ( 
        <section>

            <div className='bar'>
                <button className='toggle-menu' id='toggle-menu'>|||</button>
            </div>

            <div className='main' id='main'>
                <div className='header'>
                    <h4>ชื่อร้าน</h4>
                    <div className='search'>
                        <label htmlFor='searchInput'>
                            <div id='searchBox'>
                                <a id='searchIcon'><i className='bi bi-search'></i></a>
                                <span id='searchIcon2'>|</span>
                                <input id='searchInput' type='text' placeholder='ค้นหา...' autoComplete='off'></input>
                            </div>
                        </label>
                    </div>
                </div>

                <div className='nav'>
                    <button className='btn'>HOT</button>
                    <button className='btn'>COLD</button>
                    <button className='btn'>FRAPPE</button>
                </div>

                <div className='menu'>
                    <div className='card'>
                        <div className='img'>
                            <img src='https://mbpra.com/img/empty.jpg'></img>
                        </div>
                        <div className='label-item'>
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='img'>
                            <img src='https://mbpra.com/img/empty.jpg'></img>
                        </div>
                        <div className='label-item'>
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='img'>
                            <img src='https://mbpra.com/img/empty.jpg'></img>
                        </div>
                        <div className='label-item'>
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='img'>
                            <img src='https://mbpra.com/img/empty.jpg'></img>
                        </div>
                        <div className='label-item'>
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='img'>
                            <img src='https://mbpra.com/img/empty.jpg'></img>
                        </div>
                        <div className='label-item'>
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='img'>
                            <img src='https://mbpra.com/img/empty.jpg'></img>
                        </div>
                        <div className='label-item'>
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='img'>
                            <img src='https://mbpra.com/img/empty.jpg'></img>
                        </div>
                        <div className='label-item'>
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='img'>
                            <img src='https://mbpra.com/img/empty.jpg'></img>
                        </div>
                        <div className='label-item'>
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
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