import express, { json } from "express";
import mongoose from "mongoose";
import { PORT, PROJECT_ID } from "./config.js";
import { Book } from "./models/books.models.js";
import booksRoutes from './routes/books.routes.js'
import cors from "cors"


const app = express();
const Port = PORT || 3000;

app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Contenet-Type'],
// }));

// app.use(cors());

app.use(cors({
  origin: ['https://book-store-frontend-rho-two.vercel.app/'],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}))
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
