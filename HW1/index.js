const queue = document.getElementById('queue');
const form = document.forms['queueForm'];
const removeBtn = document.getElementById("remove-item");
let arrayOfItems = [];

const inputValidation = (inputText) => {
  if (inputText === "") {
    alert("Text must be filled out");
    return false;
  }
  return true
}

const validationQueueLength = () => {
  return document.querySelectorAll("#queue div").length >= 30;
}

const setItem = (data) => {
  try {
    return localStorage.setItem("items", JSON.stringify(data))
  } catch (e) {
    console.log(e);
  }
}

const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.log(e);
  }
}

const appendItem = (value) => {
  const div = document.createElement('div');
  div.className = 'queue-item';
  div.append(value);
  queue.append(div);
}

const submitForm = (event) => {
  event.preventDefault();
  const value = form.elements['someText'].value;
  let valid = inputValidation(value);
  if (valid) {
    const moreThan30 = validationQueueLength();
    if (moreThan30) {
      return alert("Length must be less than 30");
    }
    arrayOfItems.push(value);
    setItem(arrayOfItems);
    appendItem(value);
    form.reset();
  }
}

form.addEventListener('submit', submitForm);

const remove = () => {
  const queueItems = document.querySelectorAll("#queue div");
  if (queueItems.length) {
    queueItems[0].remove();
    arrayOfItems.shift();
    setItem(arrayOfItems);
  }
}
removeBtn.addEventListener('click', remove);

const initItems = () => {
  arrayOfItems = getItem("items");
  if (arrayOfItems && arrayOfItems.length) {
    arrayOfItems.forEach((el) => appendItem(el))
  }
}
initItems();

