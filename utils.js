export const ENVS = {
    WEBVIEW : 'WEBVIEW',
    BROWSER : 'BROWSER',
    TEST    : 'TEST'
};

export function getEnvironment() {
    let isReactNative = null;

    if (
        (window.webkit != null) &&
            (window.webkit.messageHandlers != null) &&
            (window.webkit.messageHandlers.ReactNative != null) &&
            (typeof window.webkit.messageHandlers.ReactNative.postMessage === 'function')
    ) {
        isReactNative = window.webkit.messageHandlers.ReactNative;
    } else if (
        (window['window.webkit.messageHandlers.ReactNative'] != null) &&
            (typeof window['window.webkit.messageHandlers.ReactNative'].postMessage === 'function')
    ) {
        isReactNative = window['window.webkit.messageHandlers.ReactNative'];
    } else if (
        window.ReactNativeWebView
    ) {
        isReactNative = window.ReactNativeWebView;
    }

    // TODO: will this break stuff?
    // if (process.env.NODE_ENV === 'test') {
    //     return ENVS.TEST;
    // }

    return !!isReactNative
        ? ENVS.WEBVIEW
        : ENVS.BROWSER;
}
