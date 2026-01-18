import { useParams, useNavigate } from "react-router";
import React from "react";
import bookIcon from "../images/book_2_37dp_000000_FILL0_wght400_GRAD0_opsz40 1.png";
import { NavLink } from "react-router";
import { Link, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import MyAppNavReserve from "../components/NavbarComponentReserve";

const ReservationPage = () => {
    const mockReservationIndex = {
      // keyed by book id or location id — adjust to match your real data
      "1": { title: "Book 1", reserved_user: "john",bookid: "1",Reservation_expiry_date: "2020-02-02",Reservation_date: "2020-01-01" },
      "2": { title: "Book 2", reserved_user: "sam",bookid: "2",Reservation_expiry_date: "2020-02-02",Reservation_date: "2020-01-01" },
      "3": { title: "Book 3", reserved_user: "jane",bookid: "3",Reservation_expiry_date: "2020-02-02",Reservation_date: "2020-01-01" },
      // add more mappings as needed
    };
    
    // metadata keyed by location id used in availability rows (l1, l2, l3)
    const ReservationMeta = {
      r1: { title: "Book 1", reserved_user: "john",bookid: "1",Reservation_expiry_date: "2020-02-02",Reservation_date: "2020-01-01"  },
      r2: { title: "Book 2", reserved_user: "sam",bookid: "2",Reservation_expiry_date: "2020-02-02",Reservation_date: "2020-01-01" },
      r3: { title: "Book 3", reserved_user: "jane",bookid: "3",Reservation_expiry_date: "2020-02-02",Reservation_date: "2020-01-01" },
    };
    const books = [
        { id: "1", title: "Book 1", Language: "English",Description: "Book 1 is a book.",author: "John Doe",published_date: "2020-01-01" },
        { id: "2", title: "Book 2", Language: "school",Description: "Book 2 is a book.",author: "Jane Doe",published_date: "2020-01-01" },
        { id: "3", title: "Book 3", Language: "tech",Description: "Book 3 is a book.",author: "sam",published_date: "2020-01-01" },
    ];
    // const reservation = [
    //     { id: "1", title: "Book 1", reserved_user: "john",bookid: "1",Reservation_expiry_date: "2020-02-02",Reservation_date: "2020-01-01" },
    //     { id: "2", title: "Book 2", reserved_user: "sam",bookid: "2",Reservation_expiry_date: "2020-02-02",Reservation_date: "2020-01-01"},
    //     { id: "3", title: "Book 3", reserved_user: "jane",bookid: "3",Reservation_expiry_date: "2020-02-02",Reservation_date: "2020-01-01" },
    // ];

    const { reservationid, bookid } = useParams();
    const id = reservationid || bookid || "1";
    const navigate = useNavigate();

    // const meta = (reservationid && ReservationMeta[reservationid]) || mockReservationIndex[bookid] || mockReservationIndex[id];

    // const book = books.find((b) => b.id === bookid);
    const [searchParams] = useSearchParams();
    // const reserved_user = searchParams.get("reserved_user");

     // Create state variable: Books
    const [book, setBook] = useState(null);
        // 2. Create state variable: list
    const [reservation, setReservation] = useState(null);
    // 3. Use the Navigate hook to navigate between pages
            
     // 4. Use useEffect to fetch data from the JSON server
    useEffect(() => {
        const loadReservation = async () => {
            try {
                const res = await fetch(`http://localhost:5050/reservation-list/${reservationid}`);
                if (!res.ok) throw new Error("Failed to fetch reservation");
                const data = await res.json();
                // const data = await res.json();
                // Store data in Availability state
                // Fetch location details for each
                // const joined = await Promise.all(
                // data.map(async (resv) => {
                const locRes = await fetch(`http://localhost:5050/Location/${data.Location_id}`);
                const loc = await locRes.json();
                    // return { ...data, location: loc };
                // })
                // );
                setReservation({...data,location:loc});
                } catch (e) {
                    console.error("Error fetching reservation:", e.message);
                }
            };
            loadReservation();
            }, [reservationid]);   
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
            // const meta = reservation.find((r) => r.id ===reservationid) || reservation[0];
    return (
        <div className="container text-center">
            <MyAppNavReserve />
            <button onClick={() => navigate(-1)} className="btn-back" style={{ float: "left" }}>Back</button>
            <br></br>
            <br></br>
            <img src={bookIcon} alt="Book Cover" style={{ alignItems: "center" }} />
            <h1 style={{ textAlign: "center" }}>{book?.title}</h1>

                    <div className="Reservation-details">
                        <div className="row">
                            <div className="col">
                                <strong>Description</strong>
                                <p>{book?.Description ?? "N/A"}</p>
                                {/* <strong>User Reserved</strong> */}
                                {/* <p>{meta.reserved_user ?? "N/A"}</p> */}
                                <strong>User Reserved</strong>
                                <p>{reservation?.reserved_user ?? "N/A"}</p>
                                {/* <strong>User Reserved</strong>
                                <p>{user.userId}</p> */}
                                <strong>Reservation Date</strong>
                                <p>{reservation?.Reservation_date ?? "N/A"}</p>
                                <strong>Reservation Expiry Date</strong>
                                <p>{reservation?.Reservation_expiry_date ?? "N/A"}</p>

                            </div>

                        </div>
                    </div>
                </div>

    );
};

export default ReservationPage;