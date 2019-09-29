const { Writable } = require("stream");

class AccountManager extends Writable {
    constructor() {
        super({
            objectMode: true,
        });

        this.data = [];
    }

    _write(chunk, encoding, done) {
        console.log(chunk);
        this.data.push(chunk);
        done();
    }
}

module.exports = AccountManager;
