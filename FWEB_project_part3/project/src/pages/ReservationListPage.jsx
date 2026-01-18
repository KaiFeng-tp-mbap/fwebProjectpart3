
import { useParams, useNavigate,Link } from "react-router";
import React,{ useState, useEffect } from "react";
// adjust the path if your component is elsewhere
import MyAppNavReserveList from "../components/NavbarComponentReserveList";
// export const resData = {
//   "1": [
//     { id: "r1",Location: "Library 1", status: "No Reservation  Available" },
//     { id: "r2",Location: "Library 2", status: "No Reservation  Available" },
//     { id: "r3", Location: "Library 3", status: "Reservation Available" },
//   ],
//   "2": [
//     { id: "r1", Location: "Library 1", status: "Reservation Available" },
//     { id: "r2", Location: "Library 2", status: "Reservation Available" },
//   ],
//   "3": [
//     { id: "r1", Location: "Library 1", status: "Reservation Available" },
//   ],
// };
const ReservationListPage = () => {
  const { bookid } = useParams();
  const navigate = useNavigate();

  // const list = resData[bookid] || [];
  // Create state variable: Books
        const [book, setBook] = useState(null);
    // 2. Create state variable: list
        const [reservations, setReservations] = useState([]);
        const [locations, setLocations] = useState([]);
        const [list, setList] = useState([]);
        // 3. Use the Navigate hook to navigate between pages
        
        // 4. Use useEffect to fetch data from the JSON server
        useEffect(() => {
        const loadReservationList = async () => {
            try {
                const res = await fetch(`http://localhost:5050/reservation-list?bookid=${bookid}`);
                const data = await res.json();
                if (!res.ok) throw new Error("Failed to fetch reservation");
                // const data = await res.json();
                // Store data in Availability state
                // Fetch location details for each
                const joined = await Promise.all(
                data.map(async (resv) => {
                  const locRes = await fetch(`http://localhost:5050/Location/${resv.Location_id}`);
                  const loc = await locRes.json();
                  return { ...resv, location: loc };
                })
              );
                setReservations(joined);
            } catch (e) {
                console.error("Error fetching stalls:", e.message);
            }
        };
        loadReservationList();
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
    
    <div className="container" style={{ padding: 20 }}>
      <MyAppNavReserveList />
      <button onClick={() => navigate(`/book/${bookid}`)} className="btn-back" style={{ float: "left" }}>
        Back
      </button>
      <div style={{ clear: "both" }} />
      <h1 style={{ textAlign: "left", marginTop: 18 }}>
        {book?.title}
        <br />
        Reservations
      </h1>

      {reservations.length === 0 ? (
        <p>No reservation information.</p>
      ) : (
        <div style={{ marginTop: 12 }}>
          {reservations.map((entry) => {
            const normalize = (val) => 
              String(val ?? "").toLowerCase()
              .replace(/\s+/g, " ").trim();
            const availableText = normalize(book?.Reservation_availablity);

            const available = availableText.includes("reservation available") && !availableText.startsWith("no ");
            
            return (
              <div
                key={entry._id}
                style={{
                  background: "lightblue",
                  padding: 18,
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                <div style={{ textAlign: "left" }}>
                   <strong>{entry.location.Location ?? "Unknown"}</strong>
                  <div style={{ fontSize: 13, marginTop: 6 }}>{book.Reservation_availablity}</div>
                  
                </div>
                
                {available ? (
                  <Link to={`/book/${bookid}/reservation-list/${entry._id}`} style={{ textDecoration: "none" }}>
                    <button
                      style={{
                        padding: "8px 14px",
                        borderRadius: 4,
                        border: "1px solid #333",
                        background: "#fff",
                        cursor: "pointer",
                        color: "#333",
                      }}
                    >
                      Reserve Now
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    style={{
                      padding: "8px 14px",
                      borderRadius: 4,
                      
                      background: "#e9e9e9",
                      color: "#666",
                    }}
                  >
                    Not Available
                  </button>
                )}
              </div>
            );
          })}
        </div>
        
      )}
       <div>
          <button class = "button" onClick={() => navigate(`/book/${bookid}/reservation-list/add-reservation`)}>Add New Reservation</button>
        </div>
    </div>
    
  );
};


export default ReservationListPage;