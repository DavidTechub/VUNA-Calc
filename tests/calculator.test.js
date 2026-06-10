/**
 * @jest-environment jsdom
 */

// Mock DOM before loading scripts
document.body.innerHTML = '<input type="text" id="screen" readonly placeholder="0">';

// Load calculator engine using require (proper Node.js import)
const { evaluateExpression, calculatePercentage, calculateSquare } = require('../src/calculator');

describe('VUNA-Calc Engine', () => {
    describe('evaluateExpression', () => {
        test('adds two numbers', () => {
            expect(evaluateExpression('2 + 3')).toBe(5);
        });

        test('subtracts two numbers', () => {
            expect(evaluateExpression('10 - 4')).toBe(6);
        });

        test('multiplies two numbers', () => {
            expect(evaluateExpression('6 * 7')).toBe(42);
        });

        test('divides two numbers', () => {
            expect(evaluateExpression('20 / 4')).toBe(5);
        });

        test('respects operator precedence', () => {
            expect(evaluateExpression('2 + 3 * 4')).toBe(14);
        });

        test('handles decimals', () => {
            expect(evaluateExpression('0.1 + 0.2')).toBe(0.3);
        });

        test('throws on division by zero', () => {
            expect(() => evaluateExpression('5 / 0')).toThrow('Division by zero');
        });

        test('throws on invalid characters', () => {
            expect(() => evaluateExpression('2 & 3')).toThrow();
        });

        test('handles empty string', () => {
            expect(evaluateExpression('')).toBe(0);
        });
    });

    describe('calculatePercentage (Custom Feature 1)', () => {
        test('converts 50 to 0.5', () => {
            expect(calculatePercentage('50')).toBe(0.5);
        });

        test('converts 25 to 0.25', () => {
            expect(calculatePercentage('25')).toBe(0.25);
        });

        test('converts 0 to 0', () => {
            expect(calculatePercentage('0')).toBe(0);
        });

        test('throws on invalid input', () => {
            expect(() => calculatePercentage('abc')).toThrow('Invalid number');
        });
    });

    describe('calculateSquare (Custom Feature 2)', () => {
        test('squares 5 to 25', () => {
            expect(calculateSquare('5')).toBe(25);
        });

        test('squares 0.5 to 0.25', () => {
            expect(calculateSquare('0.5')).toBe(0.25);
        });

        test('squares 0 to 0', () => {
            expect(calculateSquare('0')).toBe(0);
        });

        test('throws on invalid input', () => {
            expect(() => calculateSquare('abc')).toThrow('Invalid number');
        });
    });
});