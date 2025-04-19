import express from "express";
import cors from "cors";
import dotevn from "dotenv";
import connectdb from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
dotevn.config();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/api/v1/tasks", taskRoutes);

// Connect to database
connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
    process.exit(1);
  });
