const input = document.querySelector(".input");
const card = document.querySelector(".card");
const editBtn = document.querySelector(".edit-btn");
const deleteBtn = document.querySelector(".delete-btn");
let isEdit = false;

const displayItems = () => {
  if (localStorage.getItem("groceryItems")) {
    let arr = JSON.parse(localStorage.getItem("groceryItems"));

    arr.forEach((e) => {
      createItem(e.value);
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
    input.value = "";
  }
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

const deleteItem = () => {};

input.addEventListener("keyup", addItem);
