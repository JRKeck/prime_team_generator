var express = require('express');
var router = express.Router();
var path = require('path');
var cohortData = require("../public/assets/data/gamma_cohort.json");

router.get('/data', function(req, res){
    res.json(cohortData);
});

router.get("/*", function(req, res){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;