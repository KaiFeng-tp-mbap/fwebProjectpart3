import React from "react";
import { useParams, useNavigate,Link } from "react-router";
import MyAppNavBookpage from "../components/NavbarComponentBookPage";
import { useState, useEffect } from "react";
export const availabilityData = {
  "1": [
    { id: "l1",Location: "Library 1", status: "No copies Available" },
    { id: "l2",Location: "Library 2", status: "No copies Available" },
    { id: "l3", Location: "Library 3", status: "Available" },
  ],
  "2": [
    { id: "l1", Location: "Library 1", status: "Available" },
    { id: "l2", Location: "Library 2", status: "Available" },
  ],
  "3": [
    { id: "l1", Location: "Library 1", status: "No copies Available" },
  ],
};
const AvailabilityList = () => {
  const { bookid } = useParams();
  const navigate = useNavigate();

  // const list = availabilityData[bookid] || [];
  
  // Create state variable: Books
      const [book, setBook] = useState([null]);
  // 2. Create state variable: list
      const [list, setList] = useState([]);
      // 3. Use the Navigate hook to navigate between pages
      
      // 4. Use useEffect to fetch data from the JSON server
      useEffect(() => {
      const loadAvailability = async () => {
          try {
              const res = await fetch(`http://localhost:5050/Availability?bookid=${bookid}`);
              const availability = await res.json();
              if (!res.ok) throw new Error("Failed to fetch Availability");
              // const data = await res.json();
              // Store data in Availability state
              // Fetch location details for each
              const joined = await Promise.all(
                availability.map(async item => {
                  const locRes = await fetch(`http://localhost:5050/Location/${item.Location_id}`);
                  const loc = await locRes.json();
                  return { ...item, location: loc };
                })
              );
              setList(joined);
          } catch (e) {
              console.error("Error fetching stalls:", e.message);
          }
      };
      loadAvailability();
      }, [bookid]);   
      useEffect(() => {
          const loadBooksbyid = async () => {
              try {
                  const res = await fetch(`http://localhost:5050/book/${bookid}`);
                  if (!res.ok) throw new Error("Failed to fetch books");
                  const data = await res.json();
                  // Store data in books state
                  setBook(data);
              } catch (e) {
                  console.error("Error fetching stalls:", e.message);
              }
          };
          loadBooksbyid();
          }, [bookid]);   
   return (
    <div className="container text-center">
      <MyAppNavBookpage />
      <button onClick={() => navigate(`/book/${bookid}`)} className="btn-back" style={{ float: "left" }}>Back</button>
        <br></br>
        <br></br>
      {/* <h1 align="left">Book {bookid}<br></br> Availability</h1> */}
      <h1 align="left">{book.title}<br></br> Availability</h1>
      {list.length === 0 ? (
        <p>No availability information.</p>
      ) : (
        <div className="availability-list">
          {list.map((entry) => {
            // link to map for the given library/location (passes location id)
            return (
              <Link
                key={entry.Location_id}
                to={`/book/${bookid}/availability/item-location-map/${entry.Location_id}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div
                  className="availability-row"
                >
                  <div style={{ textAlign: "left" }}>
                    <strong>{entry.location.Location}</strong>
                    <div style={{ fontSize: 13 }}>{entry.status}</div>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>
      )}
       <div>
          <button class = "button" onClick={() => navigate(`/book/${bookid}/availability/add-availability`)}>Add New Availability</button>
      </div>
      <div>
          <button class = "button" onClick={() => navigate(`/book/${bookid}/availability/add-location`)}>Add New location</button>
      </div>
    </div>
    
  ); 
};

export default AvailabilityList;