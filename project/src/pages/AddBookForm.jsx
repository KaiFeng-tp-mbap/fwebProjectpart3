// 1. Import useState from React and useNavigate from React Router
import { useState } from "react";
import { useNavigate } from "react-router";

const AddBookForm = () => {
    // 2. Create a controlled form state "book" to store input values for the form
    const [book, setBooks] = useState({
        title: "", Language: "",Description: "",author: "",published_date: "",Availability_id: "", reservationid: "",Reservation_availablity: "", Location_id: "" 
        
    });

    // 3. Initialize the navigate hook to navigate between pages
    const navigate = useNavigate();
    
    // 4. handleChange: Function to update the form state whenever an input changes
    const handleChange = (e) => {
        const { name, value } = e.target; // extract name and value
        setBooks((prev) => ({
            ...prev, // copy existing form data
            [name]: value, // update changed value
        }));
    };

    // 5. handleFormSubmit: On form submission, a function to send a POST request to the mock server to add a stall
    const handleFormSubmit = async () => {
    // Convert numeric fields before sending
        const payload = {
            ...book,
            title: String(book.title),
            Language: String(book.Language),
            Description: String(book.Description),
            author: String(book.author),
            published_date: String(book.published_date),
            Availability_id: String(book.Availability_id),
            reservationid: String(book.reservationid),
            Reservation_availablity: String(book.Reservation_availablity),
            Location_id: String(book.Location_id)
        };
        const res = await fetch("http://localhost:5050/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            navigate("/"); // Go back to Stall List after submission
        }
    };

    return (
    <><nav>A New Book</nav>
        <form>
            <h2>Add New book</h2>
            Book Name
            <input
            name="title"
            placeholder="Book Name"
            value={book.title}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            Language
            <input
            name="Language"
            placeholder="Language"
            value={book.Language}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            Description
            <input
            name="Description"
            placeholder="Description"
            value={book.Description}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            author
            <input
            name="author"
            placeholder="Author"
            value={book.author}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            published_date
            <input 
            type="date"
            name="published_date"
            placeholder="Published Date"
            value={book.published_date}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            reservationid
            <input
            name="reservationid"
            placeholder="reservationid"
            value={book.reservationid}
            onChange={handleChange}
            />

            <br></br>
            <br></br>
            Reservation_availablity
            <select name="Reservation_availablity" value={book.Reservation_availablity}
            onChange={handleChange}>
            <option value="Reservation Available">Reservation Available</option>
            <option value="No Reservation Available">No Reservation Available</option>
            </select>

            <br></br>
            <br></br>
            Location_id
            <input
            name="Location_id"
            placeholder="Location_id"
            value={book.Location_id}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            Availability_id
            <input
            name="Availability_id"
            placeholder="Availability_id"
            value={book.Availability_id}
            onChange={handleChange}
            />
        </form>
        <button class = "button" onClick={() => handleFormSubmit()}>Save book</button>
        <button class = "button" type="button" onClick={() => navigate("/")}>
            Cancel
        </button>
    </>
    );
};

export default AddBookForm;