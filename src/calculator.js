'use strict';

/**
 * VUNA-Calc Math Engine
 * Pure functions - no DOM, no eval()
 * Handles: +, -, *, /, decimals, and custom features
 */

function tokenize(expr) {
    const tokens = [];
    let current = '';
    for (let i = 0; i < expr.length; i++) {
        const char = expr[i];
        if ('0123456789.'.includes(char)) {
            current += char;
        } else if ('+-*/'.includes(char)) {
            if (current) tokens.push(current);
            tokens.push(char);
            current = '';
        } else if (char === ' ') {
            if (current) tokens.push(current);
            current = '';
        } else {
            throw new Error('Invalid character: ' + char);
        }
    }
    if (current) tokens.push(current);
    return tokens;
}

function toRPN(tokens) {
    const output = [];
    const ops = [];
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };

    for (const token of tokens) {
        if (!isNaN(parseFloat(token))) {
            output.push(parseFloat(token));
        } else if ('+-*/'.includes(token)) {
            while (ops.length > 0 && precedence[ops[ops.length - 1]] >= precedence[token]) {
                output.push(ops.pop());
            }
            ops.push(token);
        }
    }
    while (ops.length > 0) output.push(ops.pop());
    return output;
}

function evaluateRPN(rpn) {
    const stack = [];
    for (const token of rpn) {
        if (typeof token === 'number') {
            stack.push(token);
        } else {
            const b = stack.pop();
            const a = stack.pop();
            if (a === undefined || b === undefined) throw new Error('Invalid expression');
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/':
                    if (b === 0) throw new Error('Division by zero');
                    stack.push(a / b);
                    break;
            }
        }
    }
    if (stack.length !== 1) throw new Error('Invalid expression');
    return stack[0];
}

function evaluateExpression(expr) {
    if (!expr || expr.trim() === '') return 0;
    const tokens = tokenize(expr);
    const rpn = toRPN(tokens);
    const result = evaluateRPN(rpn);
    // Round to avoid floating point issues
    return Math.round(result * 100000000) / 100000000;
}

// Custom Feature 1: Percentage (divide by 100)
function calculatePercentage(value) {
    const num = parseFloat(value);
    if (isNaN(num)) throw new Error('Invalid number');
    return num / 100;
}

// Custom Feature 2: Square (x²)
function calculateSquare(value) {
    const num = parseFloat(value);
    if (isNaN(num)) throw new Error('Invalid number');
    return num * num;
}

// Export for tests (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        evaluateExpression,
        calculatePercentage,
        calculateSquare,
        tokenize,
        toRPN,
        evaluateRPN
    };
}

// Export for browser (global variables)
if (typeof window !== 'undefined') {
    window.evaluateExpression = evaluateExpression;
    window.calculatePercentage = calculatePercentage;
    window.calculateSquare = calculateSquare;
}
