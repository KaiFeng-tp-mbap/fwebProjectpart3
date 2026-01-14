import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import bookIcon from "../images/book_2_37dp_000000_FILL0_wght400_GRAD0_opsz40 1.png";
import avatar from "../images/Generic avatar.png";
import notifications from "../images/notifications.png";
import shopingcart from "../images/Shopping cart.png";
import home from "../images/home.png";

const MyAppNavReserve = () => {
    return (
        <nav className="myapp-nav">
            <div className="nav-right-reserve">
                Book Reserved
            </div>
            <NavLink to="/" className="icon-link">
                <div class="home">
                    <div class="row1">
                        <div class="col1">
                            <img src={home} align="right" alt="home" alttext="home" className="icon"/>
                            
                        </div>
                    </div>
                        </div>
            </NavLink>
            <img src={avatar} alt="avatar" align="right" className="avatar"/>
        </nav>
    );
}

export default MyAppNavReserve;