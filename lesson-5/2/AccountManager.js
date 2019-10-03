const { Writable } = require("stream");
const { promisify } = require("util");
const crypto = require("crypto");
const { algorithm, password, publicKey } = require("./config");

class AccountManager extends Writable {
    constructor() {
        super({
            objectMode: true,
        });

        this.data = [];
        this.scrypt = promisify(crypto.scrypt);
    }

    _write(chunk, encoding, done) {
        if (this._verify(chunk)) {
            this._convert(chunk).then(data => {
                console.log(data);
                this.data.push(data);
                done();
            });
        }
    }

    async _convert(chunk) {
        chunk.payload.email = await this._decrypt(chunk.payload.email);
        chunk.payload.password = await this._decrypt(chunk.payload.password);

        return chunk;
    }

    async _decrypt(value) {
        try {
            const key = await this.scrypt(password, "salt", 24);
            const iv = Buffer.alloc(16, 0);
            const decipher = crypto.createDecipheriv(algorithm, key, iv);

            let decrypted = decipher.update(value, "hex", "utf8");
            decrypted += decipher.final("utf8");

            return decrypted;
        } catch (error) {
            throw error;
        }
    }

    _verify(chunk) {
        const { signature } = chunk.meta;
        const { email, password } = chunk.payload;
        const verify = crypto.createVerify("SHA256");

        verify.update(email);
        verify.update(password);
        verify.end();

        return verify.verify(publicKey, signature, "hex");
    }
}

module.exports = AccountManager;
