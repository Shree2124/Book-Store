import React,{useState, useEffect} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {Spinner, BackBtn} from "../components/index.js"

function CreateBooks() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleSaveBook = ()=>{
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true);
    axios
    .post("http://loaclhost:5555/books", data)
    .then(()=>{
      setLoading(false);
      navigate("/")
    })
    .catch((err)=>{
      setLoading(false);
      alert("An error happened. please check console");
      console.log("components::CreateBooks::handleSaveBook::err:- ",err);
    })
  }

  return (
    <div>
      CreateBooks
    </div>
  )
}

export default CreateBooks
