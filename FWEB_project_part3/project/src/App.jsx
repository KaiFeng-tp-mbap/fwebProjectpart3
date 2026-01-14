import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './components/Home.jsx';
import UserProfile from './components/UserProfile.jsx'

import './App.css'
import './js/main.js'

// import route matchers
import { Routes, Route } from 'react-router';

// import the pages

import AvailabilityList from './pages/AvailabilityList.jsx';
import Bookpage from './pages/Bookpage.jsx';
import BookList from './pages/BookList.jsx';
import Item_location_map from './pages/Item_location_map.jsx';
import ReservationListPage from './pages/ReservationListPage.jsx';
import ReservationPage from './pages/ReservationPage.jsx';
import Signup from './pages/Signup.jsx';
import UserLogin from './pages/UserLogin.jsx';
import NotFound from './pages/NotFound.jsx';

// import the reusable layout components
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import { AuthProvider } from "./context/AuthContext.jsx";
import AddBookForm from './pages/AddBookForm.jsx';
import EditBookForm from './pages/EditBookForm.jsx';
import AddAvailabilityForm from './pages/AddAvailabilityForm.jsx';
import AddLocationForm from './pages/AddLocationForm.jsx';
import AddResForm from './pages/AddResForm.jsx';

import ProtectedRoute from "./components/ProtectedRoute";

import BookListLibrarian from './pages/BookListLibrarian.jsx';
import Unauthorized from "./pages/Unauthorized";

function App() {
  const [count, setCount] = useState(0)

  const isLoggedIn = false;
  const username = 'Alex';
  
// state variable to track the current page, default as 'home'
  const [currentPage, setCurrentPage] = useState('BookList');
  return (
    <>
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Logged in users */}
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<BookList />} />
          <Route path='/availability' element={<AvailabilityList />} />
          
          <Route path='/book/:bookid' element={<Bookpage />} />
            <Route path='/book/:bookid/availability' element={<AvailabilityList />} />
          <Route path='/book/:bookid/availability/item-location-map/:Location_id' element={<Item_location_map />} />
          <Route path='/book/:bookid/availability/item-location-map/:Location_id?' element={<Item_location_map />} />

          <Route path='/book/:bookid/reservation-list' element={<ReservationListPage />} />
            <Route path='/book/:bookid/reservation-list/:reservationid' element={<ReservationPage />} />
            <Route path='/book/:bookid/reservation-list/:reservationid?' element={<ReservationPage />} />
            
            <Route path='/book/:bookid/reservation-list/add-reservation' element={<AddResForm />} />

          <Route path='/add-book' element={<AddBookForm />} />
          <Route path='/book/:bookid/availability/add-availability' element={<AddAvailabilityForm />} />
          <Route path='/book/:bookid/availability/add-location' element={<AddLocationForm />} />
          <Route path='/edit-book/:id' element={<EditBookForm />} />
        </Route>

        {/* librarian-only routes */}
        <Route element={<ProtectedRoute allowedRoles={["librarian"]} />}>
          <Route path="/librarian" element={<BookListLibrarian />} />
        </Route>
        
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AuthProvider>
    
      {/* <div>
        <UserProfile isLoggedIn={isLoggedIn} username={username} />
      </div> */}
    </>
  )
}

export default App
