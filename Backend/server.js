import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoutes.js";
import paymentRouter from "./routes/paymentRouter.js";

// Initialize app and connect to database
const app = express();
const port = process.env.PORT || 4000;

connectDB(); 
connectCloudinary();

// CORS Configuration — allow only localhost
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:5174"// your local frontend URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ["Content-Type", "Authorization", "atoken", "dtoken", "token"],
  credentials: true
}));

// Middleware to parse JSON requests
app.use(express.json());
app.use('/api/paypal', paymentRouter);

// Endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "API WORKING VERY GOOD!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
