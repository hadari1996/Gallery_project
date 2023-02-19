import mongoose from "mongoose";
import ImageModel from "./imageModel";
import jwt from "jwt-simple";
import UserModel from "./../users/userModel";

export async function createImages(req, res) {
  try {
    const {userID} = req.cookies;
    if (!userID) throw new Error("couldn't find userID");
    const secret = process.env.SECRET;
    if (!secret) throw new Error("couldn't find secret from .env");
    const decodedUserID = jwt.decode(userID, secret);
    const { userId } = decodedUserID;
    const { img_src, alt } = req.body;
    const imageDB = await ImageModel.create({img_source: img_src,alt: alt,userid: userId,});
    if (!imageDB) throw new Error("no Image was created");
    res.send({ success: true, imageDB });
  } catch (error) {
      res.status(500).send({ success: false, error: error.message });
  }
}
export async function getAllImages(req, res) {
  try {
    const imagesDB = await ImageModel.find();
    if (!imagesDB) {
      throw new Error(
        "no images found on FUNCTION getAllImages IN FILE imagerCtrl"
      );
    }
    res.send({ imagesDB });
  } 
  catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getUserImages(req, res) {
  try {
    const {userID} =req.cookies;
    if (!userID) throw new Error("couldn't find userID");
    const secret = process.env.SECRET;
    if (!secret) throw new Error("couldn't find secret from .env");
    const decodedUserID = jwt.decode(userID, secret);
    const { userId } = decodedUserID;
    if (!userId) throw new Error("no userId found in cookie")
    console.log(userId)
    const imagesDB = await ImageModel.find({userid: userId});
    if (!imagesDB) {
      throw new Error(
        "no images found on FUNCTION getUserImages IN FILE imagerCtrl"
      );

   }
    res.send({ imagesDB });
  } catch (error) {
        res.status(500).send({ error: error.message });
  }
}

export async function deleteImage(req, res) {
  try {
       const imageDB = await ImageModel.findByIdAndDelete(req.params.id);
       if (!imageDB) throw new Error("couldn't find imageDB in deleteImage");
       const imagesDB = await ImageModel.find();
       res.send({ imagesDB });
  } 
  catch (error) {
       res.status(500).send({ error: error.message });
  }
}

export async function updateImageByID(req, res) {
  try {
        const {userID} =req.cookies;
        if (!userID) throw new Error("couldn't find userID");
        const {alt} = req.params;
        const {src} = req.body;
        if( !alt || !src) throw new Error("no alt or src on updateImageByID")
        const secret = process.env.SECRET;
        if (!secret) throw new Error("couldn't find secret from .env");
        const decodedUserID = jwt.decode(userID, secret);
        const {userId} = decodedUserID;
        console.log(`the user ${userId}`);
        if (!userId) throw new Error("no userId found in cookie")
        const imageDB = await ImageModel.findOne({userid: userId, alt: alt})
        if (!imageDB) throw new Error("no image found")
        imageDB.img_source = src;
        const editedImageDB = await imageDB.save();
        res.send({ok: true})
  } 
  catch (error) {
        res.status(500).send({ error: error.message });
  }
}



export async function searchDB(req, res) {
    try {
      const alt = req.params.alt;
      if( !alt ) throw new Error("no alt on searchDB")
      const {searchString} = req.body
      const pattern = RegExp(searchString)
      const altDBnoReg = await ImageModel.find({"alt": searchString})
      const altDB = await ImageModel.find({'alt':{ $regex : pattern}})
      res.send({altDB, altDBnoReg})
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }