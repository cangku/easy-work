function a() {
    b()
    console.log(456);
}

function b() {
    console.log(123);
    replay();
}

function foo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(555);
        }, 10000)
    })
}

function a(errInfo = 'error', replay = function () { }) {
    // let g = function* a() {
    //     yield foo();
    // }
    setTimeout(() => {
        console.log(123);
    }, 1000)
    // g().throw(5678)
    replay(errInfo)
    throw new Error(errInfo);
}

process.on('unhandledRejection', e => {


})

var abc = a();

