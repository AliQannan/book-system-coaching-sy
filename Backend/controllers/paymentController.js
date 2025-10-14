import paypal from "@paypal/checkout-server-sdk";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

// Step 1: Create PayPal order
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount,
          },
        },
      ],
    });

    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating PayPal order" });
  }
};

// Step 2: Capture PayPal payment and then book appointment
export const captureOrder = async (req, res) => {
  try {
    const { orderID, userId, docId, slotDate, slotTime } = req.body;

    // Capture payment
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    const capture = await client.execute(request);

    if (capture.result.status === "COMPLETED") {
      // payment success → create appointment
      const docData = await doctorModel.findById(docId).select("-password");
      if (!docData.available)
        return res.json({ success: false, message: "Doctor not available" });

      let slots_booked = docData.slots_booked || {};
      if (slots_booked[slotDate]?.includes(slotTime))
        return res.json({ success: false, message: "Slot already booked" });

      if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);

      const userData = await userModel.findById(userId).select("-password");
      const appointmentData = {
        userId,
        docId,
        userData,
        docData,
        slotTime,
        amount: docData.fees,
        slotDate,
        date: Date.now(),
      };
      const newAppointment = new appointmentModel(appointmentData);
      await newAppointment.save();
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });

      res.json({ success: true, message: "Appointment booked & payment completed" });
    } else {
      res.json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
