class Calculator {
  constructor() {
    this.display = document.querySelector(".display");
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
    this.initialize();
  }

  initialize() {
    document.querySelectorAll(".button").forEach((button) => {
      button.addEventListener("click", () => this.handleButton(button));
    });

    document.addEventListener("keydown", (e) => this.handleKeyboard(e));
    this.updateDisplay();
  }

  handleButton(button) {
    const value = button.textContent;

    if (button.classList.contains("number")) {
      this.appendNumber(value);
    } else if (button.classList.contains("operator")) {
      this.chooseOperation(value);
    } else if (button.classList.contains("equal")) {
      this.compute();
    } else if (button.classList.contains("special")) {
      this.handleSpecial(value);
    }
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number;
    } else {
      this.currentOperand += number;
    }
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "%":
        computation = (prev * current) / 100;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = "";
    this.updateDisplay();
  }

  handleSpecial(value) {
    switch (value) {
      case "AC":
        this.clear();
        break;
      case "←":
        this.delete();
        break;
      case "%":
        this.percentage();
        break;
    }
    this.updateDisplay();
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
    if (this.currentOperand === "") this.currentOperand = "0";
  }

  percentage() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    this.currentOperand = (current / 100).toString();
  }

  updateDisplay() {
    this.display.textContent = this.getDisplayNumber(this.currentOperand);
  }

  getDisplayNumber(number) {
    const [integerPart, decimalPart] = number.toString().split(".");
    let formattedInteger = isNaN(integerPart)
      ? ""
      : parseFloat(integerPart).toLocaleString("en");

    return decimalPart
      ? `${formattedInteger}.${decimalPart.slice(0, 5)}`
      : formattedInteger;
  }

  handleKeyboard(e) {
    const key = e.key;
    const keyMap = {
      "+": "+",
      "-": "-",
      "*": "×",
      "/": "÷",
      Enter: "=",
      Backspace: "←",
      Escape: "AC",
    };

    if (/\d|\./.test(key)) this.appendNumber(key);
    else if (key in keyMap) {
      e.preventDefault();
      const value = keyMap[key];
      document.querySelector(`.button:contains("${value}")`)?.click();
    }
  }
}

// Initialize calculator when page loads
window.addEventListener("DOMContentLoaded", () => new Calculator());
