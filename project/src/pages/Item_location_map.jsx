// ...existing code...
import React,{ useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import bookIcon from "../images/book_2_37dp_000000_FILL0_wght400_GRAD0_opsz40 1.png";
import location1 from "../images/location_image_1.png";
import location2 from "../images/location_image_2.png";
import location3 from "../images/location_image_3.png";
import { Nav } from "react-bootstrap";
const mockLocationIndex = {
  // keyed by book id or location id — adjust to match your real data
  "1": { Location: "Library 3", level: "Level 1", shelf: "shelf 1", shelfId: "s1", Location_image: location1 },
  "2": { Location: "Library 1", level: "Level 2", shelf: "shelf 2", shelfId: "s2", Location_image: location2 },
  "3": { Location: "Library 2", level: "Level 1", shelf: "shelf 3", shelfId: "s3", Location_image: location3 },
  // add more mappings as needed
};

// metadata keyed by location id used in availability rows (l1, l2, l3)
const locationMeta = {
  l1: { Location: "Library 1", level: "Level 1", shelf: "shelf 1", shelfId: "s1", Location_image: location1 },
  l2: { Location: "Library 2", level: "Level 2", shelf: "shelf 2", shelfId: "s2", Location_image: location2 },
  l3: { Location: "Library 3", level: "Level 1", shelf: "shelf 3", shelfId: "s3", Location_image: location3 },
};
// layout: relative positions for shelves inside the map (percent values)
const roomLayout = {
  shelves: [
    { id: "s1", label: "1", left: "12%", top: "12%", w: "9%", h: "20%" },
    { id: "s2", label: "2", left: "38%", top: "12%", w: "9%", h: "20%" },
    { id: "s3", label: "3", left: "64%", top: "12%", w: "9%", h: "20%" },
  ],
};
const books = [
        { id: "1", title: "Book 1", Language: "English",Description: "Book 1 is a book.",author: "John Doe",published_date: "2020-01-01" },
        { id: "2", title: "Book 2", Language: "school",Description: "Book 2 is a book.",author: "Jane Doe",published_date: "2020-01-01" },
        { id: "3", title: "Book 3", Language: "tech",Description: "Book 3 is a book.",author: "sam",published_date: "2020-01-01" },
    ];
const Item_location_map = () => {
  const { Location_id, bookid } = useParams();
  const id = Location_id || bookid || "1";
  const navigate = useNavigate();

  const [availability, setAvailability] = useState([]);
  const [currentMeta, setCurrentMeta] = useState(null);
  // const meta = (locationId && locationMeta[locationId]) || mockLocationIndex[bookid] || mockLocationIndex[id];
  // const book = books.find((b) => b.id === bookid);
  const [book, setBook] = useState(null);
  const imageMap ={
    "location_image_1.png" : location1,
    "location_image_2.png" : location2,
    "location_image_3.png" : location3
  };
  
  useEffect(() => {
        const loadLocationData = async () => {
            try {
                const res = await fetch(`http://localhost:5050/Availability?bookid=${bookid}`);
                const availabilityData = await res.json();
                if (!res.ok) throw new Error("Failed to fetch Location");
                // const data = await res.json();
                // Store data in Availability state
                // Fetch location details for each
                const joined = await Promise.all(
                  availabilityData.map(async item => {
                    const locRes = await fetch(`http://localhost:5050/Location/${item.Location_id}`);
                    const loc = await locRes.json();
                    return { ...item, location: {...loc,
                      Location_image: imageMap[loc.Location_image]
                    } };
                  })
                );
                
                setAvailability(joined);
                

                const current = joined.find((a) => a.location?.id === Location_id);
                setCurrentMeta(current?.location || joined[0]?.location || null);
            } catch (e) {
                console.error("Error fetching stalls:", e.message);
            }
            
        };
        loadLocationData();
        }, [bookid,Location_id]);   

         useEffect(() => {
                        const loadBook = async () => {
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
                        loadBook();
                        }, [bookid]);   
  return (
    <div className = "forecast-container">
      <nav>Location map</nav>
        <button onClick={() => navigate(-1)} className="btn-back" style={{ float: "left" }}>Back</button>
        <br></br>
        <br></br>
                <div className = "card-grid">
                    {/* loop through weather data accordingly*/}
                    <div class="container text-center">
                        <div class="row">
                            <div class="col">
                            <div style={{ width: 120, textAlign: "center" }}>
                                <img src={bookIcon} alt="book" style={{ width: 96 }} />
                            </div></div>
                            
                            <div class="col">
                            <h2 style={{ margin: 0 }}>{ book?.title }</h2>
                            
                            <div><strong>Location:</strong> {currentMeta?.Location ?? "N/A"}</div>
                            <div><strong>Level :</strong> {currentMeta?.level ?? "N/A"}</div>
                            <div><strong>Shelf :</strong> {currentMeta?.shelf ?? "N/A"}</div></div>
                            
                            
                        </div>

                        <div className="col" style={{ width: 520 }}>
              
                  {currentMeta?.Location_image && (
                    <img src={currentMeta.Location_image} alt={`${currentMeta.Location} photo`} />
                  )}
                  
                  
                
            </div>

                        </div>
                        
                    </div>
                    
                </div>
            
  );
};

export default Item_location_map;