
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';


import defaultHeaders from "./middleware/headers.js";
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import { findAllTutorial, createTutorial } from './controllers/tutorial.controller.js';
import db from './models/index.js';

const app = express();



app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(defaultHeaders);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use('/posts', postRoutes);
app.use('/user', userRouter);
app.get("/tutorials", findAllTutorial);
app.post('/tutorials/create', createTutorial);

const PORT = process.env.PORT|| 5000;

db.sequelize.sync();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});