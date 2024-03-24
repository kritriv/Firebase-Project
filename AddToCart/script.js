import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyAyceZTV_jza6tQc3f9oyfXUZE66Inmyq4",
  authDomain: "addtocart-95568.firebaseapp.com",
  databaseURL: "https://addtocart-95568-default-rtdb.firebaseio.com",
  projectId: "addtocart-95568",
  storageBucket: "addtocart-95568.appspot.com",
  messagingSenderId: "831660209011",
  appId: "1:831660209011:web:753421d5137ea2e26f4b06"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const ShoppingListInDB = ref(database, "ShoppingList")
// const ItemListInDb = ref(database, "ItemList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const ShoppingListEl = document.getElementById("Shopping-list")

addButtonEl.addEventListener("click", function () {
  let inputvalue = inputFieldEl.value

  push(ShoppingListInDB, inputvalue)
  clearInputFieldEl()
})

onValue(ShoppingListInDB, function(snapshot) {
  let itemArray = Object.entries(snapshot.val())
  clearShoppingListEl()

  for (let i = 0; i < itemArray.length; i++){
    let currentItem = itemArray[i]
    
    let currentItemId = currentItem[0]
    let currentItemValue = currentItem[1]

    appendItemToShoppingListEl(currentItemValue)
    // console.log(itemArray[i])
  }
})

function clearShoppingListEl() {
  ShoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
  inputFieldEl.value = ""
}

function appendItemToShoppingListEl(inputvalue){
  ShoppingListEl.innerHTML += `<li>${inputvalue}</li>`
}