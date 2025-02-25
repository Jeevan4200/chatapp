const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Correct import without destructuring
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes); // No destructuring here

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});
