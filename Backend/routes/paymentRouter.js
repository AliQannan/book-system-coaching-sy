import express from 'express';
import { createOrder , captureOrder} from '../controllers/paymentController.js';
import authUser from '../middlewares/authUser.js';
const paymentRouter = express.Router();


paymentRouter.post("/create-order",authUser, createOrder);
paymentRouter.post("/capture-order" , authUser, captureOrder);


export default paymentRouter;