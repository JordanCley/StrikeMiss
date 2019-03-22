var express = require("express");
var router  = express.Router();
var Bowler = require("../models/bowlers");

//INCREMENT ROUTE
router.post("/bowlers/:id/increase", function(req, res){
    Bowler.findByIdAndUpdate({ _id: req.params.id }, { $inc: {missedStrikes: 1 } }, {new: true },function(err, response){
        if(err){
            res.redirect("/bowlers");
        } else {
            res.redirect("/bowlers");
        }
    });
});

module.exports = router;
