//封装常用函数
var e = function(selector) {
    var element = document.querySelector(selector)
    return element
}
var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    return elements
}
var bindAll = function(elements, eventName, callBack) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventName, callBack)
    }
}

var buttons = es('.btn')
console.log(buttons);
bindAll(buttons, 'click', function(event) {
    var actived = e('.active')
    actived.classList.remove('active')
    
    var self = event.target
    self.classList.add('active')

    var showed = e('.show')
    showed.classList.remove('show')
    var content = e(self.dataset.tag)
    content.classList.add('show')
})