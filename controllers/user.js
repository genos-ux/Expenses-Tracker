import { UserModel } from "../models/user.js";
import {PasswordRecoveryModel} from "../models/password-recovery.js";
import jwt from "jsonwebtoken";
import { userValidator, recoverPasswordValidator } from "../validators/user.js";
import bcrypt from 'bcrypt';
import config from '../config.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

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

    const {error, value} = loginValidator.validate(req.body);

    if(!error)
    {
      return res.status(422).json(error);
    }

    const user = await UserModel.findOne({email: value.email});

    if(!user)
    {
      res.status(401).json({message: 'Email or password is invalid.'});
    }

    const passwordMatch = await bcrypt.compare(value.password,user.password);

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

export const forgotPassword = async(req,res) => {

 try {
   // Validate the data.
   const {error, value} = recoverPasswordValidator.validate(req.body);

   if (error) {
     res.status(400).json({ error });
   }

   const existingUser = await PasswordRecoveryModel.findOne({ email: value.email });

   if(!existingUser)
   {
     return res.status(404).json('User not found!');
   }

   const resetToken = crypto.randomBytes(20).toString('hex');

   await PasswordRecoveryModel.create({
     ...value,
     resetToken,
     resetTokenExpires: Date.now() + 3600000 //expires in an hour
   })

   const transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 587,
     auth: {
       user: 'gabriel.kyeremateng.gk@gmail.com',
       pass: 'Pass1word?'
     }
   });

   const mailOptions = {
     from : 'gabriel.kyeremateng.gk@gmail.com',
     to: 'user.gmail',
     subject: 'Password Reset',
     text: `Hello, \n\nYou are receiving this email because you (or someone else) have requested the reset of the password of your for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://localhost:3000/reset-password/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n `
   };

   transporter.sendMail(mailOptions, (err,info) => {
     if(err)
     {
       return console.log(err);
     }
     console.log('Email sent:' + info.response);
   })
   res.send({message: 'Email sent successfully'});
 } catch (error) {
    res.status(500).send('Error sending email');
 }
}
