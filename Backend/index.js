import express, { json } from "express";
import mongoose from "mongoose";
import { PORT, PROJECT_ID } from "./config.js";
import { Book } from "./models/books.models.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import { apiError } from "./utils/apiError.js";

const app = express();
const Port = PORT || 3000;

app.use(express.json({limit: "16kb"}))

app.get("/", (req, res) => {
  res.send("hello");
});

app.post(
  "/books",
  asyncHandler(async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
          ) {
            return response.status(400).send({
              message: 'Send all required fields: title, author, publishYear',
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


app.get('/books', asyncHandler(async(req, res)=>{
    try {
        const books = await Book.find({})

        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message})
    }
}))

app.listen(Port, () => {
  console.log(` serve at http://localhost:${Port}`);
});

mongoose
  .connect(PROJECT_ID)
  .then(() => {
    console.log("Successfully connect DB");
  })
  .catch((error) => {
    console.log(error);
  });
