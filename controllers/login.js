const {users}=require("../models/signup");
const { v4: uuidv4 } = require('uuid');
const {setUser,getUser}=require("../services/mapping");

async function handlelogin(req,res)
{
    const Email=req.body.email;
    const pass=req.body.password;
    const user=await users.findOne({email:Email,password:pass});

    if(!user)   return res.redirect(301,"/signup");

    const uid=uuidv4();
    res.cookie("uid",uid);
    setUser(uid,user);

    return res.redirect(301,"/");

}

async function checklogin(req,res,next)
{
    const Uid=req.cookies?.uid;

    if(!Uid)    return res.redirect(301,"/login");
    const user=getUser(Uid);
    
    if(!user)   return res.redirect(301,"/login");

    req.user=user;
    next();
}

async function checkauth(req,res,next)
{
    const Uid=req.cookies?.uid;

    const User=getUser(Uid);
    
    req.user=User;
    next();
}

module.exports={handlelogin,checklogin,checkauth};