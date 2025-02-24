import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<h1>login</h1>} />
          <Route path="/signup" element={<h1>signup</h1>} />
          <Route path="/account" element={<h1>account</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
