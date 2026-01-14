// 1. Import useState from React and useNavigate from React Router
import React,{ useState, useEffect  } from "react";
import { useNavigate } from "react-router";
import { useParams,Link } from "react-router";

const AddLocationForm = () => {
    const { bookid } = useParams();
    const activeBook = bookid || books[0].id;
    // 2. Create a controlled form state "book" to store input values for the form
    const [Location, setLocation] = useState({
        Location: "",
        level: "",
        shelf: "",
        shelfId: "",
        Location_image: ""
    });

    // 3. Initialize the navigate hook to navigate between pages
    const navigate = useNavigate();
    
    // 4. handleChange: Function to update the form state whenever an input changes
    const handleChange = (e) => {
        const { name, value } = e.target; // extract name and value
        setLocation((prev) => ({
            ...prev, // copy existing form data
            [name]: value, // update changed value
        }));
    };

    // 5. handleFormSubmit: On form submission, a function to send a POST request to the mock server to add a stall
    const handleFormSubmit = async () => {
    // Convert numeric fields before sending
        const payload = {
            ...Location,
            Location: String(Location.Location),
            level: String(Location.level),
            shelf: String(Location.shelf),
            shelfId: String(Location.shelfId),
            Location_image: String(Location.Location_image)
            
        };
        const res = await fetch("http://localhost:5050/Location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            navigate(`/book/${bookid}/availability`); // Go back to Stall List after submission
        }
    };

    return (
    <><nav>Location</nav>
        <form>
            <h2>Add New Location</h2>

            Location: 
            <input
            name="Location"
            placeholder="Location"
            value={Location.Location}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            level: 
            <input
            name="level"
            placeholder="level"
            value={Location.level}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            shelf: 
            <input
            name="shelf"
            placeholder="shelf"
            value={Location.shelf}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            shelfId:
           <input
            name="shelfId"
            placeholder="shelfId"
            value={Location.shelfId}
            onChange={handleChange}
            />
            <br></br>
            <br></br>
            Location_image: 
            <input
            name="Location_image"
            placeholder="Location_image"
            value={Location.Location_image}
            onChange={handleChange}
            />


        </form>
        <button class = "button" onClick={() => handleFormSubmit()}>Save Location</button>
        <button type="button" onClick={() => navigate(-1)} class = "button" >
            Cancel
        </button>
    </>
    );
};

export default AddLocationForm;