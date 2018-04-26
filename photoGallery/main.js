var imgs = es('.image-item')
bindAll(imgs, 'click', function(event) {
    var imgShowed = e('.show')
    imgShowed.classList.remove('show')

    var self = event.target
    self.classList.add('show')
    var selfSrc = self.src
    var imgShow = e('.image-content')
    imgShow.src = selfSrc
})