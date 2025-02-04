"use strict";

const interfaceFirst = document.querySelector(".interface-first");
const interfaceSecond = document.querySelector(".interface-second");
const interfaceWrap = document.querySelector(".interface-wrap");
const interfaceHistory = document.querySelector(".interface-history");
const history = document.querySelector(".history");

const buttons = document.querySelectorAll(".calculate button");

let previousNumber = "";
let currentNumber = "";
let operation = "";

function updateOverflow() {
  if (interfaceFirst.scrollWidth >= interfaceWrap.offsetWidth) {
    interfaceFirst.style.overflowX = "auto";
    interfaceSecond.style.width = "0";
  } else {
    interfaceFirst.style.overflowX = "visible";
  }
}

function updateNumber() {
  if (
    interfaceHistory.scrollWidth >= interfaceWrap.offsetWidth ||
    interfaceFirst.scrollWidth >= interfaceWrap.offsetWidth
  ) {
    let fontSizeFirst = parseFloat(
      window.getComputedStyle(interfaceFirst).fontSize
    );
    let fontSizeHistory = parseFloat(
      window.getComputedStyle(interfaceHistory).fontSize
    );
    let res = (interfaceFirst.style.fontSize = `${fontSizeFirst * 0.7}px`);
    let res2 = (interfaceHistory.style.fontSize = `${fontSizeHistory * 0.5}px`);
    console.log(res);
    console.log(res2);
  } else {
    return;
  }
}
updateNumber();

buttons.forEach((elem) => {
  elem.addEventListener("click", function (event) {
    const clickButton = event.target.closest("button");
    console.log(clickButton.className);

    if (clickButton.classList.contains("reset")) {
      interfaceFirst.textContent = "";
      interfaceSecond.textContent = "";
      interfaceHistory.textContent = "";
      currentNumber = "";
      previousNumber = "";
      operation = "";
      const divInterface = document.querySelector(".div-interface");
      divInterface.style.fontSize = "";
      interfaceFirst.style.fontSize = "";

      return;
    }
    if (clickButton.classList.contains("delete")) {
      currentNumber = currentNumber.slice(0, -1);
      interfaceFirst.textContent =
        Number(currentNumber).toLocaleString("ru-RU");
      return;
    }
    updateOverflow();

    const buttonText = clickButton.textContent;
    const buttonClass = clickButton.className;
    if (buttonClass === "visual-history") {
      history.style.visibility = "visible";
      return;
    } else if (buttonClass === "back") {
      history.style.visibility = "hidden";
    } else if (isNaN(buttonText)) {
      if (buttonText === ",") {
        currentNumber += buttonText.replace(",", ".");
      }
      interfaceFirst.textContent += buttonText;
    } else {
      currentNumber += buttonText;
      interfaceFirst.textContent =
        Number(currentNumber).toLocaleString("ru-RU");
      updateOverflow();
      return;
    }

    if (
      clickButton.classList.contains("division") ||
      clickButton.classList.contains("multiplication") ||
      clickButton.classList.contains("subtract") ||
      clickButton.classList.contains("add") ||
      clickButton.classList.contains("procent")
    ) {
      if (previousNumber === "") {
        previousNumber = Number(currentNumber.replace(/\s/g, ""));
      }

      operation = clickButton.textContent;

      interfaceSecond.textContent = `${previousNumber.toLocaleString(
        "ru-RU"
      )} ${operation}  `;

      interfaceFirst.textContent = "";
      currentNumber = "";

      return;
    }

    if (clickButton.classList.contains("equals")) {
      currentNumber = Number(
        interfaceFirst.textContent
          .slice(0, -1)
          .replace(/\s/g, "")
          .replace(",", ".")
      );
      // console.log(typeof currentNumber);

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
          result = (currentNumber / previousNumber) * 100;
          break;
        default:
          result = currentNumber;
      }

      console.log("Результат:", result);
      interfaceFirst.textContent = result.toLocaleString("ru-RU");

      interfaceHistory.textContent = `${previousNumber.toLocaleString(
        "ru-RU"
      )} ${operation} ${currentNumber.toLocaleString("ru-RU")}`;

      updateNumber();
      const historyWrap = document.createElement("div");
      historyWrap.className = "historyWrap";
      history.appendChild(historyWrap);
      const historyOperation = document.createElement("div");
      historyOperation.className = "historyOperation";
      historyWrap.appendChild(historyOperation);
      historyOperation.textContent = interfaceHistory.textContent;
      const historyResult = document.createElement("div");
      historyResult.className = "historyResult";
      historyWrap.appendChild(historyResult);
      historyResult.textContent = interfaceFirst.textContent;

      interfaceSecond.textContent = "";
      previousNumber = "";
      currentNumber = "";
      operation = "";
    }

    updateOverflow();
  });
});
