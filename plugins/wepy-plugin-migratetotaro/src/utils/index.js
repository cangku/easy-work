/**
 * @desc 过滤数组中重复元素
 * @param {array} arr
 */
export function unique(arr) {
    return Array.from(new Set(arr));
}

/**
 * @desc 判断元素是不是数组
 * @param {} param
 */
export function isArray(param) {
    return Object.prototype.toString.call(param).indexOf('Array') !== -1;
}
