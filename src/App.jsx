import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import JobDetailsPage from "./JobDetailsPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Login";
import Register from "./Register";
import Jobs from "./Jobs";
import Profile from "./Profile";
import RegisterCompany from "./RegisterCompany";
import CompanyLogin from "./CompanyLogin";
import CompanyHome from "./CompanyHome";
import ApplicationPage from "./ApplicationPage";
import About from "./About";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/job/:id" element={<><Header/><JobDetailsPage/><Footer/></>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/jobs" element={<><Header/><Jobs/><Footer/></>}/>
          <Route path="/profile" element={<><Header/><Profile/><Footer/></>} />
          <Route path="/register-company" element={<RegisterCompany/>}/>
          <Route path="/login-company" element={<CompanyLogin/>}/>
          <Route path="/company" element={<CompanyHome/>}/>
          <Route path="/applicatnts/:id" element={<ApplicationPage/>} />
          <Route path="/about" element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
