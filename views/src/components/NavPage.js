import React from "react";
import Add from '../Pages/Add'
import Manage from '../Pages/Manage'
import Login from './Login'
import { Routes, Route} from "react-router-dom";

const NavPage = () => {
     return (
          <React.Fragment>
               <div>
                    <Routes>
                         <Route path="/Manage" element={<Manage/>} />
                         <Route path="/Add" element={<Add/>} />
                    </Routes>
               </div>
          </React.Fragment>
     );
};
   
export default NavPage;
   