"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var xml = require("xml2js");
var data = fs.readFileSync("../parser_data/101301020-show-version.txt", "ascii").toString().split('\r\n');
var catelogData = fs.readFileSync("../parser_data/discovery_parser.xml", "ascii");
var totalRegexs = 0;
xml.parseString(catelogData, function (err, result) {
    for (var _i = 0, _a = result.parserCollection.commandOutputParser; _i < _a.length; _i++) {
        var cmdParser = _a[_i];
        for (var _b = 0, _c = cmdParser.parser; _b < _c.length; _b++) {
            var parse = _c[_b];
            if (parse.$['start']) {
                var reg = new RegExp(parse.$['start'], "i");
                totalRegexs++;
                for (var i = 0; i < data.length; i++) {
                    if (reg.test(data[i])) {
                        console.log(data[i]);
                    }
                }
            }
        }
    }
    console.log("\n\nRan " + totalRegexs + " regex searches");
});
