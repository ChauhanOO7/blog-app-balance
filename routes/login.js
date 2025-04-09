const express=require("express");
const router=express.Router();
const {handlelogin}=require("../controllers/login");

router.post("/",handlelogin);
router.get("/",(req,res)=>{
    res.render("loginup");
});



module.exports=router;