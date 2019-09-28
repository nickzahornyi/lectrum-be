const EventEmitter = require("events");

class DB extends EventEmitter {
    constructor() {
        super();

        this.data = [];
        this.on("save", this._save);
    }

    _save(log) {
        this.data.push(log);
    }
}

module.exports = DB;
