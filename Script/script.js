class Calculator {
    constructor(resultTextElement, partialTextElement) {
        this.partialTextElement = partialTextElement
        this.resultTextElement = resultTextElement
        this.clear()
    }

    clear() {
        this.currentNumber = ''
        this.previousNumber = ''
        this.operation = undefined
    }

    delete() {
        this.currentNumber = this.currentNumber.toString().slice(0, -1)
    }

    addToDisplay(number) {
        if (number === '.' && this.currentNumber.includes('.')) return
        this.currentNumber = this.currentNumber.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentNumber === '') return
        if (this.previousNumber !== '') {
            this.operate()
        }
        this.operation = operation
        this.previousNumber = this.currentNumber
        this.currentNumber = ''
    }

    add(previous, current) {
        return (previous + current)
    }

    substract(previous, current) {
        return (previous - current);
    }

    multiply(previous, current) {
        return (previous * current);
    }

    divide(previous, current) {
        return (previous / current);
    }

    operate() {
        let operant
        const previous = parseFloat(this.previousNumber)
        const current = parseFloat(this.currentNumber)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                operant = this.add(previous, current);
                break;
            case '-':
                operant = this.substract(previous, current);
                break;
            case '*':
                operant = this.multiply(previous, current);
                break;
            case '/':
                if (current !== 0) {
                    operant = this.divide(previous, current);
                }
                else {
                    this.currentNumber = "Can not divide by 0!";
                    operant = "Can not divide by 0!";
                }
                return "This is ilegal!";
            default:
                return
        }
        this.currentNumber = operant.toFixed((2))
        this.operant = undefined
        this.previousNumber = ''
    }

    updateDisplay() {
        this.resultTextElement.innerText = this.currentNumber
        if (this.operation != null) {
            this.partialTextElement.innerText =
                `${this.previousNumber} ${this.operation}`
        } else {
            this.partialTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('.numberButton')
const operationButtons = document.querySelectorAll('.operationButton')
const equalsButton = document.querySelector('.equalsButton')
const deleteButton = document.querySelector('.deleteButton')
const clearButton = document.querySelector('.clearButton')
const resultTextElement = document.querySelector('.result')
const partialTextElement = document.querySelector('.partial')


const calculator = new Calculator(resultTextElement, partialTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addToDisplay(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.operate()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})