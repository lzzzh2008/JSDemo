var log = console.log.bind(console)
var e = function(selector) {
    var element = document.querySelector(selector)

    return element
}
var template = function(todo) {
    var t = `
    <div class="todo-cell">
    <button class="todo-done">完成</button>
    <button class="todo-del">删除</button>
    <span class="todo">${todo}</span>
    </div>
    `
    return t
}
var loadTodos = function() {
    var s = localStorage.savedTodo
    if (s == undefined) {
        return []
    } else {
        var ts = JSON.parse(s);
        return ts
    }
}
var todoAdd = e('#id-input-add')
var container = e('#id-div-contain')
var todos = loadTodos()

var insertTodos = function() {
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        var t = template(todo)
        container.insertAdjacentHTML('beforeend', t)
    }
}
insertTodos()

var delTodo = function(todoCell) {
    for (var i = 0; i < container.children.length; i++) {
        var cell = container.children[i]
        if (cell == todoCell) {
            log(cell, todoCell)
            todos.splice(i, 1)
            var t = JSON.stringify(todos)
            localStorage.savedTodo = t
        }
    }
}

var saveTodo = function(todo) {
    todos.push(todo)
    var t = JSON.stringify(todos)
    localStorage.savedTodo = t
}
var todoAdd = e('#id-input-add')
var container = e('#id-div-contain')


todoAdd.addEventListener('click', function (event) {
    var todoInput = e('#id-input-todo')
    var todo = todoInput.value
    saveTodo(todo)
    container.insertAdjacentHTML('beforeend', template(todo))
})

container.addEventListener('click', function (event) {
    var target = event.target
    var todoCell = target.parentElement
    log(todoCell.children[2])
    if (target.classList.contains('todo-done')) {
        log('123')
        todoCell.children[2].classList.toggle('done')
    } else if (target.classList.contains('todo-del')) {
        delTodo(todoCell)
        todoCell.remove()
    }

})
