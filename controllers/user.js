import { UserModel } from "../models/user.js";

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

    const newUser = await User.create({
      userName: value.userName,
      email: value.email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  }
};

export const loginUser = (req,res) => {
    const { error, value } = userValidator.validate(req.body);

    if(error)
    {
        res.status(400).json({message: error.details[0].message});
    }


}
