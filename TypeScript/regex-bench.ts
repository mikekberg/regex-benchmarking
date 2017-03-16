import * as fs from "fs"
import * as xml from "xml2js"

var data = fs.readFileSync("../parser_data/101301020-show-version.txt", "ascii").toString().split('\r\n');
var catelogData = fs.readFileSync("../parser_data/discovery_parser.xml", "ascii");
var totalRegexs = 0;

xml.parseString(catelogData, (err, result) => {
    for (var cmdParser of result.parserCollection.commandOutputParser) {
        for (var parse of cmdParser.parser) {
            if (parse.$['start']) {
                var reg = new RegExp(parse.$['start'], "i");
                totalRegexs++;

                for (var i=0;i<data.length;i++) {
                    if (reg.test(data[i])) {
                        console.log(data[i]);
                    }
                }
            }
        }
    }

    console.log(`\n\nRan ${totalRegexs} regex searches`);
});