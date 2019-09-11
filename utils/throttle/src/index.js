/**
 *
 * 如果当前调用与上一次调用时间间隔小于 wait 将会被过滤掉，超过 wait 时间才会执行 fn
 *
 * @param {Function} fn 需要去抖的回调函数
 * @param {number} wait 需要等待的时间
 */

function throttle(fn, wait) {
    let lastTime = 0;
    const debounced = debounce(fn, wait);
    return function throttled(...args) {
        const now = +new Date;
        if (now - lastTime > wait) {
            lastTime = now;
            fn.apply(this, args);
        } else {
            // debounce
            debounced(...args)
        }

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
inputEle.addEventListener('input', throttle(run, 3000))



