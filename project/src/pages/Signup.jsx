import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router';
import { useNavigate,Link, useSearchParams } from "react-router";

import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";
// const { user, login, logout } = useContext(AuthContext)

const Signup = () => {
const [user, setUser] = useState({
        name: "",
        password: "",
        repassword: "",
        email: "",
        role: ""
    });

    const navigate = useNavigate();

    const handleSignUp = async() => {
        if (user.password !== user.repassword){
            alert("Passwords do not match!");
            return;
        }
        // if SignUp is successful go to dashboard
         const payload = {
            ...user,
            name: String(user.name),
            password: String(user.password),
            repassword: String(user.repassword),
            email: String(user.email),
            role: String(user.role),
            
        };
        const res = await fetch("http://localhost:5050/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            navigate("/"); // Go back to book List after signup
        }
        // navigate("/");
        // alert(`name: ${user.name}, password: ${user.password}, email: ${user.email}`);
    };
    return (
    <div>
        <nav className="NavSignUp">SignUp</nav>
    <button onClick={() => navigate("/login")} className="btn-back" style={{ float: "left" }}>
        Back
      </button>
        <br></br>
        <br></br>
        
        <div className="row">
            <div className="col">
                <form>
                    <table width="80%">
                <tr align="left"><p align="left">Name</p></tr>        
                <tr align="left"><input placeholder="Name" 
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                type ="text"
                id ="name"
                />
                </tr>
                <br></br>
                 <tr align="left"><p align="left">Email</p></tr>
                <tr align="left"><input placeholder="Email" 
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type ="email"
                id ="email"
                />
                </tr>
                <br></br>
                <tr align="left"><p align="left">Password</p></tr>
                <tr align="left" width="80vw">
                    <input placeholder="Password" 
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    type ="password"
                    id ="password"
                    />
                </tr>

                <tr align="left"><p align="left">Re-Password</p></tr>
                <tr align="left" width="80vw">
                    <input placeholder=" Re-enter Password" 
                    value={user.repassword}
                    onChange={(e) => setUser({ ...user, repassword: e.target.value })}
                    type ="password"
                    id ="repassword"
                    />
                </tr>

                 <tr align="left"><p align="left">Role</p></tr>
                <tr align="left" width="80vw">
                    <select name="role" value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                    >
                        <option value="librarian">librarian</option>
                        <option value="user">user</option>
                    </select>
                </tr>
                
            </table>
                </form>
            </div>
        </div>
        

        
        {/* <button onClick={()=>alert(`name: ${user.name}, password: ${user.password}, email: ${user.email}`)} >
            Click Me!
        </button> */}

        <button onClick={handleSignUp} className="btn-signup2">
            Sign Up
        </button>
    </div>
    );

};

export default Signup;