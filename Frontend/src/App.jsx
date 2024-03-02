import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import {CreateBooks, DeleteBooks, ShowBooks, Home, EditBooks} from "./pages/index.js"

function App() {
  return (
    <Routes>
      <Route />
      <Route path="/" element={<Home />}/>
      <Route path="/books/create" element={<CreateBooks />}/>
      <Route path="/books/details/:id" element={<ShowBooks />}/>
      <Route path="/books/edit/:id" element={<EditBooks />}/>
      <Route path="/books/delete/:id" element={<DeleteBooks />}/>
    </Routes>
  );
}

export default App;
