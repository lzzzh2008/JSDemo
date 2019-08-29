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
//封装ajax
var ajax = function (method, path, data, responseCallback) {
    var r = new XMLHttpRequest
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            responseCallback(r.response)
        }
    }
    r.send(data)
}

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

const urlParse = function (url) {
    let queryContent = {}
    //读取浏览器地址
    // let originQuer = window.location.search.slice(1).split('&')
    let originQuery = url.split('?')[1].split('&')
    if (originQuery == null) {
        return null
    } else {
        originQuery.forEach(element => {
            let [k, v] = element.split('=')
            if (k in queryContent) {
                const val = queryContent[k]
                if (val instanceof Array) {
                    queryContent[k].push(v)
                } else {
                    queryContent[k] = [val, v]
                }
            } else {
                queryContent[k] = v
            }
        })
    }
    return queryContent
}