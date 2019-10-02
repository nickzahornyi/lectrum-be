const { Transform } = require("stream");
const { promisify } = require("util");
const crypto = require("crypto");

class Guardian extends Transform {
    constructor() {
        super({
            objectMode: true,
        });

        this.scrypt = promisify(crypto.scrypt);
        this.algorithm = "aes192";
        this.password = "1qaZxsw2@3edcVfr4";
    }

    _transform(chunk, encoding, done) {
        this._convert(chunk).then(data => {
            this.push(data);
            done();
        });
    }

    async _convert(chunk) {
        chunk.email = await this._encrypt(chunk.email);
        chunk.password = await this._encrypt(chunk.password);

        return {
            meta: {
                source: "ui",
            },
            payload: chunk,
        };
    }

    async _encrypt(value) {
        try {
            const key = await this.scrypt(this.password, "salt", 24);
            const iv = Buffer.alloc(16, 0);
            const cipher = crypto.createCipheriv(this.algorithm, key, iv);

            let encrypted = cipher.update(value, "utf8", "hex");
            encrypted += cipher.final("hex");

            return encrypted;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Guardian;
