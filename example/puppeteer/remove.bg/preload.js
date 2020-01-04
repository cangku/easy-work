module.exports = function() {
    Object.defineProperty(navigator, 'languages', {
        get: () => ['zh-CN', 'zh', 'en']
    });

    Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined
    });
};
