var bindEventSlide = function() {
    var slide = '.btn'
    bindAll(slide, 'click', function(event) {
        var button = event.target
        var main = button.parentElement
        var offset = Number(button.dataset.offset)
        var index = nextIndex(main, offset)
        showImageAtIndex(main, index)
    })
}
var bindEventIndi = function() {
    var indi = '.point'
    bindAll(indi, 'click', function(event) {
        var indicator = event.target
        var index = indicator.dataset.indi
        var main = indicator.closest('.main')
        showImageAtIndex(main, index)
    })
}

var nextIndex = function(main, offset) {
    var numberOfImgs = Number(main.dataset.imgs)
    var activedImgs = Number(main.dataset.active)
    var index = (numberOfImgs + activedImgs + offset) % numberOfImgs
    return index
}

var showImageAtIndex = function(main, index) {
    main.dataset.active = index
    var className = 'show'
    removeClassAll(className)
    var nextImg = e('#img-' + String(index))
    nextImg.classList.add(className)

    var indiClass = 'active'
    removeClassAll(indiClass)
    var nextIndi = e('#indi-' + String(index))
    nextIndi.classList.add(indiClass)
}
var playNextImg = function() {
    var main = e('.main')
    var index = nextIndex(main, 1)
    showImageAtIndex(main, index)
}
var autoPlay = function() {
    var interval = 2000
    setInterval(function() {
        playNextImg()
    }, interval)
}
bindEventSlide()
bindEventIndi()
autoPlay()