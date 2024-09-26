function appendToDisplay(value) {
    document.querySelector('#display').value += value;
}

function calculate() {
    try {
        let result = eval(document.querySelector('#display').value);
        document.querySelector('#display').value = result;
    } catch (error) {
        document.querySelector('#display').value = 'Error';
    }
}

function clearDisplay() {
    document.querySelector('#display').value = '';
}

function deleteLast() {
    document.querySelector('#display').value = document.querySelector('#display').value.toString().slice(0, -1);
}

function calculateCos(){
    let result = Math.cos(document.querySelector('#display').value);
    document.querySelector('#display').value = result;
}
function calculateSin(){
    let result = Math.sin(document.querySelector('#display').value);
    document.querySelector('#display').value = result;
}
function calculateTan(){
    let result = Math.tan(document.querySelector('#display').value);
    document.querySelector('#display').value = result;
}
function calculateSqrt(){
    let result = Math.sqrt(document.querySelector('#display').value);
    document.querySelector('#display').value = result;
}