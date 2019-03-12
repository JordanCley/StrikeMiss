require('dotenv').config()

var methodOverride   = require("method-override"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    app              = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine" , "ejs");
app.use(methodOverride("_method"));


// SCHEMA SETUP
var bowlerSchema = new mongoose.Schema({
    bowler: "String",
    missedStrikes: {type: Number, default:0},
});

var Bowler = mongoose.model("Bowler", bowlerSchema);


//ROOT ROUTE
app.get("/", function(req, res){
    res.render("landing");
});

//INDEX ROUTE
app.get("/bowlers", function(req, res){
    Bowler.find({}, function(err, bowlers){
        if(err) {
            console.log(err);
        } else {
            res.render("index", {bowlers: bowlers});
        }
    });
});

//NEW ROUTE
app.get("/bowlers/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/bowlers", function(req, res){
    Bowler.create(req.body.bowler, function(err, newBowler){
        if(err) {
            res.render("new");
        } else {
            // then redirect to the index
            res.redirect("/bowlers");
        }
    });
});

//SHOW ROUTE
app.get("/bowlers/:id", function(req, res){
    Bowler.findById(req.params.id, function(err, foundBowler){
        if(err){
            res.redirect("/bowlers");
        } else {
            res.render("show", {bowler: foundBowler});
        }
    });
});

// EDIT ROUTE
app.get("/bowlers/:id/edit", function(req,res){
    Bowler.findById(req.params.id, function(err, foundBowler){
        if(err) {
            res.redirect("/bowlers");
        } else {
            res.render("edit", {bowler: foundBowler});
        }
    });
});

// UPDATE ROUTE
app.put("/bowlers/:id", function(req, res){
    Bowler.findByIdAndUpdate(req.params.id, req.body.bowler, function(err, updatedBowler){
        if(err){
            res.redirect("/bowlers");
        } else {
            res.redirect("/bowlers");
        }
    });
});

//INCREMENT ROUTE
app.post("/bowlers/:id/increase", function(req, res){
    Bowler.findByIdAndUpdate({ _id: req.params.id }, { $inc: {missedStrikes: 1 } }, {new: true },function(err, response){
        if(err){
            res.redirect("/bowlers");
        } else {
            res.redirect("/bowlers");
        }
    });
});



// DESTROY ROUTE
app.delete("/bowlers/:id", function(req, res){
    Bowler.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/bowlers");
            console.log(err);
        } else {
            res.redirect("/bowlers");
        }
    });
});

app.listen(process.env.PORT || 3000, function(){
    console.log("StrikeMiss server has started!");
});