import { ExpenseModel } from "../models/expenses";


export const Register = async(req,res)=> {
    const {username, password}  = req.body;

    if(!username || !password)
    {
        return res.status(422).json({message: 'Please fill in all fields (username and password)'});
    }

    if(await ExpenseModel.findOne({email}))
    {
        res.status(409).json({message: 'Email already exists.'});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await ExpenseModel.create({
        username,
        password: hashedPassword
    })


}

export const Login = async(req,res)=> {
    const {email,password} = req.body;

    if(!email || !password)
    {
        return res.status(422).json({message:'Pls fill in all fields (email and password)'});
    }

    const user = await ExpenseModel.findOne({email});

    if(!user)
    {
        return res.status(401).json({message: 'Email or password is invalid.'})
    }

    const passwordMatch = await bcrypt.compare(password,user.password);

    if(!passwordMatch)
    {
        return res.status(401).json({message: 'Email or password is invalid.'});
    }

    const accessToken = jwt.sign({userId: user._id},config.accessTokenSecret,{subject: 'accessApi',expiresIn: '1d'});

    return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken
    })
}
