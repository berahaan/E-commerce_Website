require("dotenv").config()
import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import { user } from "./Model.js";
import { CheckProcess } from "./Model.js";
import { Register } from "./Model.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import bcrypt from "bcrypt";
const app = express();
const PORT =process.env.SERVER_PORT ||2000
app.use(express.json());
app.use(express.static("Public"));
app.use(bodyParser.json());
app.use(
  cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use("/image", express.static(path.join("Public/image")));
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error: ", err);
  });
app.use(
  session({
    secret:process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:process.env.MONGODB_CONNECTION,
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
    },
  })
);

const storage = multer.diskStorage({
  destination: (req, resp, cb) => {
    cb(null, "Public/image");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
app.post("/upload", upload.single("file"), (req, resp) => {
  if (!req.file) {
    return resp.status(400).json({ message: "No file uploaded" });
  }
  const { productName, description, price, discount, Catagory } = req.body;
  user
    .create({
      image: req.file.filename,
      productName,
      description,
      price,
      Catagory,
      discount,
    })
    .then((result) =>
      resp.json({ imageUrl: `Public/image/${req.file.filename}`, result })
    )
    .catch((err) => {
      console.log(err);
      resp.status(500).json({ message: "Server error" });
    });
});
app.get("/getimage", async (req, resp) => {
  await user.find().then((result) => {
    resp.status(200).json(result);
  });
});
app.post("/checkout", async (req, resp) => {
  try {
    const { customerInfo, cart, totalPrice } = req.body;
    // console.log("Total Price :: ", totalPrice);

    const newCheckout = new CheckProcess({
      name: customerInfo.name,
      address: customerInfo.address,
      email: customerInfo.email,
      transactionUrl: customerInfo.transactionUrl,
      totalPrice,
      status: false, // Set default status or manage according to your logic
    });
    await newCheckout.save();
    resp.status(201).json({ success: true, data: newCheckout });
  } catch (error) {
    console.log(error);
  }
});
app.get("/getorders", async (req, res) => {
  try {
    const orders = await CheckProcess.find({}); // Fetch all orders, you can add filters if needed
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
});
app.put("/confirm-order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await CheckProcess.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.status = true;
    const date = new Date();
    const ff = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
    order.confirmationMessage = `dear ${order.name} Your order has been successfully confirmed.Thanks `;
    // console.log(order.confirmationMessage);
    await order.save();
    res.json({ success: true, message: "Order confirmed", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error confirming order" });
  }
});
///////////////////////////////////////////////////
///////////////////////////////////////////////////
app.put("/updateProduct/:id", async (req, res) => {
  const { id } = req.params;
  const { productName, price, discount, description, Catagory, image } =
    req.body;
  try {
    const updatedProduct = await user.findByIdAndUpdate(
      id,
      {
        productName,
        price,
        discount,
        description,
        Catagory,
        image,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Could not hash the password");
  }
};
function isAuthenticated(req, res, next) {
  // console.log("isAuthenticated middleware:", req.session);
  if (req.session.userId) {
    return next();
  } else {
    return res.status(401).json({ message: "Please log in" });
  }
}

function hasRole(role) {
  return (req, res, next) => {
    // console.log("hasRole middleware:", req.session);
    if (req.session.role === role) {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  };
}
// Protected routes
app.get("/admin", isAuthenticated, hasRole("admin"), (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome, HR pages guys be free to be whom you are" });
});
app.get("/customer", isAuthenticated, hasRole("customer"), (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome,pages guys be free to be whom you are" });
});
//
app.post("/register", async (req, res) => {
  const { email, password, role, Username } = req.body;
  try {
    if (!Username || !email || !password || !role) {
      return res.status(204).json({ message: "All fields are required" });
    }
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(203).json({ message: "Email already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const user = new Register({
      Username,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.status(201).json({ message: "Successfully Registered!" });
  } catch (error) {
    console.error("Error saving user to database:", error);
    res.status(500).json({ message: "Registration failed!" });
  }
});
app.get("/getUsername/:email", async (req, resp) => {
  const { email } = req.params;
  // console.log("Email sent from login pages is in server sides ", email);
  try {
    const User = await Register.findOne({ email });
    return resp.json(User);
  } catch (error) {
    console.log(error);
  }
});
// get email from login and sent it to the customer customes pages and admin pages
app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res
      .status(206)
      .json({ messsage: "Please fill all required filled!!" });
  }
  try {
    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch && user.role === role) {
      req.session.userId = user._id;
      req.session.role = user.role;
      req.session.cookie.maxAge = 1000 * 60 * 30;
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Login failed" });
  }
});
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
app.get("/find/:Catagory", async (req, resp) => {
  const { Catagory } = req.params;
  // console.log("Here is catagory selected in server sides ", Catagory);
  try {
    const response = await user.find({ Catagory });
    resp.json(response);
  } catch (error) {
    console.log(error);
  }
});
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
app.delete("/remove/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    await user.findByIdAndDelete(id);
    resp.json({ message: "Employee terminated successfully" });
  } catch (error) {
    console.log(error);
  }
});
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log("Server is running on port",PORT);
});
