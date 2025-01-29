"use strict";

const interfaceFirst = document.querySelector(".interface-first");
const interfaceSecond = document.querySelector(".interface-second");
const interfaceWrap = document.querySelector(".interface-wrap");
const interfaceHistory = document.querySelector(".interface-history");

const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let previousNumber = "";
let operation = "";

function updateOverflow() {
  if (interfaceFirst.scrollWidth >= interfaceWrap.offsetWidth) {
    interfaceFirst.style.overflowX = "auto";
    interfaceSecond.style.width = "0";
  } else {
    interfaceFirst.style.overflowX = "visible";
  }
}

buttons.forEach((elem) => {
  elem.addEventListener("click", function (event) {
    const clickButton = event.target.closest("button");
    console.log(`Клик по кнопке:`, clickButton.textContent);
    if (clickButton.classList.contains("reset")) {
      interfaceFirst.textContent = "";
      interfaceSecond.textContent = "";
      interfaceHistory.textContent = "";
      currentNumber = "";
      previousNumber = "";
      operation = "";
      return;
    }
    if (clickButton.classList.contains("delete")) {
      if (interfaceFirst.textContent.length > 0) {
        interfaceFirst.textContent = interfaceFirst.textContent.slice(0, -1);
      }
      return;
    }
    const buttonText = clickButton.textContent;
    updateOverflow();
    interfaceFirst.textContent += buttonText;
    updateOverflow();

    if (
      clickButton.classList.contains("division") ||
      clickButton.classList.contains("multiplication") ||
      clickButton.classList.contains("subtract") ||
      clickButton.classList.contains("add") ||
      clickButton.classList.contains("procent")
    ) {
      if (previousNumber === "") {
        previousNumber = Number(
          interfaceFirst.textContent.slice(0, -1).replace(",", ".")
        );
      }

      operation = clickButton.textContent;

      interfaceSecond.textContent = `${previousNumber} ${operation}  `;

      interfaceFirst.textContent = "";

      return;
    }

    if (clickButton.classList.contains("equals")) {
      currentNumber = Number(
        interfaceFirst.textContent.slice(0, -1).replace(",", ".")
      );

      console.log("Операция:", previousNumber, operation, currentNumber);

      let result;
      switch (operation) {
        case "/":
          result = previousNumber / currentNumber;
          break;
        case "*":
          result = previousNumber * currentNumber;
          break;
        case "-":
          result = previousNumber - currentNumber;
          break;
        case "+":
          result = previousNumber + currentNumber;
          break;
        case "%":
          if (currentNumber === "") {
            currentNumber = Number(
              interfaceFirst.textContent.replace(",", ".")
            );
          }
          result = (currentNumber * previousNumber) / 100;
        default:
          result = currentNumber;
      }
      console.log("Результат:", result);
      interfaceFirst.textContent = result;

      interfaceHistory.textContent = `${previousNumber} ${operation} ${currentNumber}`;
      interfaceSecond.textContent = "";
      previousNumber = "";
      currentNumber = "";
      operation = "";
    }
  });
});
