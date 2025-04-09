const {blogs}=require("../models/blogs");
const cloudinary=require("../cloudinary");

let uRl="";

async function setvalue(req,res)
{
    uRl= req.body.image_id;
    return res.json({uriii:uRl});
        
}

async function makeblog(req,res)
{
    let start=0,end=4;
    await new Promise((resolve) => {
        const interval = setInterval(() => {
            if (start===end) {
                clearInterval(interval);
                resolve();
            }
            start++;
        }, 1000);

    });
    
    const data=req.body;

    let Title="No Title";
    let imagelocation;

    try
    {

        imagelocation=await cloudinary.uploader.upload(uRl==="" ? "./static/images/bloggify.jpg" :uRl,
        {
            folder:"images"
        
        });

        if(data.title) Title=data.title;
        const blog=blogs({
            title:Title,
            blogimage: {
                public_id:imagelocation.public_id,
                url:imagelocation.secure_url
            },
            body:data.content,
            created_by:req.user._id
        });

        blog.save();
        uRl="";

    }
    catch(error){
        console.error(error);
        if(error.message==="Request Timeout")
        {
            res.send("Request Timeout... Try after Sometime...");
        }
    }
    return res.redirect(301,"/");

}



module.exports={makeblog,setvalue};