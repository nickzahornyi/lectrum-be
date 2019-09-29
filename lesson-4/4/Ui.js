const { Readable } = require("stream");

class Ui extends Readable {
    constructor(data) {
        super({
            objectMode: true,
        });

        this.data = data;
        this.init();
    }

    init() {
        this.on("data", chunk => {
            this._validatePayload(chunk.payload);
            this._validateMeta(chunk.meta);
        });
    }

    _read() {
        let data = this.data.shift();

        if (!data) {
            this.push(null);
        } else {
            this.push(data);
        }
    }

    _validatePayload(payload) {
        const requiredFields = ["name", "email", "password"];

        if (typeof payload !== "object") {
            throw new Error("Data must be an object");
        }

        requiredFields.forEach(field => {
            if (!payload.hasOwnProperty(field)) {
                throw new Error(`Field ${field} is required`);
            }
        });

        for (const key in payload) {
            if (!requiredFields.some(field => field === key)) {
                throw new Error(`Only ${requiredFields.toString()} are allowed`);
            }

            if (typeof payload[key] !== "string") {
                throw new Error(`Field ${key} must be a string`);
            }
        }
    }
    _validateMeta(meta) {
        const { algorithm } = meta;

        if (typeof meta !== "object") {
            throw new Error("Meta must be an object");
        }

        if (!algorithm || typeof algorithm !== "string") {
            throw new Error("Algorithm is required and must be a string");
        }
    }
}

module.exports = Ui;
