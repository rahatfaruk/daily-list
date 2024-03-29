const addTodoForm = document.querySelector('.add-item')
const todoList = document.querySelector('.todo-list')

let todos;

// local-storage
function setTodosLS() {
  localStorage.setItem('daily-list', JSON.stringify(todos))
}
function getTodosLS() {
  return JSON.parse(localStorage.getItem('daily-list'))
}

function addTodoUI(todo) {
  const todoHtml = `
    <li class="bg-gray-200 px-2 rounded-lg flex items-center" data-id=${todo.id}>
      <input type="checkbox" name="done" class="mx-2 hover:cursor-pointer" ${todo.isDone && 'checked'}>
      <input type="text" name="text" class="flex-1 bg-transparent px-2 py-2" disabled value="${todo.text}">
      <button class="edit-btn bg-green-30 px-3 py-2 hover:opacity-75"><i class="bi bi-pencil-square pointer-events-none"></i></button>
      <button class="delete-btn text-red-600 px-3 py-2 hover:opacity-75"><i class="bi bi-trash-fill pointer-events-none"></i></button>
    </li>
  `
  todoList.insertAdjacentHTML('beforeend', todoHtml)
}

// ## get prev stored todos on page load 
window.addEventListener('DOMContentLoaded', () => {
  todos = getTodosLS() ? getTodosLS() : []
  todos.forEach(todo => addTodoUI(todo))
})

// ## add new todo
addTodoForm.addEventListener('submit',  e => {
  e.preventDefault()
  const todoText = addTodoForm['add-text'].value.trim()
  addTodoForm.reset()

  if (todoText.length === 0) {
    alert('enter some text')
    return
  }

  const newTodo = {id: `${Date.now()}`, text: todoText, isDone: false}
  addTodoUI(newTodo)
  todos.push(newTodo)
  setTodosLS()
})

// ## clicked inside todo
todoList.addEventListener('click', e => {
  // ### delete todo
  if (e.target.classList.contains('delete-btn')) {
    const todoEl = e.target.parentElement
    todos.splice(todos.findIndex(todo => todo.id === todoEl.dataset.id), 1)
    todoEl.remove()
    setTodosLS()
  }

  // ### update todo: check/uncheck
  if (e.target.type === 'checkbox') {
    // Note: checkbox ui aumatically get updated
    const todoId = e.target.parentElement.dataset.id
    todos.find(todo => todo.id === todoId).isDone = e.target.checked
    setTodosLS()
  }

  // ## update todo: text
  if (e.target.classList.contains('edit-btn')) {
    const inputEl = e.target.previousElementSibling
    // enable text editing if already disabled 
    if(inputEl.disabled) {
      inputEl.disabled = false
      inputEl.focus()
      return
    }

    // disable text editing & save
    const newText = e.target.previousElementSibling.value
    const todoId = e.target.parentElement.dataset.id
    inputEl.disabled = true
    todos.find(todo => todo.id === todoId).text = newText
    setTodosLS()
  }

})