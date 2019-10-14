const { validateFields } = require("./index");

describe("Check validateFields function:", () => {
    test("throw error if data contain not allowed field", () => {
        expect(() =>
            validateFields({
                data: {
                    field: "field",
                },
                name: "someName",
                instance: "instance",
            }),
        ).toThrowError("someName: data contains not allowed field — field");
    });
    test("throw error if payload contain not allowed field", () => {
        expect(() =>
            validateFields({
                data: {
                    payload: {
                        test: "test",
                    },
                },
                name: "someName",
                instance: "instance",
            }),
        ).toThrowError("someName: data contains not allowed field — test");
    });
    test("throw error if payload inner field contains not allowed field", () => {
        expect(() =>
            validateFields({
                data: {
                    test: {
                        test: "test",
                    },
                },
                name: "someName",
                instance: "instance",
            }),
        ).toThrowError("someName: data contains not allowed field — test");
    });
});
