var mongoose = require("mongoose");

// SCHEMA SETUP
var bowlerSchema = new mongoose.Schema({
    bowler: "String",
    missedStrikes: {type: Number, default:0},
});

module.exports = mongoose.model("Bowler", bowlerSchema);
