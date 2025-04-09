const mongoose=require("mongoose");

const commentschema=new mongoose.Schema(
    {
       comment:{
        type:String
        },
        blog_id:{
            type:String
        },
        user_name:{
            type:String
        }

    }
);

const comments=mongoose.model("comments",commentschema);

module.exports={comments};