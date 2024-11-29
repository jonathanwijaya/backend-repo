import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});