const button = document.querySelector('.button');
const leftInput = document.querySelector('.left-input');
const rightInput = document.querySelector('.right-input');
const operCalc = document.querySelector('.select');
const res = document.querySelector('.res');
const parent = document.body.querySelector('.calculate');
parent.insertAdjacentHTML('afterend', '<div class="newDiv"></div>');

function addElement() {
  const newElem = document.createElement('div');
  const newDiv = document.querySelector('.newDiv');
  newElem.textContent = res.innerText;
  newElem.style.cursor = 'pointer';

  newElem.addEventListener('click', () => {
    newDiv.removeChild(newElem);
  });

  return newDiv.appendChild(newElem);
}

function calc() {
  const leftValue = Number(leftInput.value);
  const rightValue = Number(rightInput.value);
  let result;

  switch (operCalc.value) {
    case 'plus':
      result = leftValue + rightValue;
      break;
    case 'subtraction':
      result = leftValue - rightValue;
      break;
    case 'multiplication':
      result = leftValue * rightValue;
      break;
    case 'division':
      if (rightValue == 0) {
        result = 'Error';
      } else {
        result = leftValue / rightValue;
      }
      break;
    default:
      result = 'Error';
  }

  res.innerText = result;
  addElement();
  return result;
}

button.addEventListener('click', calc);
document.addEventListener('keydown', (e) => {
  if (e.code == 'Enter') {
    calc();
  }
});
