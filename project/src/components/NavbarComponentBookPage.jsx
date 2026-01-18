import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import bookIcon from "../images/book_2_37dp_000000_FILL0_wght400_GRAD0_opsz40 1.png";
import avatar from "../images/Generic avatar.png";
import notifications from "../images/notifications.png";
import shopingcart from "../images/Shopping cart.png";

const MyAppNavBookpage = () => {
    return (
        <nav className="myapp-nav">
            <div className="nav-right">
                <img src={avatar} alt="avatar" align="right" className="avatar"/>
            </div>
            
        </nav>
    );
}

export default MyAppNavBookpage;