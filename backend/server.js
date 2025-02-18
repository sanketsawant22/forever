import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

// APP CONFIGURATION
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// MIDDLEWARES
app.use(cors());
app.use(express.json())

// API ENDPOINTS
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)

app.get("/", (req, res) => {
    res.send("API working");
})

app.listen(port, () => {
    console.log(`Server is Listening on : http://localhost:${port}`);
});