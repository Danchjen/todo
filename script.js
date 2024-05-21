'use strict';

document.addEventListener('DOMContentLoaded', function() {
  loadTodos();
  
  var inputField = document.getElementById("myInput");
  inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      newElement();
    }
  });
});

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  for (const todo of todos) {
    const li = createTodoElement(todo.text, todo.completed);
    document.getElementById("myUL").appendChild(li);
  }
}

function createTodoElement(text, completed = false) {
  var li = document.createElement("li");
  var t = document.createTextNode(text);
  li.appendChild(t);

  li.classList.add('checking');

  if (completed) {
    li.classList.add('checked');
  }

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  span.onclick = function() {
    this.parentElement.remove();
    updateLocalStorage();
  };

  li.addEventListener('click', function() {
    if (this.classList.contains('checked')) {
      this.classList.remove('checked');
      this.classList.add('checking');
    } else {
      this.classList.remove('checking');
      this.classList.add('checked');
    }
    updateLocalStorage();
  });

  return li;
}

function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("You must write something!");
    return;
  }
  var li = createTodoElement(inputValue);
  document.getElementById("myUL").appendChild(li);
  document.getElementById("myInput").value = "";
  
  updateLocalStorage();
}

function updateLocalStorage() {
  var todos = [];
  var listItems = document.querySelectorAll("#myUL li");
  listItems.forEach(function(item) {
    let text = item.innerText || item.textContent;
    todos.push({ text, completed: item.classList.contains('checked') });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
