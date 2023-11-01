const express=require("express");
const router=express.Router();
const {GetAllUsers,PostUser, CheckUser,sendUserDetailsFromJWT}=require("../Controller/controller")

router.get('/',GetAllUsers)
router.post('/',PostUser);
router.post('/check',CheckUser);
router.get('/getUserFromToken',sendUserDetailsFromJWT)

module.exports=router