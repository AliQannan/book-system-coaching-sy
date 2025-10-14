import express from 'express';
import { createOrder , captureOrder} from '../controllers/paymentController.js';
const paymentRouter = express.Router();


paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/capture-order", captureOrder);


export default paymentRouter;