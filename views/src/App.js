import './Template.css';
import React from "react";
import Template from './components/Template';
import Login from './components/Login';
import { BrowserRouter } from "react-router-dom";

function App(){
    return(
        <React.Fragment>
            <BrowserRouter>
                {/* <Login/> */}
                <Template/>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;