const fs = require("fs");
const { pipeline } = require("stream");
var zlib = require("zlib");

class Archiver {
    constructor(path) {
        this.path = path;
        this.init();
    }

    init() {
        this._validatePath();
    }

    archive() {
        const gzip = zlib.createGzip();
        const rs = fs.createReadStream(this.path);
        const ws = fs.createWriteStream(`${this.path}.gz`);

        pipeline(rs, gzip, ws, error => {
            if (error) {
                console.error("Archive failed: ", error);
            } else {
                console.log("Archive succeeded");
            }
        });
    }

    extract() {
        const unzip = zlib.createGunzip();
        const rs = fs.createReadStream(`${this.path}.gz`);
        const ws = fs.createWriteStream(this.path);

        pipeline(rs, unzip, ws, error => {
            if (error) {
                console.error("Extract failed: ", error);
            } else {
                console.log("Extract succeeded");
            }
        });
    }

    _validatePath() {
        fs.access(this.path, fs.constants.F_OK, error => {
            if (error) {
                throw new Error(`The file does not exist`);
            }
        });
    }
}

module.exports = Archiver;
