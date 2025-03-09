import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Auth from "./Component/Auth/Auth";
import { useEffect, useState } from "react";
import { auth, getUserData } from "../firebase";
import Spinner from "./Component/Spinner/Spinner";
import Account from "./Component/Account/Account";
import { signOut } from "firebase/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserDetails = async (uid) => {
    const details = await getUserData(uid);
    console.log("User details: ", details);
    if (!details) {
      console.log("User details not found, signing out");
      await signOut(auth);
      setIsAuthenticated(false);
      setUserDetails({});
      setIsLoading(true);
      return;
    }
    setUserDetails(details);
    setIsLoading(true);
  };

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsLoading(true);
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);
      fetchUserDetails(user.uid);
    });
    return () => listener();
  }, []);

  return (
    <div className="app">
      <Router>
        {isLoading ? (
          <Routes>
            <Route
              path="/"
              element={<Home isAuthenticated={isAuthenticated} />}
            />
            {!isAuthenticated && (
              <>
                <Route path="/login" element={<Auth signup={false} />} />
                <Route path="/signup" element={<Auth signup={true} />} />
              </>
            )}
            {isAuthenticated && (
              <Route
                path="/account"
                element={<Account userDetails={userDetails} />}
              />
            )}
            <Route path="*" element={<h1>page not found</h1>} />
          </Routes>
        ) : (
          <div className="spinner">
            <Spinner />
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
