// 1. Import useState from React and useNavigate from React Router
import React,{ useState, useEffect  } from "react";
import { useNavigate } from "react-router";
import { useParams,Link } from "react-router";

const AddResForm = () => {
    const { bookid,userId } = useParams();
    // const activeBook = bookid || books[0].id;
    // 2. Create a controlled form state "book" to store input values for the form
    const [reservation, setReservation] = useState({
        bookid: bookid || "",
        Location_id: "",
        userId:userId || "",
        reserved_user: "",
        Reservation_expiry_date: "",
        Reservation_date: "",
      
    });

    // 3. Initialize the navigate hook to navigate between pages
    const navigate = useNavigate();
    
    // 4. handleChange: Function to update the form state whenever an input changes
    const handleChange = (e) => {
        const { name, value } = e.target; // extract name and value
        setReservation((prev) => ({
            ...prev, // copy existing form data
            [name]: value, // update changed value
        }));
    };

    // 5. handleFormSubmit: On form submission, a function to send a POST request to the mock server to add a stall
    const handleFormSubmit = async () => {
    // Convert numeric fields before sending
        const payload = {
            ...reservation,
            bookid: String(reservation.bookid),
            Location_id: String(reservation.Location_id),
            userId: String(reservation.userId),
            reserved_user: String(reservation.reserved_user),
            Reservation_expiry_date: String(reservation.Reservation_expiry_date),
            Reservation_date: String(reservation.Reservation_date),
      
            
        };
        const res = await fetch("http://localhost:5050/reservation-list", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            navigate(`/book/${bookid}/reservation-list`); // Go back to reservation List after submission
        }
    };

    return (
    <><nav>Reservation</nav>
        <form>
            
            <h2>Add New Reservation</h2>
            bookid:
            <input
            name="bookid"
            placeholder="bookid"
            value={reservation.bookid}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            Location_id: 
            <input
            name="Location_id"
            placeholder="Location_id"
            value={reservation.Location_id}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            userId: 
            <input
            name="userId"
            placeholder="userId"
            value={reservation.userId}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            reserved_user: 
            <input
            name="reserved_user"
            placeholder="reserved_user"
            value={reservation.reserved_user}
            onChange={handleChange}
            />
            
            <br></br>
            <br></br>
            Reservation_expiry_date: 
            <input type="date"
            name="Reservation_expiry_date" 
            placeholder="Reservation_expiry_date"
            value={reservation.Reservation_expiry_date}
            onChange={handleChange}
            />

            <br></br>
            <br></br>
            Reservation_date: 
            <input type="date"
            name="Reservation_date" 
            placeholder="Reservation_date"
            value={reservation.Reservation_date}
            onChange={handleChange}
            />
        </form>
        <button class = "button" onClick={() => handleFormSubmit()}>Save Reservation</button>
        <button class = "button" type="button" onClick={() => navigate(-1)}>
            Cancel
        </button>
    </>
    );
};

export default AddResForm;