// Append a remove button that hides its parent on click
function createRemoveButton(parent) {
  var remove = document.createElement('img');
  remove.src = 'assets/btn-tododel@2x.png';

  // when a remove button is clicked, hide the list item
  remove.addEventListener('click', function() {
    parent.style.display = 'none';
  });

  parent.appendChild(remove);
}

window.addEventListener('letsee.load', function initTodo() {
  // select the todo list element
  var todoList = document.getElementById('todoList');
  // select todo list item elements
  var todoListItems = todoList.children;

  // create a remove button for each list item
  for (var i = 0; i < todoListItems.length; i += 1) {
    createRemoveButton(todoListItems[i]);
  }

  // create a todo list item
  document.getElementById('add-todo').addEventListener('click', function() {
    // select the input element
    var input = document.getElementById('input');

    // if the input is empty
    if (input.value === '') {
      // tell the user to fill something out
      alert('Enter a task.');
    } else {
      // if the input is not empty, create a new item with the input value
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(input.value));

      // add the new item to the list
      todoList.appendChild(li);

      // reset the input
      input.value = '';

      // add remove button
      createRemoveButton(li);
    }
  });
});
