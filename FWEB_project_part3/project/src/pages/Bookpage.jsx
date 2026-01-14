import { useParams } from "react-router";
import React from "react";
import bookIcon from "../images/book_2_37dp_000000_FILL0_wght400_GRAD0_opsz40 1.png";
import { NavLink } from "react-router";
import { Link, useSearchParams,useNavigate } from "react-router";
import MyAppNavBookpage from "../components/NavbarComponentBookPage";
import { useState, useEffect } from "react";

// const books = [
//         { id: "1", title: "Book 1", Language: "English",Description: "Book 1 is a book.",author: "John Doe",published_date: "2020-01-01" },
//         { id: "2", title: "Book 2", Language: "school",Description: "Book 2 is a book.",author: "Jane Doe",published_date: "2020-01-01" },
//         { id: "3", title: "Book 3", Language: "tech",Description: "Book 3 is a book.",author: "sam",published_date: "2020-01-01" },
//     ];

const Bookpage = () => {
    // 2. Create state variable: Books
    const [book, setBooks] = useState([null]);
    // 3. Use the Navigate hook to navigate between pages
    const navigate = useNavigate();
    const { bookid } = useParams();
    // 4. Use useEffect to fetch data from the JSON server
    useEffect(() => {
    const loadBooksbyid = async () => {
        try {
            const res = await fetch(`http://localhost:5050/book/${bookid}`);
            if (!res.ok) throw new Error("Failed to fetch books");
            const data = await res.json();
            // Store data in books state
            setBooks(data);
        } catch (e) {
            console.error("Error fetching stalls:", e.message);
        }
    };
    loadBooksbyid();
    }, [bookid]);   
    
    // const book = books.find((b) => b.id === bookid);
    
        return (
        <div class="container text-center">
            <MyAppNavBookpage />
            <Link to={`/`} className="btn-signout">Back</Link>
            <br></br>
            <br></br>
            <br></br>
            
            <img src={bookIcon} alt="Book Cover" style={{ alignItems: "center" }} />
            
            <h1 style={{ textAlign: "center" }}>{book.title}</h1>
                        <div class="row">
                            <div class="col">
                                <strong>Description</strong>
                                <p>{book.Description}</p>
                                <strong>Author</strong>
                                <p>{book.author}</p>
                            </div>
                            
                            <div class="col">
                                <strong>Language</strong>
                                <p>{book.Language}</p>
                                <strong>Published Date</strong>
                                <p>{book.published_date}</p>
                            </div>
                            
                            
                        </div>
            <div style={{marginTop: 20, gap: 12, display: "flex", justifyContent: "center"}}>
                <Link to={`/book/${bookid}/reservation-list`} className="btn" style={{backgroundColor: "lightgrey"}}>Reserve</Link>
                {' '}
                <Link to={`/book/${bookid}/availability`} className="btn" style={{backgroundColor: "lightgrey"}}>Availability</Link>
            </div>
        </div>
        
                    
        );
    
};

export default Bookpage;