import mongoose from "mongoose";
const addProduct = new mongoose.Schema({
  productName: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  Catagory: {
    type: String,
  },
  discount: {
    type: Number,
  },
});
//////////////////////////////////////////////////////////////
const Checkout = new mongoose.Schema({
  name: { type: String },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  transactionUrl: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: mongoose.Schema.Types.Mixed,
  },
  totalPrice: { type: Number },
  confirmationMessage: {
    type: String,
  },
});
////////////////////////////////////////////////////////////////////////
const RegisterSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
});
const user = new mongoose.model("user", addProduct);
const CheckProcess = new mongoose.model("Checkprocess", Checkout);
const Register = new mongoose.model("Register", RegisterSchema);
export { user, CheckProcess, Register };
