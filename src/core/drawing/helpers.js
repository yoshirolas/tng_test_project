export const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
export const isHighDensityScreen = (() => {
    //XXX: in hidden iframe, FF matchMedia returns always true, for any media query!
    const isFF = /firefox/i.test(navigator.userAgent);
    if (isFF) {
        return window.devicePixelRatio && window.devicePixelRatio > 1.3;
    }
    let isHighDensityScreen = false;
    if (window.matchMedia) {
        let matchedExpr = window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)');
        if (matchedExpr) {
            isHighDensityScreen = matchedExpr.matches;
        }
        matchedExpr = window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)');
        if (matchedExpr) {
            isHighDensityScreen = isHighDensityScreen || matchedExpr.matches;
        }
    }
    return isHighDensityScreen || (window.devicePixelRatio && window.devicePixelRatio > 1.3);
})();