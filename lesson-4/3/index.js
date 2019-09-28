const Ui = require("./Ui");
const Guardian = require("./Guardian");
const AccountManager = require("./AccountManager");
const Logger = require("./Logger");

const customers = [
    {
        name: "Pitter Black",
        email: "pblack@email.com",
        password: "pblack_123",
    },
    {
        name: "Oliver White",
        email: "owhite@email.com",
        password: "owhite_456",
    },
];

const ui = new Ui(customers);
const guardian = new Guardian();
const manager = new AccountManager();
const logger = new Logger();

ui.pipe(guardian).pipe(logger).pipe(manager);
