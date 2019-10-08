const path = require("path");
const Json2csv = require("./json2csv");

const fields = ["postId", "name", "body"];
const options = { fields };

const parser = new Json2csv(options);
const filePath = path.join(__dirname, "data", "comments.json");

parser.convert(filePath);
