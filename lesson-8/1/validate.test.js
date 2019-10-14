const { validate } = require("./index");

describe("Check validate function:", () => {
    describe("Check payload object:", () => {
        test("Throw error if payload is not an object", () => {
            expect(() => validate({ data: { payload: "object" }, name: "someName" })).toThrowError(
                "someName: payload should be an object",
            );
        });

        describe("Check payload name field:", () => {
            test("Throw error if payload.name doesnt exist", () => {
                expect(() =>
                    validate({ data: { payload: { email: "email", password: "password" } }, name: "someName" }),
                ).toThrowError("someName: payload should have required field name");
            });
            test("throw error if payload.name empty string", () => {
                expect(() =>
                    validate({
                        data: { payload: { name: "", email: "email", password: "password" } },
                        name: "someName",
                    }),
                ).toThrowError("someName: payload.name should not be empty");
            });
            test("throw error if type of payload.name not string", () => {
                expect(() =>
                    validate({
                        data: { payload: { name: true, email: "email", password: "password" } },
                        name: "someName",
                    }),
                ).toThrowError("someName: payload.name should should be a string");
            });
        });

        describe("Check payload email field:", () => {
            test("Throw error if payload.email doesnt exist", () => {
                expect(() =>
                    validate({ data: { payload: { name: "name", password: "password" } }, name: "someName" }),
                ).toThrowError("someName: payload should have required field email");
            });
            test("throw error if payload.email empty string", () => {
                expect(() =>
                    validate({
                        data: { payload: { name: "name", email: "", password: "password" } },
                        name: "someName",
                    }),
                ).toThrowError("someName: payload.email should not be empty");
            });
            test("throw error if type of payload.email not string", () => {
                expect(() =>
                    validate({
                        data: { payload: { name: "name", email: 222, password: "password" } },
                        name: "someName",
                    }),
                ).toThrowError("someName: payload.email should should be a string");
            });
        });

        describe("Check payload password field:", () => {
            test("Throw error if payload.password doesnt exist", () => {
                expect(() =>
                    validate({ data: { payload: { name: "name", email: "email" } }, name: "someName" }),
                ).toThrowError("someName: payload should have required field password");
            });
            test("throw error if payload.password empty string", () => {
                expect(() =>
                    validate({ data: { payload: { name: "name", email: "email", password: "" } }, name: "someName" }),
                ).toThrowError("someName: payload.password should not be empty");
            });
            test("throw error if type of payload.password not string", () => {
                expect(() =>
                    validate({ data: { payload: { name: "name", email: "email", password: 222 } }, name: "someName" }),
                ).toThrowError("someName: payload.password should should be a string");
            });
        });
    });
});
