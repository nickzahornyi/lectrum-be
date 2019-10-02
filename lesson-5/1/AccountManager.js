const { Writable } = require("stream");
const { promisify } = require("util");
const crypto = require("crypto");

class AccountManager extends Writable {
    constructor() {
        super({
            objectMode: true,
        });

        this.data = [];
        this.scrypt = promisify(crypto.scrypt);
        this.algorithm = "aes192";
        this.password = "1qaZxsw2@3edcVfr4";
    }

    _write(chunk, encoding, done) {
        this._convert(chunk).then(data => {
            console.log(data);
            this.data.push(data);
            done();
        });
    }

    async _convert(chunk) {
        chunk.payload.email = await this._decrypt(chunk.payload.email);
        chunk.payload.password = await this._decrypt(chunk.payload.password);

        return chunk;
    }

    async _decrypt(value) {
        try {
            const key = await this.scrypt(this.password, "salt", 24);
            const iv = Buffer.alloc(16, 0);
            const decipher = crypto.createDecipheriv(this.algorithm, key, iv);

            let decrypted = decipher.update(value, "hex", "utf8");
            decrypted += decipher.final("utf8");

            return decrypted;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AccountManager;
