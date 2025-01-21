"use strict";

const interfaceFirst = document.querySelector(".interface-first");
// const interfaceSecond = document.querySelector(".interface-second");

const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let previousNumber = "";
let operation = "";

buttons.forEach((elem) => {
  elem.addEventListener("click", function (event) {
    const clickButton = event.target.closest("button");
    console.log(`Клик по кнопке:`, clickButton);
    if (clickButton.classList.contains("reset")) {
      interfaceFirst.textContent = "";
      return;
    }
    if (clickButton.classList.contains("delete")) {
      if (interfaceFirst.textContent.length > 0) {
        interfaceFirst.textContent = interfaceFirst.textContent.slice(0, -1);
      }
      return;
    }
    const buttonText = clickButton.textContent.trim();
    interfaceFirst.textContent += buttonText;

    if (
      clickButton.classList.contains("division") ||
      clickButton.classList.contains("multiplication") ||
      clickButton.classList.contains("subtract") ||
      clickButton.classList.contains("add")
    ) {
      previousNumber = interfaceFirst.textContent;
      operation = clickButton.textContent.trim();
      interfaceFirst.textContent = "";
      console.log(previousNumber, operation);
      return;
    }

    if (clickButton.classList.contains("equals")) {
      console.log("Нажата кнопка =", previousNumber, operation, currentNumber);
      currentNumber = interfaceFirst.textContent;
      let result;
      switch (operation) {
        case "/":
          result = Number(previousNumber) / Number(currentNumber);
          break;
        case "*":
          result = Number(previousNumber) * Number(currentNumber);
          break;
        case "-":
          result = Number(previousNumber) - Number(currentNumber);
          break;
        case "+":
          result = Number(previousNumber) + Number(currentNumber);
          break;
        default:
          result = currentNumber;
      }
      console.log("Результат:", result);
      interfaceFirst.textContent = result;
      previousNumber = "";
      operation = "";
    }
  });
});
