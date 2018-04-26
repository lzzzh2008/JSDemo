//log直接代替console。log
var log = console.log.bind(console)

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
