const { Transform } = require("stream");

class Decryptor extends Transform {
    constructor() {
        super({
            objectMode: true,
        });
    }

    _transform(chunk, encoding, done) {
        this.push(this._decrypt(chunk));
        done();
    }

    _decrypt(chunk) {
        const { algorithm } = chunk.meta;
        const { payload } = chunk;
        const allowedAlgorithms = ["hex", "base64"];

        if (!allowedAlgorithms.some(i => i === algorithm)) {
            throw new Error("Wrong algorithm. It should be 'hex' or 'base64'");
        }

        payload.email = Buffer.from(payload.email, algorithm).toString("utf-8");
        payload.password = Buffer.from(payload.password, algorithm).toString("utf-8");

        return payload;
    }
}

module.exports = Decryptor;
