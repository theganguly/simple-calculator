let display = document.getElementById('display');

function appendNumber(num) {
    if (display.value === '0' && num !== '.') {
        display.value = num;
    } else if (num === '.' && display.value.includes('.')) {
        return;
    } else {
        display.value += num;
    }
}

function appendOperator(op) {
    if (display.value === '') return;
    if (['+', '-', '*', '/', '.'].includes(display.value[display.value.length - 1])) {
        return;
    }
    display.value += op;
}

function clearDisplay() {
    display.value = '0';
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

function calculate() {
    try {
        let result = eval(display.value);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '0';
        }, 1000);
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        appendOperator(e.key);
    }
    if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
    }
    if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    }
});