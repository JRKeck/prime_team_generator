var express = require('express');
var router = express.Router();
var path = require('path');
var modAdj = require("../public/assets/data/modifying_adjectives.json");
var adj = require("../public/assets/data/adjectives.json");
var javaScript = require("../public/assets/data/javascript.json");


router.get('/data1', function(req, res){
    res.json(modAdj);
});

router.get('/data2', function(req, res){
    res.json(adj);
});

router.get('/data3', function(req, res){
    res.json(javaScript);
});

router.get("/*", function(req, res){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;