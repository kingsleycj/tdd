const { addNumber, minusNumber, multiplyNumber, divideNumber } = require("../utils")

describe("Calculator tests", () => {
    const a = 4, b = 8;

    describe("Addition", () => {
        test('should correctly add two numbers', () => {
            expect(addNumber(a, b)).toBe(12);
            expect(addNumber(a, b)).not.toBe(10);
        });
    });

    describe("Subtraction", () => {
        test('should correctly subtract two numbers', () => {
            expect(minusNumber(b, a)).toBe(4);
            expect(minusNumber(a, b)).toBe(-4);
        });
    });

    describe("Multiplication", () => {
        test('should correctly multiply two numbers', () => {
            expect(multiplyNumber(a, b)).toBe(32);
            expect(multiplyNumber(a, b)).not.toBe(12);
        });
    });

    describe("Division", () => {
        test('should correctly divide two numbers', () => {
            expect(divideNumber(b, a)).toBe(2);
            expect(divideNumber(a, b)).toBe(0.5);
        });

        test('should handle division by zero', () => {
            expect(divideNumber(b, 0)).toBe(Infinity);
        });
    });
});