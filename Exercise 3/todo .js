function TodoItem(item, completed = false) {
  this.item = item;
  this.completed = completed;
}

TodoItem.prototype.toggleCompletion = function () {
  this.completed = !this.completed;
};

function TodoList() {
  this.items = [];
}

TodoList.prototype.addItem = function (item) {
  this.items.push(new TodoItem(item));
};

TodoList.prototype.render = function () {
  this.items.forEach((task) => {
    console.log(
      `${task.item} - ${task.completed ? "Completed" : "Incomplete"}`
    );
  });
};

var newTodo = new TodoList();

function addNewItem(item) {
  newTodo.addItem(item);
  newTodo.render();
}

// Adding initial items
addNewItem("Complete JavaScript project");
addNewItem("Buy groceries");
addNewItem("Study");

// Toggling the completion status of the first item
newTodo.items[0].toggleCompletion();

// Rendering the todo list
newTodo.render();
