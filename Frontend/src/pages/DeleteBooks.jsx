import React,{ useState } from 'react'
import {BackBtn, Spinner} from '../components/index.js'
import axios from "axios"
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteBooks() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar()
  const handleDeleteBook =()=>{
    setLoading(true);
    axios
    // .delete(`http://localhost:5555/books/${id}`)
    .delete(`http://book-store-api-beige.vercel.app/books/${id}`)
    .then((res)=>{
      setLoading(false);
      // alert("Successfully deleted book")
      enqueueSnackbar('Successfully deleted book', { variant: 'success' });
      navigate('/')
    })
    .catch((error)=>{
      setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
    })
  }
  return (
    <div className='p-4'>
      <BackBtn />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBooks
