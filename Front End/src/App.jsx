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
import ViewCompetition from './Components/ViewCompetition';
import MainProfile from './Components/MainProfile';
import Teams from './Components/Teams';
import ViewTeam from './Components/ViewTeam';
import CreateTeam from './Components/CreateTeam';
import EditProfile from './Components/EditProfile';
import Buddies from './Components/Buddies';
import Pair_ShareWork from './Components/Pair_ShareWork';
import Pair_ReviewWork from './Components/Pair_ReviewWork';
import Users from './Components/Users';
import Messages from './Components/Messages';
import ViewProfile from './Components/ViewProfile';
import AdminPage from './Components/AdminPage';
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
          <Route path='/viewCompetition/:id' element={<ViewCompetition />}></Route>
          <Route path='/mainProfile' element={<MainProfile />}></Route>
          <Route path='/teams' element={<Teams />}></Route>
          <Route path='/viewTeam/:id' element={<ViewTeam />}></Route>
          <Route path='/createTeam' element={<CreateTeam />}></Route>
          <Route path='/editProfile' element={<EditProfile />}></Route>
          <Route path='/buddies' element={<Buddies />}> </Route>
          <Route path='/pair/shareWork/:id' element={<Pair_ShareWork />}></Route>
          <Route path='/pair/reviewWork/:id' element={<Pair_ReviewWork />}></Route>
          <Route path='/users' element={<Users />}></Route>
          <Route path='/messages/:toId' element={<Messages />}></Route>
          <Route path='/messages/' element={<Messages />}></Route>
          <Route path='/viewProfile/:id' element={<ViewProfile />}></Route>
          <Route path='/adminPage' element={<AdminPage />}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
      {/* <Test></Test> */}
    </>

  )
}

export default App