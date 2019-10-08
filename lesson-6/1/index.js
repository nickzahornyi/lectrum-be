const path = require("path");
const Json2csv = require("./json2csv");

const parser = new Json2csv();
const filePath = path.join(__dirname, "data", "comments.json");

parser.convert(filePath);
