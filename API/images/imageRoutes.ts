import express  from "express";
import{
    createImages,
getAllImages, 
deleteImage,
getUserImages,
updateImageByID,
searchDB}

from "./imageCtrl"
const router=express.Router();
router
.post("/allImages", createImages )
.get("/getallImages",getAllImages )
.delete("/:id",deleteImage)
.get("",getUserImages)
.patch("/:alt", updateImageByID)
.post("/:alt", searchDB)

export default router;







