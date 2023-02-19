
import mongoose from "mongoose";
import Joi from 'Joi';
import {joiPasswordExtendCore } from "joi-password";

const JoiPassword= Joi.extend(joiPasswordExtendCore);
const UserSchema= new mongoose.Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    city:{type:String, required:false}
})

const UserModel=mongoose.model("users",UserSchema );


export default UserModel ;

export const UserValidation= Joi.object ({
    email: Joi.string().email().required(),
    password:JoiPassword
            .string()
            .min(2)
            .max(16)
            .minOfNumeric(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .required(),
    repeat_Password: Joi.ref('password'),
    first_Name: Joi.string().required(),
    last_Name: Joi.string().required()
})