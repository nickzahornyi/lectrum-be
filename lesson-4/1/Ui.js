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
            this._validate(chunk);
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

    _validate(chunk) {
        const requiredFields = ["name", "email", "password"];

        if (typeof chunk !== "object") {
            throw new Error("Data must be an object");
        }

        requiredFields.forEach(field => {
            if (!chunk.hasOwnProperty(field)) {
                throw new Error(`Field ${field} is required`);
            }
        });

        for (const key in chunk) {
            if (!requiredFields.some(field => field === key)) {
                throw new Error(`Only ${requiredFields.toString()} are allowed`);
            }

            if (typeof chunk[key] !== "string") {
                throw new Error(`Field ${key} must be a string`);
            }
        }
    }
}

module.exports = Ui;
