// routes/userRouter.js
import express from "express";
import authUser from "../middlewares/authUser.js";
import { getProfile , updateProfile , list_Appointment , cancelAppointment } from "../controllers/getProfile.js";
import upload from "../middlewares/multer.js";
// import { registerUser, loginUser } from "../controllers/userController.js"; // deprecated

const userRouter = express.Router();

// If you still want to keep register/login for legacy reasons, re-enable these routes
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.get('/appointments', authUser, list_Appointment);
userRouter.post('/remove-appointment', authUser, cancelAppointment);

export default userRouter;
