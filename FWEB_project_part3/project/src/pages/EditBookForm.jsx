// 1. Import useState & useEffect from React and useParams & useNavigate from React Router
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const EditStallForm = () => {
    // 2. Get the stall ID (from /edit-stall/:id route) using useParams
    const { id } = useParams();

    // 3. Initialize the useNavigate hook to navigate between pages
    const navigate = useNavigate();

    // 4. Create books state to hold the book's details
    const [book, setBooks] = useState({
        title: "", Language: "",Description: "",author: "",published_date: "",Availability_id: "", reservationid: "",Reservation_availablity: "",Location_id: "" 
        
    });
    
    // 5. Fetch the stall data by stall ID from the mock JSON Server initially
    useEffect(() => {
        const fetchStallById = async () => {
        try {
            const res = await fetch(`http://localhost:5050/book/${id}`); //Fetch by ID
            if (!res.ok) throw new Error("Failed to fetch books");
            const data = await res.json();
            // set books to books state to prefill form with fetch data
            setBooks(data);
        } catch (err) {
            console.error("Error fetching books:", err);
        }
    };
    fetchStallById();
    }, [id]); // Put id in dependency array to ensure effect runs every time the stall id changes

    const handleChange = (e) => {
        const { name, value } = e.target; // extract name and value
        setBooks((prev) => ({
            ...prev, // copy existing form data
            [name]: value, // update changed value
        }));
    };

    // 7. Send a PUT request to update the stall
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
        try {
            const res = await fetch(`http://localhost:5050/book/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update books");
            navigate("/"); // Go back to Stall List after submission
        } catch (err) {
            console.error("Error updating books:", err);
        }
    };
    return (
        <><nav>Edit Book</nav>
            <form>
                <div>
                    <br></br>
                <label>title:</label>
                <input
                    name="title"
                    placeholder="Book Name"
                    value={book.title}
                    onChange={handleChange}
                />
                </div>
                <br></br>
                <div>
                <label>Language:</label>
                <input
                    name="Language"
                    placeholder="Language"
                    value={book.Language}
                    onChange={handleChange}
                />
                </div>
                <br></br>
                <div>
                <label>Description:</label>
                <input
                name="Description"
                placeholder="Description"
                value={book.Description}
                onChange={handleChange}
                />
                </div>
                <br></br>
                <label>author:</label>
                <input
                name="author"
                placeholder="Author"
                value={book.author}
                onChange={handleChange}
                />
                <br></br>
                <label>published_date:</label>
                <input 
                type="date"
                name="published_date"
                placeholder="Published Date"
                value={book.published_date}
                onChange={handleChange}
                />
                <br></br>
                <br></br>
                <label>reservationid: </label>
                <input
                name="reservationid"
                placeholder="reservationid"
                value={book.reservationid}
                onChange={handleChange}
                />
                <br></br>
                <br></br>
                <div>
                <label>Reservation_availablity:</label>
                <select name="Reservation_availablity" value={book.Reservation_availablity}
                onChange={handleChange}>
                <option value="Reservation Available">Reservation Available</option>
                <option value="No Reservation Available">No Reservation Available</option>
                </select>
                <br></br>
                <br></br>
                </div>
                Location_id: 
                <input
                name="Location_id"
                placeholder="Location_id"
                value={book.Location_id}
                onChange={handleChange}
                />
                <br></br>
                <br></br>
                Availability_id: 
                <input
                name="Availability_id"
                placeholder="Availability_id"
                value={book.Availability_id}
                onChange={handleChange}
                />
                <br></br>
                <br></br>
            </form>
            <button class="button" type="button" onClick={() => handleFormSubmit()}>
                Save
            </button>
            <button class="button" type="button" onClick={() => navigate("/")}>
                Cancel
            </button>
        </>
    );
};

export default EditStallForm;