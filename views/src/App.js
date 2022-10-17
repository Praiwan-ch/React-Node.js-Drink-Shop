import './Template.css';
import React from "react";
import Home from './components/Template';
import Login from './components/Login';
import Shop from './components/Shop';
import { Routes, Route, BrowserRouter} from "react-router-dom";

function App(){
    return(
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<Login/>}/>
                    <Route path="/Home/*" element={<Home auth={true}/>}/>
                    <Route path="/Shop/*" element={<Shop/>}/>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;