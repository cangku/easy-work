/**
 *
 * wait 时间内多次调用 fn 将会被过滤掉，wait 时间内没有再次被调用才会执行 fn
 *
 * @param {Function} fn 需要去抖的回调函数
 * @param {number} wait 需要等待的时间
 */

function debounce(fn, wait) {
    let timer;
    return function debounced(...args) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait);
    }
}

function run(e) {
    console.log(e, +new Date);
}

// <input id="input" />

// one
const inputEle = document.getElementById('input');
inputEle.addEventListener('input', run)

// two
inputEle.addEventListener('input', debounce(run, 3000))
