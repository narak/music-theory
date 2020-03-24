/*
 * Polyfill for requestIdleCallback
 */
export default window.requestIdleCallback ||
    function(handler) {
        let startTime = Date.now();

        return setTimeout(function() {
            handler({
                didTimeout: false,
                timeRemaining: function() {
                    return Math.max(0, 50.0 - (Date.now() - startTime));
                },
            });
        }, 1);
    };
