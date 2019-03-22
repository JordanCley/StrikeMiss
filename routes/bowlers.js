var express = require("express");
var router  = express.Router();
var Bowler = require("../models/bowlers");

//INDEX ROUTE
router.get("/bowlers", function(req, res){
    Bowler.find({}, function(err, bowlers){
        if(err) {
            console.log(err);
        } else {
            res.render("index", {bowlers: bowlers});
        }
    });
});

//NEW ROUTE
router.get("/bowlers/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
router.post("/bowlers", function(req, res){
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
router.get("/bowlers/:id", function(req, res){
    Bowler.findById(req.params.id, function(err, foundBowler){
        if(err){
            res.redirect("/bowlers");
        } else {
            res.render("show", {bowler: foundBowler});
        }
    });
});

// EDIT ROUTE
router.get("/bowlers/:id/edit", function(req,res){
    Bowler.findById(req.params.id, function(err, foundBowler){
        if(err) {
            res.redirect("/bowlers");
        } else {
            res.render("edit", {bowler: foundBowler});
        }
    });
});

// UPDATE ROUTE
router.put("/bowlers/:id", function(req, res){
    Bowler.findByIdAndUpdate(req.params.id, req.body.bowler, function(err, updatedBowler){
        if(err){
            res.redirect("/bowlers");
        } else {
            res.redirect("/bowlers");
        }
    });
});

// DESTROY ROUTE
router.delete("/bowlers/:id", function(req, res){
    Bowler.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/bowlers");
            console.log(err);
        } else {
            res.redirect("/bowlers");
        }
    });
});

module.exports = router;
