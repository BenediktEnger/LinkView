import { Router, Request, Response } from "express";
import { User } from "../models/Mongoose/UserSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import encryptSecret from "../secret";
import { verifyToken } from "./middleware/authMiddleWare";

const router = Router();
router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const { name, email, password } = user;

    const isEmailAllReadyExist = await User.findOne({
      email: email,
    });

    if (isEmailAllReadyExist) {
      res.status(400).json({
        status: 400,
        message: "Email all ready in use",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // now create the user;
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Send the newUser as  response;
    res.status(200).json({
      status: 201,
      success: true,
      message: " User created Successfully",
      user: newUser,
    });
  } catch (error: any) {
    // console the error to debug
    console.log(error);

    // Send the error message to the client
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    // ** Get The User Data From Body ;
    const user = req.body;

    // ** destructure the information from user;
    const { email, password } = user;

    // ** Check the (email/user) exist  in database or not ;
    const isUserExist = await User.findOne({
      email: email,
    });

    // ** if there is not any user we will send user not found;
    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
      return;
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExist?.password
    );

    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "wrong password",
      });
      return;
    }

    const token = jwt.sign(
      { _id: isUserExist?._id, email: isUserExist?.email },
      encryptSecret,
      {
        expiresIn: "1d",
      }
    );

    // send the response
    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    // Send the error message to the client
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

router.get("/test", verifyToken, async (req, res) => {
  res.status(200).json({ message: "Hello" });
  return;
});
export { router };
