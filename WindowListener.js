import { getEnvironment, ENVS } from './utils.js';

class WindowListener {
    constructor() {
        this.listeners = [];
        // init window to receive messages
        document.addEventListener('message', this.onWindowMessage.bind(this), false);
        window.addEventListener('message', this.onWindowMessage.bind(this), false);

        let ReactNative = null;

        if (
            (window.webkit != null) &&
            (window.webkit.messageHandlers != null) &&
            (window.webkit.messageHandlers.ReactNative != null) &&
            (typeof window.webkit.messageHandlers.ReactNative.postMessage === 'function')
        ) {
            ReactNative = window.webkit.messageHandlers.ReactNative;
        } else if (
            (window['window.webkit.messageHandlers.ReactNative'] != null) &&
            (typeof window['window.webkit.messageHandlers.ReactNative'].postMessage === 'function')
        ) {
            ReactNative = window['window.webkit.messageHandlers.ReactNative'];
        } else if (
            window.ReactNativeWebView
        ) {
            ReactNative = window.ReactNativeWebView;
        }

        this.reactNative = ReactNative;
        this.env = getEnvironment();
    }

    onWindowMessage(_event) {
        const event = _event.data || '';

        if (!event || typeof event !== 'string' || event === 'undefined') return;
        if (event.startsWith('webpack')) return;
        if (this.env !== ENVS.WEBVIEW) return;
        for (const listener of this.listeners) {
            listener(event);
        }
    }

    postMessage(...params) {
        if (this.env !== ENVS.WEBVIEW) {
            console.error('Could not send a message to the Native part in the browser!');

            return;
        }

        this.reactNative.postMessage(...params);
    }

    addEventListener(callback) {
        this.listeners.push(callback);
    }
}

export default WindowListener;
