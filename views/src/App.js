import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
    return ( 
       <section>

            <div class="bar">
                <button class="toggle-menu" id="toggle-menu">|||</button>
            </div>

            <div class="main" id="main">
                <div class="header">
                    <h4>ชื่อร้าน</h4>
                    <div class="search">
                        <label for="searchInput">
                            <div id="searchBox">
                                <a id="searchIcon"><i class="bi bi-search"></i></a>
                                <span id="searchIcon2">|</span>
                                <input id="searchInput" type="text" placeholder="ค้นหา..." autocomplete="off"></input>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="nav">
                    <button class="btn">HOT</button>
                    <button class="btn">COLD</button>
                    <button class="btn">FRAPPE</button>
                </div>

                <div class="menu">
                    <div class="card">
                        <div class="img">
                            <img src="https://mbpra.com/img/empty.jpg"></img>
                        </div>
                        <div class="label-item">
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="img">
                            <img src="https://mbpra.com/img/empty.jpg"></img>
                        </div>
                        <div class="label-item">
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="img">
                            <img src="https://mbpra.com/img/empty.jpg"></img>
                        </div>
                        <div class="label-item">
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="img">
                            <img src="https://mbpra.com/img/empty.jpg"></img>
                        </div>
                        <div class="label-item">
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>

                    <div class="card">
                        <div class="img">
                            <img src="https://mbpra.com/img/empty.jpg"></img>
                        </div>
                        <div class="label-item">
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="img">
                            <img src="https://mbpra.com/img/empty.jpg"></img>
                        </div>
                        <div class="label-item">
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="img">
                            <img src="https://mbpra.com/img/empty.jpg"></img>
                        </div>
                        <div class="label-item">
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="img">
                            <img src="https://mbpra.com/img/empty.jpg"></img>
                        </div>
                        <div class="label-item">
                            <p>Americano</p>
                            <span>50 ฿</span>
                        </div>
                    </div>
                </div>
            </div>

            
            <div class="bill" id="bill">
                <h4>ORDER</h4>

                <div class="list">
                    <table>
                        <tr class="table-row">
                            <td class="amount">x1</td>
                            <td class="name">Americano</td>
                            <td class="price">50 ฿</td>
                        </tr>
                        <tr class="table-row">
                            <td class="amount">x2</td>
                            <td class="name">Green Tea</td>
                            <td class="price">200 ฿</td>
                        </tr>
                    </table>
                </div>

                <hr size="2"></hr>
                <div class="footer">
                    <div class="tag">SUBTOTAL</div>
                    <div class="total">250 ฿</div>
                </div>
                <div class="footer">
                    <div class="tag">TOTAL</div>
                    <div class="total">250 ฿</div>
                </div>
                <div class="footer button">
                    <button class="order">CANCEL</button>
                    <button class="order">ORDERING</button>
                </div>
            </div>
       </section>
    );
}
export default App;