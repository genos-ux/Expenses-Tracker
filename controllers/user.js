import { UserModel } from "../models/user.js";
import jwt from "jsonwebtoken";
import { userValidator } from "../validators/user.js";
import bcrypt from 'bcrypt';
import config from '../config.js';

export const registerUser = async (req, res) => {
  // Validate the data.

  const { error, value } = userValidator.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  // console.log(value);

  const existingUser = await UserModel.findOne({ email: value.email });

  // console.log(existingUser);

  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  } else {
    const hashedPassword = await bcrypt.hash(value.password, 12);
    // const newUser = await User.create(...value, value.password=hashedPassword);

    const newUser = await UserModel.create({
      userName: value.userName,
      email: value.email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  }
};

export const loginUser = async(req,res) => {
    // const { error, value } = userValidator.validate(req.body);

    // if(error)
    // {
    //     res.status(400).json({message: error.details[0].message});
    // }

    const {password,email} = req.body;

    const user = await UserModel.findOne({email});

    if(!user)
    {
      res.status(401).json({message: 'Email or password is invalid.'});
    }

    const passwordMatch = await bcrypt.compare(password,user.password);

    if(!passwordMatch)
    {
      return res.status(401).json({message: 'Email or password is invalid.'});
    }

    const accessToken = jwt.sign({userId: user._id},config.accessToken,{subject:'accessApi',expiresIn: '1d'});

    return res.status(200).json({
      id: user._id,
      userName: user.userName,
      email: user.email,
      accessToken
    })




}
