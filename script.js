const addTodoForm = document.querySelector('.add-item')
const todoList = document.querySelector('.todo-list')

const todos = []


// ## add new todo
addTodoForm.addEventListener('submit',  e => {
  e.preventDefault()
  const todoText = addTodoForm['add-text'].value.trim()

  if (todoText.length === 0) {
    alert('enter some text')
    return
  }

  const newTodo = {id: `${Date.now()}`, text: todoText, isDone: false}
  const todoHtml = `
    <li class="bg-gray-200 px-2 rounded-lg flex items-center" data-id=${newTodo.id}>
      <input type="checkbox" name="done" class="mx-2 hover:cursor-pointer" ${newTodo.isDone && 'checked'}>
      <input type="text" name="text" class="flex-1 bg-transparent px-2 py-2" value=${newTodo.text}>
      <button class="edit-btn bg-green-30 px-3 py-2 hover:opacity-75"><i class="bi bi-pencil-square pointer-events-none"></i></button>
      <button class="delete-btn text-red-600 px-3 py-2 hover:opacity-75"><i class="bi bi-trash-fill pointer-events-none"></i></button>
    </li>
  `
  todoList.insertAdjacentHTML('beforeend', todoHtml)
  todos.push(newTodo)
})

// ## clicked inside todo
todoList.addEventListener('click', e => {
  // ### delete todo
  if (e.target.classList.contains('delete-btn')) {
    const todoEl = e.target.parentElement
    todos.splice(todos.findIndex(todo => todo.id === todoEl.dataset.id), 1)
    todoEl.remove()
  }

  // ### update todo: check/uncheck
  if (e.target.type === 'checkbox') {
    // Note: checkbox ui aumatically get updated
    const todoId = e.target.parentElement.dataset.id
    todos.find(todo => todo.id === todoId).isDone = e.target.checked
  }

  // ## update todo: text
  if (e.target.classList.contains('edit-btn')) {
    const newText = e.target.previousElementSibling.value
    const todoId = e.target.parentElement.dataset.id
    todos.find(todo => todo.id === todoId).text = newText
  }

})