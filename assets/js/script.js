/* eslint-disable no-unused-vars */
'use strict';

/**
 * VUNA-Calc DOM Controller
 * Wires buttons to the calculator engine
 */

let currentInput = '';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

const screen = document.getElementById('screen');

function updateDisplay() {
    screen.value = currentInput || '0';
}

function appendNumber(num) {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }
    if (num === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && num !== '.') currentInput = '';
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && previousInput === '') return;
    if (currentInput === '' && previousInput !== '') {
        operator = op;
        return;
    }
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    shouldResetScreen = true;
}

function calculate() {
    if (!operator || previousInput === '' || currentInput === '') return;

    try {
        const expr = previousInput + ' ' + operator + ' ' + currentInput;
        const result = evaluateExpression(expr);
        currentInput = result.toString();
        operator = null;
        previousInput = '';
        shouldResetScreen = true;
        updateDisplay();
        } catch {
        currentInput = 'Error';
        operator = null;
        previousInput = '';
        shouldResetScreen = true;
        updateDisplay();
    }
}

function clearEntry() {
    currentInput = '';
    updateDisplay();
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    shouldResetScreen = false;
    updateDisplay();
}

function applyPercentage() {
    if (currentInput === '') return;
    try {
        const result = calculatePercentage(currentInput);
        currentInput = result.toString();
        shouldResetScreen = true;
        updateDisplay();
        } catch {
        currentInput = 'Error';
        updateDisplay();
    }
}

function applySquare() {
    if (currentInput === '') return;
    try {
        const result = calculateSquare(currentInput);
        currentInput = result.toString();
        shouldResetScreen = true;
        updateDisplay();
        } catch {
        currentInput = 'Error';
        updateDisplay();
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    }
    if (e.key === 'Escape') clearAll();
    if (e.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
    if (e.key === '%') applyPercentage();
});
