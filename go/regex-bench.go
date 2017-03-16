package main

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"regexp"
	"strings"
)

type parserCollection struct {
	XMLName             xml.Name      `xml:"parserCollection"`
	Version             string        `xml:"xsi,attr"`
	CommandOutputParser []outputParse `xml:"commandOutputParser"`
}

type outputParse struct {
	XMLName xml.Name `xml:"commandOutputParser"`
	Name    string   `xml:"name,attr"`
	Parser  []parse  `xml:"parser"`
}

type parse struct {
	XMLName     xml.Name `xml:"parser"`
	Start       string   `xml:"start,attr"`
	Description string   `xml:",innerxml"`
}

func main() {
	totalRegexs := 0
	xmlData, _ := ioutil.ReadFile("../parser_data/discovery_parser.xml")
	inp, _ := ioutil.ReadFile("../parser_data/101301020-show-version.txt")
	splitInp := strings.Split(string(inp), "\n")

	parseXml := parserCollection{}
	xml.Unmarshal(xmlData, &parseXml)

	for _, outParse := range parseXml.CommandOutputParser {
		for _, parser := range outParse.Parser {
			if parser.Start != "" {
				totalRegexs++

				for indx, _ := range splitInp {
					matched, _ := regexp.MatchString(parser.Start, splitInp[indx])
					if matched {
						fmt.Println(splitInp[indx])
					}
				}
			}
		}
	}

	fmt.Printf("\n\nRan %d regex searches", totalRegexs)
}
