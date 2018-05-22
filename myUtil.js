//log直接代替console。log
var log = console.log.bind(console)

//封装常用函数
var e = function(selector) {
    var element = document.querySelector(selector)
    if (element == null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 前面`
        alert(s)
    } else {
        return element
    }
}
var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}
//批量选择元素
var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    if (elements.length == 0) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 前面`
        alert(s)
    } else {
        return elements
    }
}
//批量绑定事件
var bindAll = function(selector, eventName, callback) {
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}
//插入html
var appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}
//批量插入html
var append = function(selector, html) {
    var e = document.querySelectorAll(selector)
    for (var i = 0; i < e.length; i++) {
        appendHtml(e[i], html)
    }
}
var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

//测试函数
var ensure = function(condition, message) {
    if (!condition) {
        log(message)
    } else {
        log('测试成功')
    }
}
// 定义一个增强的 ensureEqual
var ensureEqual = function(a, b, message) {
    if (a != b) {
        log(`*** 测试失败, ${a} 不等于 ${b}, ${message}`)
    }
}
//返回字符s1在s2中的index 不存在返回-1
var find = function(s1, s2) {
    for (var i = 0; i < s2.length; i++) {
        var n = s2[i]
        if (s1 === n) {
            return i
        }
    }
    return -1
}
//字符转大写
var uppercase =function(s) {
    var result = ''
    for (char of s) {
        if (!lower.includes(char)) {
            result += char
        } else {
            result += upper[find(char, lower)]
        }
    }
    return result
}
//字符转小写
var lowercase =function(s) {
    var result = ''
    for (char of s) {
        if (!upper.includes(char)) {
            result += char
        } else {
            result += lower[find(char, upper)]
        }
    }
    return result
}

//每一个字符向右移动shift个（凯撒加密）
var caesarEncode = function (s, shift) {
    s = lowercase(s)
    var result = ''
    for (char of s) {
        if (!lower.includes(char)) {
            result += char
        } else {
            var index = find(char, lower)
            if (index + shift > 25) {
                result += lower[(index + shift) % 26]
            } else {
                result += lower[index + shift]
            }
        }
    }
    return result
}

var caesarDecode = function(s, shift) {
    s = lowercase(s)
    var result = ''
    for (char of s) {
        if (!lower.includes(char)) {
            result += char
        } else {
            var index = find(char, lower)
            if (index - shift < 0) {
                result += lower[Math.abs(26 + index - shift) % 26]
            } else {
                result += lower[index - shift]
            }
        }
    }
    return result
}

//单个数组去重
var unique = function(a) {
    var ary = []
    for (var i = 0; i < a.length; i++) {
        if (ary.includes(a[i])) {
            continue
        }else {
            ary.push(a[i])
        }
    }
    return  ary
}
//取两个数组的交集
var intersection = function(a, b) {
    var ary = []
    for (var i = 0; i < a.length; i++) {
        if(b.includes(a[i])){
            ary.push(a[i])
        }
    }
    ary = unique(ary)
    return ary
}
//取两个数组的并集
var union = function(a, b) {
    var r = []
    for (var i = 0; i < b.length; i++) {
        a.push(b[i])
    }
    r = unique(a)
    return r
}
//取a 中有 b 中没有的元素
var difference = function(a, b) {
    var ary = []
    for (var i = 0; i < a.length; i++) {
        if (b.includes(a[i]) == false) {
            ary.push(a[i])
        }
    }
    ary = unique(ary)
    return ary
}
//取ab的非公共元素
var differenceAll = function(a, b) {
    var ary = []
    var a1 = difference(a, b)
    var b1 = difference(b, a)
    for (var i = 0; i < a1.length; i++) {
        ary.push(a1[i])
    }
    for (var i = 0; i < b1.length; i++) {
        ary.push(b1[i])
    }
    ary = unique(ary)
    return ary
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

// find 函数可以查找 element 的所有子元素
var find = function(element, selector) {
    var e = element.querySelector(selector)
    if (e == null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 前面`
        alert(s)
    } else {
        return e
    }
}

var closestClass = function(element, className){
    /*
    element 是一个 DOM 元素
    className 是一个 string
    循环查找 element 的直系父元素
    如果父元素拥有 className 这个 class, 则返回这个父元素
    如果找到 document 都还没有, 则返回 null
    */
    var e = element
    while (e != null) {
        if (e.classList.contains(className)) {
            return e
        } else {
            e = e.parentElement
        }
    }
}

var closestId = function(element, idName){
    /*
    element 是一个 DOM 元素
    idName 是一个 string
    循环查找 element 的直系父元素
    如果父元素拥有 idName 这个 id, 则返回这个父元素
    如果找到 document 都还没有, 则返回 null

    提示
    假设 a 是一个标签, 用 a.id 来获取它的 id
    */
    var e = element
    while (e != null) {
        // 判断 e 是否包含 idName 这个 id
        if (e.id == idName) {
            return e
        } else {
            e = e.parentElement
        }
    }
}

var closestTag = function(element, tagName){
    /*
    element 是一个 DOM 元素
    tagName 是一个 string
    循环查找 element 的直系父元素
    如果父元素是一个 tagName 标签, 则返回这个父元素
    如果找到 document 都还没有, 则返回 null

    tagName 是 'div' 'p' 'h1' 这样的标签名
    获取一个 DOM 元素的标签名的方法如下
    element.tagName
    需要注意的是, tagName 属性返回的标签名是大写的
    例如 'DIV' 'H1'
    所以你在比较的时候需要把 tagName 转换为大写字母
    使用如下 js 标准库函数转换
    tagName.toUpperCase()
    */
    var e = element
    while (e != null) {
        // 判断 e 是否和 tagName 相等
        if (e.tagName.toUpperCase() == tagName.toUpperCase()) {
            return e
        } else {
            e = e.parentElement
        }
    }
}

var closest = function(element, selector){
    /*
    element 是一个 DOM 元素
    selector 是一个 string, 表示一个选择器
    可能的值是  'div'  '#id-div-gua'  '.red' 这三种

    循环查找 element 的直系父元素
    如果父元素符合选择器, 则返回这个父元素
    如果找到 document 都还没有, 则返回 null

    提示
    判断选择器的第一个字符来决定如何比较
    */
    var char = selector[0]
    if (char == '.') {
        var className = selector.slice(1)
        return closestClass(element, className)
    } else if (char == '#') {
        var idName = selector.slice(1)
        return closestId(element, idName)
    } else {
        var tag = selector
        return closestTag(element, tag)
    }
}