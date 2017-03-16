using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace dotnetcore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var fileData = File.ReadAllLines(@"..\parser_data\101301020-show-version.txt");
            var catelogData = XDocument.Load(@"..\parser_data\discovery_parser.xml");
            int totalRegexs = 0;

            foreach (var commandOutputParser in catelogData.Descendants().Where(x => x.Name == "commandOutputParser"))
            foreach (var parse in commandOutputParser.Descendants().Where(x => x.Name == "parser"))
            {
                if (parse.Attribute("start") != null)
                {
                    var reg = new Regex(parse.Attribute("start").Value, RegexOptions.IgnoreCase);
                    totalRegexs++;

                    for (int i = 0; i < fileData.Length; i++)
                    {
                        if (reg.IsMatch(fileData[i]))
                        {
                            Console.WriteLine(fileData[i]);
                        }
                    }
                }
            }

            Console.WriteLine($"\n\nRan {totalRegexs} regex searches");
        }
    }
}
