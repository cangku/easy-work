
function bodyScroll(e) {
    e.preventDefault();
}

function disableScroll() {
    document.body.addEventListener('touchmove', bodyScroll, false)
    document.body.setAttribute('style', 'position:fixed; width:100%;')
}


