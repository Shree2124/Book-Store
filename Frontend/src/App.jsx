import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:5555/books")
      .then((responce) => console.log(responce))
      .catch((err) => console.log(err.message));
  },[]);

  return <></>;
}

export default App;
