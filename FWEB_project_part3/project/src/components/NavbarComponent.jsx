import { NavLink, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import bookIcon from "../images/book_2_37dp_000000_FILL0_wght400_GRAD0_opsz40 1.png";
import avatar from "../images/Generic avatar.png";
import notifications from "../images/notifications.png";
import shopingcart from "../images/Shopping cart.png";

const MyAppNav = () => {
    const books = [
        { id: "1", title: "Book 1", Language: "English",Description: "Book 1 is a book.",author: "John Doe",published_date: "2020-01-01" },
        { id: "2", title: "Book 2", Language: "school",Description: "Book 2 is a book.",author: "Jane Doe",published_date: "2020-01-01" },
        { id: "3", title: "Book 3", Language: "tech",Description: "Book 3 is a book.",author: "sam",published_date: "2020-01-01" },
    ];
    const { bookid } = useParams();
    const activeBook = bookid || books[0].id;
    
    const navigate = useNavigate();

    return (
        <nav className="myapp-nav">
            <div className="nav-right">
                <img src={avatar} alt="avatar" align="right" className="avatar"/>
            </div>
            {/* <NavLink to={`/book/${activeBook}/reservation-list/r1`} className="icon-link">
            
                <div class="container text-center1">
                    <div class="row1">
                        <div class="col1">
                            <img src={shopingcart} align="right" alt="reservations" alttext="Reservation" className="icon"/>
                            <span className="icon-label">Reservation</span>
                        </div>
                    </div>
                        </div>
            </NavLink> */}
            <NavLink to={`/book/${activeBook}/reservation-list/r1`} className="icon-link">
            
                <div class="container text-center1">
                    <div class="row1">
                        <div class="col1">
                            <img src={shopingcart} align="right" alt="reservations" alttext="Reservation" className="icon"/>
                            <span className="icon-label">Reservation</span>
                        </div>
                    </div>
                        </div>
            </NavLink>
            <img src={notifications} alt="notifications"  className="icon"/>
        </nav>
    );
}

export default MyAppNav;