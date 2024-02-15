import Users from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res, next) => {

    try {

        const users = await Users.findAll({

            atrributes:['id', 'name', 'email']

        });
      
        res.json(users);
        
    } catch (error) {

        console.error(error);
        
    }

}



export const Register = async (req, res, next) => {
  const { name, email, password, confirmpassword } = req.body;

  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format. Please provide a valid email address.' });
  }

  // Check password and confirmation match
  if (password !== confirmpassword) {
    return res.status(400).json({ message: 'Invalid password with confirmation' });
  }

  try {
    // Check if a user with the same email already exists in the database
    const existingUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      // If a user with the same email exists, return an error response
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password and create a new user
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    res.json({ message: 'Registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





export const Login = async(req, res, next) => {

    try {
        
   const user = await Users.findAll({

    where:{
       email: req.body.email
    }

   });

   const match = await bcrypt.compare(req.body.password, user[0].password);
   if(!match) return  res.status(404).json({message:'Wrong password'});
   const userID = user[0].id;
   const name = user[0].name;
   const email = user[0].email;
   const accessToken = jwt.sign({userID, name, email}, process.env.ACCESS_TOKEN_SECRET,{

    expiresIn: '60s'

   });
   const refreshToken = jwt.sign({userID, name, email}, process.env.REFRESH_TOKEN_SECRET,{

    expiresIn: '1h'

   });

  await Users.update({refresh_token: refreshToken}, {


    where: {

        id:userID

    }
});
res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
});
res.json({accessToken})

    } catch (error) {

        res.status(404).json({message:'Password mismatch'});
        
    }


}

export const Logout = async (req, res) => {

    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
      where: {
         refresh_token: refreshToken
    
      }
    
    });
    if(!user[0]) return res.sendStatus(204);
    const userID = user[0].id;
    await  Users.update({resfresh_token: null}, {
           
        where : {

        id : userID 

        }
    });
    res.clearCookie(refreshToken);
    return res.sendStatus(200);


    }


