var e = selector => document.querySelector(selector)

var log = console.log.bind(console)

var insertHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)

var ajax = function (method, path, data, callback) {
    var r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = () => {
        if (r.readyState === 4) {
            callback(r.response)   
        }
    }
    r.send(data)
}
var insertInput = () => {
    var t = `
        <div>
            <input id="id-input-task">
            <button id="id-button-add" class="todo-add" data-action="todo_add">add button</button>
        <div>
    `
    var element = e('#id-div-todo-container')
    insertHtml(element, t)
}
var templateTodo = (todo) => {
    var task = todo.task
    var id = todo.id
    var t = `
        <div class="todo-cell" data-id="${id}">
            <button class="todo-delete" data-action="todo_delete">删除</button>
            <button class="todo-edit" data-action="todo_edit">编辑</button>
            <span class="todo-task">${task}</span>
        </div>
    `
    return t
}
var insertTodo = (todo) => {
    var container = e('#id-div-todo-container')
    var html = templateTodo(todo)
    insertHtml(container, html)
}
var insertTodos = (todos) => {
    for (let index = 0; index < todos.length; index++) {
        const element = todos[index]
        insertTodo(element)
    }
}
class TodoApi {
    constructor() {
        this.baseUrl = 'https://vip.cocode.cc/sandbox/todo/438732212'
    }
    get(path, callback) {
        var url = this.baseUrl + path 
        ajax('GET', url, '', function(r){
            var data = JSON.parse(r)
            callback(data)
        })
    }
    post(path, data, callback) {
        var url = this.baseUrl + path
        data = JSON.stringify(data)
        ajax('POST', url, data, function(r) {
            var data = JSON.parse(r)
            callback(data)
        })
    }
    all(callback) {
        var path = '/all'    
        this.get(path, callback)
    }
    add(data, callback) {
        var path = '/add'
        this.post(path, data, callback)
    }
    delete(todoId, callback) {
        var path = '/delete/' + todoId
        this.get(path, callback)
    }
    update(todoId, data, callback) {
        var path = '/update/' + todoId
        this.post(path, data, callback)
    }   
}

var actionAdd = () => {
    var input = e('#id-input-task')
    var value = input.value
    var data = {
        'task': value,
    }
    var api = new TodoApi()
    api.add(data, function(todo) {
        insertTodo(todo)
    })
}
var actionDelete = (event) => {
    var self = event.target
    var todoCell = self.closest('.todo-cell')
    var todoId = todoCell.dataset.id
    var api = new TodoApi()
    api.delete(todoId, function(todo) {
        todoCell.remove()
    })   
}
var actionEdit = (event) => {
    var self = event.target
    var todoCell = self.closest('.todo-cell')
    var todoTask = todoCell.querySelector('.todo-task')
    todoTask.contentEditable = true
    todoTask.focus()
}

var bindEventUpdate = () => {
    var container = e('#id-div-todo-container')
    container.addEventListener('keydown', function(event) {
        var self = event.target
        if (self.classList.contains('todo-task')) {
            if (event.key == 'Enter') {
                event.preventDefault()    
                self.contentEditable = false

                var todoCell = self.closest('.todo-cell')
                var todoId = todoCell.dataset.id
                var data = {
                    'task': self.innerHTML,
                }
                var api = new TodoApi()
                api.update(todoId, data, function(todo) {
                    log('更新todo', todo)
                })
            } 
        }
    })
}
var bindEventDelegates = () => {
    var container = e('#id-div-todo-container')
    container.addEventListener('click', function(event) {
        var self = event.target 
        var actionName = self.dataset.action
        var action = actions[actionName]
        if (action != undefined) {
            action(event)
        } 
    })
}
var loadTodos = () => {
    var api = new TodoApi()
    api.all(function(todos) {
        insertTodos(todos)
    })
}

var bindEvents = () => {
    bindEventDelegates()
    bindEventUpdate()
}
var __main = () => {
    insertInput()
    bindEvents()
    loadTodos()

}
__main()
