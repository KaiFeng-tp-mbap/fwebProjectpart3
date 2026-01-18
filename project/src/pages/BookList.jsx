import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router';
import bookIcon from "../images/book_2_37dp_000000_FILL0_wght400_GRAD0_opsz40 1.png";
import avatar from "../images/Generic avatar.png";
import notifications from "../images/notifications.png";
import shopingcart from "../images/Shopping cart.png";

import { useNavigate,Link, useSearchParams } from "react-router";
import { availabilityData } from "./AvailabilityList.jsx"; 
import MyAppNav from "../components/NavbarComponent";
const BookList = ({}) => {
  const handleSignOut = () => {
        // Sign out
        navigate("/login");
        
    };
     //Create a new state variable: randomNum with a default value set to 0. 
    // This will store the random number value.
    //  books = [
    //     { id: "1", title: "Book 1", Language: "English",Description: "Book 1 is a book.",author: "John Doe",published_date: "2020-01-01" },
    //     { id: "2", title: "Book 2", Language: "school",Description: "Book 2 is a book.",author: "Jane Doe",published_date: "2020-01-01" },
    //     { id: "3", title: "Book 3", Language: "tech",Description: "Book 3 is a book.",author: "sam",published_date: "2020-01-01" },
    // ];
    
    // 2. Create state variable: Books
    const [book, setBooks] = useState([]);
    // 3. Use the Navigate hook to navigate between pages
    const navigate = useNavigate();

    // 4. Use useEffect to fetch data from the JSON server
    useEffect(() => {
    const loadBooks = async () => {
        try {
            const res = await fetch("http://localhost:5050/book");
            if (!res.ok) throw new Error("Failed to fetch books");
            const data = await res.json();
            // Store data in books state
            setBooks(data);
        } catch (e) {
            console.error("Error fetching stalls:", e.message);
        }
    };
    loadBooks();
    }, []);

    // Create handleDelete function: to remove data from the JSON server and update the current state.
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5050/book/${id}`, {
            method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete book");
            // update the books state to remove the deleted book
            setBooks((prev) => prev.filter((s) => s.id !== id));
            
        } catch (e) {
            console.error("Error deleting book:", e.message);
        }
    };

    const [searchParams, setSearchParams] = useSearchParams();

    const filter = searchParams.get("title");

    let displayedEvents;
    if (filter) {
        // displayedEvents = books.filter((e) => e.title === filter); // only matching type
        displayedEvents = book.filter(e => e.title.toLowerCase().includes(filter.toLowerCase()))
      
    } else {
        displayedEvents = book; // show all events
    }
    return (
        <>
      <MyAppNav />
      <h1>The Librarian Page</h1>
      
      {/* <Link to={`/login`} className="btn-signout">Sign Out</Link> */}
      <button onClick={handleSignOut} className="btn-signout">
            Sign Out
        </button>
        <br></br>
        <br></br>
        <input
          type="text"
          placeholder="Search by title"
          className="text-input"
          align="left"
            value={filter || ""}
            onChange={e => {
              const value = e.target.value;
              if (value) {
                setSearchParams({ title: value });
              } else {
                setSearchParams({});
              }
            }}
        />
        
        <br></br>
        <h1 align="left">Most Popular Books</h1>
        <div style={{ marginTop: 12 }}>
                  {displayedEvents.map((e) => {
                    
                    return (
                      <div
                        
                        className="card-grid"
                      >
                      <li key={e._id}>
                        <img src={bookIcon} alt="Book Cover" />
                        <Link to={`/book/${e._id}`}>{e.title}</Link>
                        {/* Language: {e.author} <br/>                 */}
                      </li>
                                
                        {/* 7. Add an Edit button to navigate to EditStallForm. */}
                        {/* <button class = "button" onClick={() => navigate(`/edit-book/${e.id}`)}>
                        Edit
                        </button>
                        <button class = "button" onClick={() => handleDelete(e.id)}>Delete</button> */}
                      </div>
                    );
                  })}
                  {/* 9.Add an Add New book button to navigate to the AddBookForm.*/}
            <div>
                <button class = "button" onClick={() => navigate("/add-book")}>Add New Book</button>
            </div>
            <div>
                <button class = "button" onClick={() => navigate("/librarian")}>Librarian(Librarian Only)</button>
            </div>
                </div>

        </>
    );
}

export default BookList;