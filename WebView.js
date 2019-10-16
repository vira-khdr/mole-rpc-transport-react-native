import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { WebView }          from 'react-native-webview';

let WEBVIEW_WAS_RENDERED = false;

export default class WebViewWrapper extends Component {
    static propTypes = {
        onLoadEnd : PropTypes.func,
        onReload  : PropTypes.func
    };

    static defaultProps = {
        onLoadEnd : () => {},
        onReload  : () => {}
    };

    constructor(...params) {
        super(...params);

        this.listeners = [];
        this.loaded = false;
    }

    handleOnMessageEvent = (_event) => {
        const event = _event.nativeEvent.data;

        for (const listener of this.listeners) {
            listener(event);
        }
    }

    handleLoadEnd = () => {
        if (!this.loaded) {
            this.props.onLoadEnd();
            this.loaded = true;
        } else {
            this.props.onReload();
            console.warn('WebView has been loaded for several times!');
        }
    }

    addEventListener = (callback) => {
        this.listeners.push(callback);
    }

    postMessage = (...params) => {
        this.webView.postMessage(...params);
    }

    render() {
        if (WEBVIEW_WAS_RENDERED) console.warn('WebView component has been rerendered! You may lose state of your app inside WebView');
        else WEBVIEW_WAS_RENDERED = true;

        const webViewProps = {};

        if (config.useLocal) {
            webViewProps.source = { uri: config.localURI };
        } else {
            webViewProps.source = { html: HTML };
            webViewProps.injectedJavaScript = myJSLib;
        }

        return (
            <WebView
                {...this.props}
                ref       = {webView => this.webView = webView}
                onMessage = {this.handleOnMessageEvent}
            />
        );
    }
}
