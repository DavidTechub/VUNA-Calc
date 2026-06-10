/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Load calculator engine
const calcPath = path.join(__dirname, '..', 'src', 'calculator.js');
const calcCode = fs.readFileSync(calcPath, 'utf8');

// Mock DOM
document.body.innerHTML = '<input type="text" id="screen" readonly placeholder="0">';

// Execute calculator in this context
eval(calcCode);

// Load DOM controller (needs calculator globals)
const scriptPath = path.join(__dirname, '..', 'assets', 'js', 'script.js');
const scriptCode = fs.readFileSync(scriptPath, 'utf8');
eval(scriptCode);

describe('VUNA-Calc1 Engine', () => {
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

describe('VUNA-Calc1 DOM', () => {
    beforeEach(() => {
        clearAll();
    });

    test('appendNumber displays digits', () => {
        appendNumber('5');
        appendNumber('3');
        expect(document.getElementById('screen').value).toBe('53');
    });

    test('prevents multiple decimals', () => {
        appendNumber('1');
        appendNumber('.');
        appendNumber('5');
        appendNumber('.');
        expect(document.getElementById('screen').value).toBe('1.5');
    });

    test('clearAll resets everything', () => {
        appendNumber('5');
        appendOperator('+');
        appendNumber('3');
        clearAll();
        expect(document.getElementById('screen').value).toBe('0');
    });

    test('full calculation via DOM', () => {
        appendNumber('7');
        appendOperator('+');
        appendNumber('3');
        calculate();
        expect(document.getElementById('screen').value).toBe('10');
    });

    test('percentage button works', () => {
        appendNumber('50');
        applyPercentage();
        expect(document.getElementById('screen').value).toBe('0.5');
    });

    test('square button works', () => {
        appendNumber('5');
        applySquare();
        expect(document.getElementById('screen').value).toBe('25');
    });
});
