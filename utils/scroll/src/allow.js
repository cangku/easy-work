
function allowScroll() {
    document.body.removeEventListener('touchmove')
    document.body.removeAttribute('style', bodyScroll)
}
