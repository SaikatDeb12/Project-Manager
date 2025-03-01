import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Auth from "./Component/Auth/Auth";
import { useEffect, useState } from "react";
import { auth, getUserData } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const fetchUserDetails = async (uid) => {
    const details = await getUserData(uid);
    console.log("User details: ", details);
    setUserDetails(details);
  };

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      if (!user) return;

      setIsAuthenticated(true);
      fetchUserDetails(user.uid);
    });
    return () => listener();
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth signup={false} />} />
          <Route path="/signup" element={<Auth signup={true} />} />
          <Route path="/account" element={<h1>account</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
