const input = document.querySelector(".input");
const card = document.querySelector(".card");
const editBtn = document.querySelector(".edit-btn");
const deleteBtn = document.querySelector(".delete-btn");
let isEdit = false;

const displayItems = () => {
  if (localStorage.getItem("groceryItems")) {
    let arr = JSON.parse(localStorage.getItem("groceryItems"));

    arr.forEach((e) => {
      let item = createItem(e.value);
      item.dataset.id = e.id;
    });
  }
};

window.addEventListener("DOMContentLoaded", displayItems);

const createItem = (input) => {
  let newItem = document.createElement("div");
  newItem.classList.add("grocery-item");
  newItem.innerHTML = `
      <div class="output" >${input}</div>  
      <div class="action-buttons"> 
      <i class="edit-btn far fa-edit"></i>    
      <i class="far fa-trash-alt delete-btn"></i> 
      </div>
      `;

  newItem.addEventListener("click", editItem);
  newItem.addEventListener("click", deleteItem);

  card.appendChild(newItem);
  return newItem;
};

const addItem = (event) => {
  event.preventDefault();
  if (event.keyCode === 13 && input.value.trim() !== "" && !isEdit) {
    let item = createItem(input.value);
    item.dataset.id = Date.now();
    addToLocalStorage(item.dataset.id, input.value);
  } else if (event.keyCode === 13 && input.value.trim() !== "" && isEdit) {
    let arr = document.querySelectorAll(".grocery-item");
    for (const item of arr) {
      if (input.dataset.id === item.dataset.id) {
        item.firstElementChild.textContent = input.value;
        isEdit = false;
        editLocalStorage(input.dataset.id, input.value);
        input.value = "";
        input.dataset.id = undefined;
      }
    }
  }
};

const addToLocalStorage = (id, value) => {
  if (localStorage.getItem("groceryItems")) {
    let arr = JSON.parse(localStorage.getItem("groceryItems"));
    arr.push({ id, value });
    localStorage.setItem("groceryItems", JSON.stringify(arr));
  } else {
    let arr = [];
    arr[0] = { id, value };
    localStorage.setItem("groceryItems", JSON.stringify(arr));
  }
  input.value = "";
};

const editItem = (e) => {
  isEdit = true;
  if (e.target.classList.contains("edit-btn")) {
    let arr = JSON.parse(localStorage.getItem("groceryItems"));
    for (const item of arr) {
      if (item.id === e.target.parentElement.parentElement.dataset.id) {
        input.value = item.value;
        input.dataset.id = item.id;
      }
    }
  }
};
const editLocalStorage = (id, value) => {
  let arr = JSON.parse(localStorage.getItem("groceryItems"));
  for (const item of arr) {
    if (item.id === id) {
      item.value = value;
      localStorage.setItem("groceryItems", JSON.stringify(arr));
    }
  }
};

const deleteItem = (e) => {
  if (e.target.classList.contains("delete-btn")) {
    let currentItem = e.target.parentElement.parentElement;
    deleteFromLocalStorage(currentItem.dataset.id);
    currentItem.remove();
  }
};
const deleteFromLocalStorage = (id) => {
  let arr = JSON.parse(localStorage.getItem("groceryItems"));
  let newArr = arr.filter((item) => {
    return item.id !== id;
  });

  localStorage.setItem("groceryItems", JSON.stringify(newArr));
};

input.addEventListener("keyup", addItem);
