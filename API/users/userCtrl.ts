import mongoose from "mongoose";
import UserModel, {UserValidation} from './userModel';
import bcrypt from  'bcrypt';
import jwt from 'jwt-simple';
const saltRounds=10;
export async function login(req,res) {
    try{
        const{emailLogin, passwordLogin}= req.body;
        if(!emailLogin|| !passwordLogin)
        throw new Error("email or password not found")
        const userDB= await UserModel.findOne({email:emailLogin});
        if(!userDB)
          throw new Error("User not found")
        const isMatched= await bcrypt.compare(passwordLogin, userDB.password);
        if(!isMatched)  throw new Error("password not match")
        const cookie= {userId:userDB._id}; // {userId: 5654sdvsv}
        const secret=process.env.SECRET;
        if(!secret)throw new Error("couldn't find secret from .env");
        const JWTCookie= jwt.encode(cookie, secret);
        console.log(userDB);
        if(userDB)
        {
          res.cookie("userID", JWTCookie);
          res.send({login:true, userDB});
        }
        else  
          res.send({login:false});
    }
    catch(error){
      res.status(500).send({error:error.message, login:false})
    }
}

export async function register(req,res) {

  try{
    const {password, email, first_Name, last_Name, repeat_Password, age}= req.body;
    if(!password|| !email|| !first_Name ||!last_Name || !repeat_Password || !age)
    throw new Error("password ,email, firstName, lastName , age didn`t get from client in handleRegister")
    const {error}= UserValidation.validate({
      email,
      password,
      first_Name,
      last_Name, 
      repeat_Password

    })
    if (error) throw error;
    const salt= bcrypt.genSaltSync(saltRounds);
    const hash= bcrypt.hashSync(password,salt)
    const usersDB= await UserModel.create({email:email, password:hash, first_name:first_Name, last_name:last_Name, age:age})
    if(!usersDB) throw new Error("no user was created")
    res.send({success:true, usersDB})
  }   
  catch(error){
    res.status(500).send({success:false ,error: error.message });
  }
}


export async function getUserByCookie(req,res) {

  try{
    const {userID}= req.cookies;
    if (!userID) throw new Error("no cookie found")
    const secret =process.env.SECRET;
    if(!secret) throw new Error("couldn't find secret from .env");
    const decodedUserID= jwt.decode(userID,secret); // {id: ksfgyzkjsfgvyfhfv}
    const {userId}= decodedUserID;
    if(!userId) throw new Error("couldn`t find user from cookies");
    const userDB= await UserModel.findById(userId);
    if(!userDB) throw new Error(`Couldn't find user id with the id: ${userId}`);
    res.send({login:true, userDB, userId})
    }
  catch(error){

    res.send({error:error.message});
  }
  
}
export async function logout(req, res){
  try{
    res.clearCookie("userID");
    res.send({logout:true});
  }
  catch(error){
    res.status(500).send({error:error.message});
  }
}