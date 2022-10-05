import React from "react";
import '../App.css';

export default function Basket(props){
   return (
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
                    <button className='order' >CANCEL</button>
                    <button className='order' >ORDERING</button>
                </div>
            </div>
   );
}