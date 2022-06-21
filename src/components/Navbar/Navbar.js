import React from 'react'
import {Nav, NavLink, NavMenu} from './NavbarElements'

const Navbar = () =>{
    return(
       <React.Fragment>
           <Nav>
               <NavMenu>
                   <NavLink to="/users" >
                        USERS
                   </NavLink>
                   <NavLink to="/videos" >
                        VIDEOS
                   </NavLink>
               </NavMenu>
           </Nav>


       </React.Fragment>
        
    )
}


export default Navbar;



/* const Navbar = () =>{
    return(
        <div className="row">
            <nav className="navbar navbar-default" role="navigation">
                <div className="navbar-header">
                    header
                    <button type="button" className="navbar-toggle" data-toggle='collapse' data-target=".navbar-ex1-collapse">
                        <span className="sr-only">Desplegar</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>  
                    <a className="navbar-brand">Ejemplo</a>  
                </div>
                <div className="collapse navbar-collapse navbar-ex1-collapse">
                    <ul className="nav navbar-nav">
                         
                    </ul>

                </div>
            </nav>
        </div>
        
    )
} */

