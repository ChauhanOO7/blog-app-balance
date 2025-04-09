const express=require("express");
const {handlesignup}=require("../controllers/signup")
const router=express.Router();

router.post("/",handlesignup);
router.get("/",(req,res)=>{
    res.render("signup");
});

module.exports=router;