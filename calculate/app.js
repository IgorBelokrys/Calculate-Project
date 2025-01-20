"use strict";

const interfaceFirst = document.querySelector(".interface-first");
const interfaceSecond = document.querySelector(".interface-second");

const buttons = document.querySelectorAll(".buttons button");

let currentValue = "";
let previousValue = "";
let operator = "";

function updateDisplay() {
  interfaceFirst.textContent = currentValue || "0";
}

function crunchingNumber(number) {
  if (currentValue === "0" || currentValue === "") {
    currentValue = number;
  } else {
    currentValue += number;
  }
  updateDisplay();
}

buttons.forEach((elem) => {
  elem.addEventListener("click", function (event) {
    const clickButton = event.target;
    interfaceFirst.textContent = clickButton.textContent;
  });
});
