const { Transform } = require("stream");
const { promisify } = require("util");
const crypto = require("crypto");
const { algorithm, password, privateKey } = require("./config");

class Guardian extends Transform {
    constructor() {
        super({
            objectMode: true,
        });

        this.scrypt = promisify(crypto.scrypt);
    }

    _transform(chunk, encoding, done) {
        this._convert(chunk).then(data => {
            this.push(data);
            done();
        });
    }

    async _convert(chunk) {
        const encryptedEmail = await this._encrypt(chunk.email);
        const encryptedPassword = await this._encrypt(chunk.password);

        chunk.email = encryptedEmail;
        chunk.password = encryptedPassword;

        return {
            meta: {
                source: "ui",
                signature: this._sign(encryptedEmail, encryptedPassword),
            },
            payload: chunk,
        };
    }

    async _encrypt(value) {
        try {
            const key = await this.scrypt(password, "salt", 24);
            const iv = Buffer.alloc(16, 0);
            const cipher = crypto.createCipheriv(algorithm, key, iv);

            let encrypted = cipher.update(value, "utf8", "hex");
            encrypted += cipher.final("hex");

            return encrypted;
        } catch (error) {
            throw error;
        }
    }

    _sign(email, password) {
        const sign = crypto.createSign("SHA256");

        sign.update(email);
        sign.update(password);
        sign.end();

        return sign.sign(privateKey, "hex");
    }
}

module.exports = Guardian;
