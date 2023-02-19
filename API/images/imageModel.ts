import mongoose from "mongoose";

const ImageSchema= new mongoose.Schema({
    img_source: {type:String, required:true},
    alt: {type:String, required:true, unique: true},
    userid :{type:String, required:true}
})

const ImageModel=mongoose.model("images",ImageSchema );

export default ImageModel ;


