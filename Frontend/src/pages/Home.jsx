import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, BooksCard, BooksTable } from "../components/index.js";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState("table");
  useEffect(() => {
    setLoading(true);
    axios
      // .get("http://localhost:5555/books")
      .get("https://book-store-api-beige.vercel.app/books")
      .then((res) => {
        setBooks(res.data.data);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log("pages::Home::Axios error: - ", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShow("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShow("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : show === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
}

export default Home;
