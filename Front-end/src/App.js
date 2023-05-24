
import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import {NoteState} from './ContextApi/noteContext'
import { UserState } from "./ContextApi/userContext"; 
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Alert from "./Components/Alert";
import UserBoard from "./Components/UserBoard";

// Wrap all the elements in context api which wants to use the context.


function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = ({msg, type}) => {
    setAlert({msg: msg, type: type})
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  return (
  <UserState>
  <NoteState>
    <BrowserRouter>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert}/>
        <UserBoard showAlert={showAlert}/>
        <div className="container" >
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
        </div>
    </BrowserRouter>
  </NoteState> 
  </UserState>
  );
}

export default App;
