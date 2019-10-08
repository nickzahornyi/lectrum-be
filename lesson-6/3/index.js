const path = require('path');
const Archiver = require('./Archiver');

const archiver = new Archiver(path.join(__dirname, 't.csv'));

archiver.archive();
