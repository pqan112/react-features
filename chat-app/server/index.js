import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`);
});

app.get("/", (req, res) => res.send("Welcome to chat server"));

const uri = process.env.MONGO_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection established");
  })
  .catch((error) => console.log(error.message));
