const { Transform } = require("stream");

class Guardian extends Transform {
    constructor() {
        super({
            objectMode: true,
        });
    }

    _transform(chunk, encoding, done) {
        this.push(this._encrypt(chunk));
        done();
    }

    _encrypt(chunk) {
        chunk.email = Buffer.from(chunk.email).toString("hex");
        chunk.password = Buffer.from(chunk.password).toString("hex");

        return {
            meta: {
                source: "ui",
            },
            payload: chunk,
        };
    }
}

module.exports = Guardian;
