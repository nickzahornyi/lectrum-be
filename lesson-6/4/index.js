const path = require("path");
const Archiver = require("./Archiver");

const archiver = new Archiver(path.join(__dirname, "test.csv"), { algorithm: "gzip" });

archiver.archive();
