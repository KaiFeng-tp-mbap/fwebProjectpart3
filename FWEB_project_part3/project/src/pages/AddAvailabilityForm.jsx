// 1. Import useState from React and useNavigate from React Router
import React,{ useState, useEffect  } from "react";
import { useNavigate } from "react-router";
import { useParams,Link } from "react-router";

const AddAvailabilityForm = () => {
    const { bookid } = useParams();
    const activeBook = bookid || books[0].id;
    // 2. Create a controlled form state "book" to store input values for the form
    const [Availability, setAvailability] = useState({
        bookid: bookid || "",
      Location_id: "",
      status: ""
    });

    // 3. Initialize the navigate hook to navigate between pages
    const navigate = useNavigate();
    
    // 4. handleChange: Function to update the form state whenever an input changes
    const handleChange = (e) => {
        const { name, value } = e.target; // extract name and value
        setAvailability((prev) => ({
            ...prev, // copy existing form data
            [name]: value, // update changed value
        }));
    };

    // 5. handleFormSubmit: On form submission, a function to send a POST request to the mock server to add a stall
    const handleFormSubmit = async () => {
    // Convert numeric fields before sending
        const payload = {
            ...Availability,
            bookid: String(Availability.bookid),
            Location_id: String(Availability.Location_id),
            status: String(Availability.status),
            
        };
        const res = await fetch("http://localhost:5050/Availability", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            navigate(`/book/${bookid}/availability`); // Go back to Stall List after submission
        }
    };

    return (
    <><nav>Availability</nav>
        <form>
            <h2>Add New Availability</h2>
            bookid:
            <input
            name="bookid"
            placeholder="bookid"
            value={Availability.bookid}
            onChange={handleChange}
            />
            
            <br></br>
            <br></br>
            Location_id: 
            <input
            name="Location_id"
            placeholder="Location_id"
            value={Availability.Location_id}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            status: 
            <select name="status" value={Availability.status}
            onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="No copies Available">No copies Available</option>
            </select>


        </form>
        <button class = "button" onClick={() => handleFormSubmit()}>Save Availability</button>
        <button class = "button"  type="button" onClick={() => navigate(-1)}>
            Cancel
        </button>
    </>
    );
};

export default AddAvailabilityForm;