import React, { createContext } from 'react'
// import './navBar.css'
import NavBar from "./Components/NavBar";
import LandPage from './Components/LandPage';
import Homepage from "./Components/HomePage";
import Footer from "./Components/Fotter";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AboutUs from "./Components/AboutUs";
import UploadContent from './Components/UploadContent';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import HomePage from './Components/HomePage';
import Test from './Components/Test';
import Competition from './Components/Competition';
import ViewContent from './Components/ViewContent';
// import { FontAwesomeIcon } from "@fortawesome/fontawesome-svg-core";

// const userContext = createContext()

function App() {



  return (
    <>

      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<LandPage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/homepage' element={<HomePage />}></Route>
          <Route path='/aboutus' element={<AboutUs />}></Route>
          <Route path='/uploadContent' element={<UploadContent />}></Route>
          <Route path='/competition' element={<Competition />}></Route>
          <Route path='/viewContent/:id' element={<ViewContent />}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
      {/* <Test></Test> */}
    </>

  )
}

export default App