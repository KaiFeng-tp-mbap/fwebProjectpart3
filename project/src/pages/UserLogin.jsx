import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router';

import avatar from "../images/Generic avatar.png";
import { useParams, useNavigate,Link } from "react-router";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";


import { useAuth } from "../hooks/useAuth";
const UserLogin = () => {
    // const { user, login, logout } = useContext(AuthContext)
    const { user, loading, error, role,login, logout, isLoggedIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentuser, setCurrentUser] = useState({
        email: "",
        password: "", 
        
    });
    const navigate = useNavigate();

    // const handleLogin = async() => {
    //     // if login is successful go to dashboard
    //     // if SignUp is successful go to dashboard
    //      const payload = {
    //         ...user,
            
    //         password: String(user.password),
            
    //         email: String(user.email),
            
    //     };
    //     const res = await fetch("http://localhost:5050/login", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(payload),
    //     });
    //     if (res.ok) {
    //         navigate("/"); // Go back to book List after signup
    //     }
    //     // alert(`email: ${user.email} \npassword: ${user.password}`)
    //     navigate("/");
    // };
    
    
    return (
        <div>
            {loading ? (
        <em>Loading...</em>
      ) : isLoggedIn() ? (
        <>
        <nav>Sign Out</nav>
         <br></br>
         <br></br>
          <span> {user.name} <br></br> Are you sure you want to sign out?</span>
          <br />
          <button class = "button" onClick={logout}>Sign out</button>

          <button class = "button" onClick = {() => navigate("/")}>Back</button>
        </>
      ) : (
        <>
        <nav className="Navlogin"><h1>The Librarian</h1> Login</nav>
          <div>
            <img src={avatar} alt="avatar" align="center" className="avatar1"/>
        
            <h2 align="left">Sign In</h2>
            
            <div className="row">
            <div className="col">
                <form>
                    <table width="80%">
                <tr align="left">Email</tr>
                <tr align="left"><input
                // value={user.email}
                value={email}
                onChange={(e) => setEmail( e.target.value )}
                type="email"
                id = "email"
                placeholder="Email@email.com "
            /></tr>
            
            <tr align="left">Password</tr>
            <tr align="left"><input
                // value={user.password}
                value={password}
                onChange={(e) => setPassword( e.target.value )}
                type="password"
                id = "password"
                placeholder="Password"
            />
            </tr>
            </table>
                </form>
            </div>
        </div>
            <div style={{marginTop: 20, gap: 12, display: "flex", justifyContent: "center"}}>
                <Link to={`/signup`} className="btn-signup">Register Now</Link>
                {' '}
                {/* <button onClick={login} className="btn-login">Log In</button> */}
                <button className="btn-login" onClick={async() =>{
                    const success = await login(email, password);
                    // alert(`name: ${user.name}, password: ${user.password}, email: ${user.email}`);
                    if (success) navigate("/"); 
                } }>Log in</button>
            </div>
        </div>
        </>
        
      )}
        </div>
        
    );
}
export default UserLogin;