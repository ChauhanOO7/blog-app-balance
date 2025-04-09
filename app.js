const express=require("express");
const path=require("path");
const favicon=require("serve-favicon");
const bodyParser=require("body-parser");
const cookieparser=require("cookie-parser");
const mongoose=require("mongoose");
const app=express();
const viewpath=path.join(__dirname,"views");
const staticpath=path.join(__dirname,"static");
const PORT=process.env.PORT || 8000;
const database_url=process.env.database_url || "mongodb://127.0.0.1:27017/blogs";

//routes
const staticroutes=require("./routes/staticroute");
const loginroute=require("./routes/login");
const signuproute=require("./routes/signup");


//database connectivity

mongoose.connect(database_url).then(()=>{
    console.log("database is connected...");
}).catch((err)=>{
    console.error(err);
});

//middlewares
app.use(favicon(path.join(__dirname,'static','images','favicon.ico')));
app.use(bodyParser.json({ limit: '100mb' }));
app.use("/static",express.static(staticpath));
app.set("view engine","pug");
app.set("views",viewpath);
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json({ limit: '100mb' }));
app.use(cookieparser());

//routing
app.use("/",staticroutes);
app.use("/login",loginroute);
app.use("/signup",signuproute);


app.listen(PORT,()=>{
    console.log("server is connected...");
});