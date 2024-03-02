import express from "express"
import { Book } from "../models/books.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";

const router = express.Router()


  router.post(
    "/",
    asyncHandler(async (request, response) => {
      try {
        if (
          !request.body.title ||
          !request.body.author ||
          !request.body.publishYear
        ) {
          return response.status(400).send({
            message: "Send all required fields: title, author, publishYear",
          });
        }
        const newBook = {
          title: request.body.title,
          author: request.body.author,
          publishYear: request.body.publishYear,
        };
  
        const book = await Book.create(newBook);
  
        return response.status(201).send(book);
      } catch (error) {
        throw new apiError(500, error.message);
      }
    })
  );
  
  router.get(
    "/",
    asyncHandler(async (req, res) => {
      try {
        const books = await Book.find({});
  
        return res.status(200).json({
          count: books.length,
          data: books,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
      }
    })
  );
  
  router.get(
    "/:id",
    asyncHandler(async (req, res) => {
      try {
        const { id } = req.params;
        const book = await Book.findById(id);
  
        return res.status(200).json(book);
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
      }
    })
  );
  
  router.put(
    "/:id",
    async (req, res) => {
      try {
        if (
          !req.body.title ||
          !req.body.author ||
          !req.body.publishYear
        ) {
          return res.status(400).send({
            message: 'Send all required fields: title, author, publishYear',
          });
        }
    
        const { id } = req.params;
    
        const result = await Book.findByIdAndUpdate(id, req.body);
    
        if (!result) {
          return res.status(404).json({ message: 'Book not found' });
        }
    
        return res.status(200).send({ message: 'Book updated successfully' });
      } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
      }
    });
  
  router.delete(
    "/:id",
    asyncHandler(async (req, res)=>{
      try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
          return res.status(404).json({message: "Book not found"})
        }
        return res.status(200).json({message: "Book deleted successfully"});
      } catch (error) {
        console.log(error.message);
        res.status(400).send({message: error.message});
      }
    })
  )
  

  export default router;