import React, { useState, useEffect } from "react";
import "./Login.css";
import { Water } from "react-bootstrap-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function Login() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");

    async function login() {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            alert("Incorrect Login Credentials");
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/admin");
        }
    }, [user]);

    return <div className="login">
    <div className="header">
      <a href="/" className="name">BOATERS BAY  </a>
      <Water size={25} />
    </div>
    <div className="login-container">
        <div>
            <p className="login-page-title">Sign In</p>
            <div className="login-card-container">
                <input placeholder="Email" className="login-input" value={email} onChange={(e) => updateEmail(e.target.value)} />
                <input placeholder="Password" type="password" className="login-input" value={password} onChange={(e) => updatePassword(e.target.value)} />
                <button className="login-button" onClick={login}>Login</button>
            </div>
        </div>
    </div>
    </div>
}

export default Login;