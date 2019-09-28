const { Transform } = require("stream");
const DB = require("./DB");

class Logger extends Transform {
    constructor() {
        super({
            objectMode: true,
        });
        this.db = new DB();
    }

    _transform(chunk, encoding, done) {
        this.db.emit("save", {
            source: chunk.meta.source,
            payload: chunk.payload,
            created: new Date(),
        });
        this.push(chunk);
        done();
    }
}

module.exports = Logger;
