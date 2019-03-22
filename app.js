require('dotenv').config()

var methodOverride   = require("method-override"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    app              = express();

//requiring routes
var indexRoutes  = require("./routes/index"),
    bowlerRoutes = require("./routes/bowlers"),
    incrementRoutes = require("./routes/increment");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine" , "ejs");
app.use(methodOverride("_method"));

app.use(indexRoutes);
app.use(bowlerRoutes);
app.use(incrementRoutes);

app.listen(process.env.PORT || 3000, function(){
    console.log("StrikeMiss server has started!");
});