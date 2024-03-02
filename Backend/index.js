import express, { json } from "express";
import mongoose from "mongoose";
import { PORT, PROJECT_ID } from "./config.js";
import { Book } from "./models/books.models.js";
import booksRoutes from './routes/books.routes.js'
import cors from "cors"


const app = express();
const Port = PORT || 3000;

app.use(express.json({ limit: "16kb" }));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELET'],
  allowedHeaders: ['Contenet-Type'],
}));
app.use('/books',booksRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});


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
