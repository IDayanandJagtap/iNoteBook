
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import {NoteState} from './ContextApi/noteContext'

// Wrap all the elements in context api which wants to use the context.


function App() {
  return (
  <NoteState>
    <BrowserRouter>
        <Navbar />
          <div className="container" >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
        </div>
    </BrowserRouter>
  </NoteState> 
  );
}

export default App;
