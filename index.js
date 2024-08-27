const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 8001;

const path = require("path");
const urlRoute = require("./routes/url")
const staticRoute = require('./routes/staticRoute.js');
const userRoute = require('./routes/user');
const {restrictToLoggedinUserOnly, checkAuth}= require('./middleware/auth.js');
const {checkForAuthentication, restrictTo} = require("./middleware/auth.js");


const URL = require("./models/url.js");
const {handleMongoConnection} = require("./connect.js");




handleMongoConnection("mongodb://127.0.0.1:27017/short-url")
    .then(()=>console.log("MongoDB connection established"))
    .catch((err)=>console.log("Mongo error: ",err));


app.set('view engine','ejs');
app.set("views",path.join(__dirname,"views"));



app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/url',restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use('/user',userRoute);
app.use('/',staticRoute);

app.get("/test",async(req,res)=>{
    const allUrls = await URL.find({});
    return res.render("homepage",{
        urls: allUrls,
    });
});
app.get("/url/:shortId",async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistort: {
                timestamp: Date.now(),
            }
        },
    });
    res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>console.log(`Server Started at port: ${PORT}`));