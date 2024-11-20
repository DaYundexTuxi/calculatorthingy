let memory = 0;
let history = [];
const operators = ['+', '-', '*', '/'];

function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendToDisplay(value) {
    const display = document.getElementById('display');
    const lastChar = display.value.slice(-1);

    if (operators.includes(value) && operators.includes(lastChar)) {
        return; // Prevent adding multiple operators consecutively
    }

    display.value += value;
}

function calculateResult() {
    const display = document.getElementById('display');
    const equation = display.value.trim();

    if (equation === '' || !operators.some(op => equation.includes(op))) {
        return; // Prevent calculation if input is empty or contains only a number
    }

    try {
        const result = eval(equation);
        display.value = result;
        addToHistory(equation + ' = ' + result);
    } catch (e) {
        display.value = 'Error';
    }
}

function memoryStore() {
    memory = parseFloat(document.getElementById('display').value);
}

function memoryRecall() {
    document.getElementById('display').value = memory;
}

function memoryClear() {
    memory = 0;
}

function addToHistory(entry) {
    history.push(entry);
    displayHistory();
}

function displayHistory() {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = '';
    history.forEach((entry, index) => {
        const div = document.createElement('div');
        div.textContent = entry;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteHistoryEntry(index);
        div.appendChild(deleteButton);
        historyElement.appendChild(div);
    });
}

function deleteHistoryEntry(index) {
    history.splice(index, 1);
    displayHistory();
}

function clearHistory() {
    history = [];
    displayHistory();
}