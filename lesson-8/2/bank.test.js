const { Bank } = require("./index");

const bank = new Bank();

describe("Testing Bank module", () => {
    test("register should return id and it should be a number", () => {
        const id = bank.register({
            name: "Nick",
            balance: 11111,
        });

        expect(typeof id).toBe("number");
    });

    test("register should throw error if user have already exist", () => {
        expect(() =>
            bank.register({
                name: "Nick",
                balance: 11111,
            }),
        ).toThrowError(`duplicated customer for name: 'Nick'`);
    });

    test("check amount", () => {
        const id = bank.register({
            name: "Mike",
            balance: 222,
        });

        expect(() => bank.emit("add", id, 0)).toThrowError("amount should be grater than 0");
    });

    test("throw error for invalid user id", () => {
        expect(() => bank.emit("add", 123, 100)).toThrowError("customer with id '123' not found");
    });

    test("emit error should throw error", () => {
        expect(() => bank.emit("error", { message: "some Error" })).toThrowError("some Error");
    });
});
