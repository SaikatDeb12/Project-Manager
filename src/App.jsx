import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
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
                        <Route
                            path="/login"
                            element={
                                !isAuthenticated && <Auth signup={false} />
                            }
                        />
                        <Route
                            path="/signup"
                            element={!isAuthenticated && <Auth signup={true} />}
                        />
                        <Route
                            path="/account"
                            element={
                                isAuthenticated ? (
                                    <Account userDetails={userDetails} />
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            }
                        />
                        <Route path="*" element={<p>page not found</p>} />
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
