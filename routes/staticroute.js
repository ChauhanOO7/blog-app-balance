const express=require("express");
const {makeblog,setvalue}=require("../controllers/addblog");
const {checklogin,checkauth}=require("../controllers/login");
const {getUser}=require("../services/mapping");
const {blogs}=require("../models/blogs");
const {comments}=require("../models/comments");
const router=express.Router();
const path=require("path");
let blogwanted;


router.get("/",async (req,res)=>{
    
    const allblogs=await blogs.find({});
    
    const Uid=req.cookies?.uid;
    const User=getUser(Uid);
    
    if(!User)  return res.render("home",{allblogs:allblogs});

    return res.render("homelogin",{allblogs:allblogs});
    
});

router.get("/addblog",(req,res)=>{
    return res.render("addblog");
});

router.get("/about",(req,res)=>{
  
    return res.render("about");
});


router.post("/blogpagedata",async (req,res)=>{

    blogwanted=req.body.content_id;
    res.redirect(301,"/blogpage");
});

router.get("/blogpage",checkauth,async (req,res)=>{

  let User_id;
  if(req.user)  User_id=req.user._id;
  
  const blogshow=await blogs.find({_id:blogwanted});
  let blog_user_id;
  if(blogshow.length!==0)
  {
    blog_user_id=blogshow[0].created_by;
  }
  
  const commentshow=await comments.find({blog_id:blogwanted});
  
 
  if(User_id && blog_user_id && User_id==blog_user_id)
  {
    return res.render("blogpage",{blogcont:blogshow,commentscontent:commentshow,delete_blog:{key:blogwanted},check:{active:true}});
  }
  
  return res.render("blogpage",{blogcont:blogshow,commentscontent:commentshow,check:{active:false}});
});

router.post("/addblog",checklogin,makeblog);

router.post("/addcomments",checklogin,async (req,res)=>{

    const addcomment=await comments({
      comment:req.body.comment,
      blog_id:blogwanted,
      user_name:req.user.name
    });

    addcomment.save();
    return res.redirect(301,"/blogpage");
});

router.post("/deleteblog",async (req,res)=>{

    await blogs.deleteOne({_id:req.body.content_id});
    await comments.deleteMany({blog_id:req.body.content_id});

    return res.redirect(301,"/");
});

router.post("/valueimg",setvalue);


module.exports=router;