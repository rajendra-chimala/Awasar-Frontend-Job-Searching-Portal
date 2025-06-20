import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import JobDetailsPage from "./JobDetailsPage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={HomePage} />
          <Route path="/job/:id" element={JobDetailsPage} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
