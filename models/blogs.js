const mongoose=require("mongoose");

const blogschema=new mongoose.Schema(
    {
       title:{
        type:String
        },
        blogimage:{
            public_id:{
                type:String
            },
            url:{
                type:String
            }
        },
        body:{
            type:String
        },
        created_by:{
            type:String
        }
    }
    
);

const blogs=mongoose.model("blogs",blogschema);

module.exports={blogs};