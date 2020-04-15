import React       from 'react';
import PropTypes   from 'prop-types';
import { WebView } from 'react-native-webview';

let WEBVIEW_WAS_RENDERED = false;

export default class WebViewWrapper extends React.PureComponent {
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
        this.webView = React.createRef();
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
        this.webView.current.postMessage(...params);
    }

    render() {
        if (WEBVIEW_WAS_RENDERED) console.warn('WebView component has been rerendered! You may lose state of your app inside WebView');
        else WEBVIEW_WAS_RENDERED = true;

        return (
            <WebView
                {...this.props}
                ref       = {this.webView}
                onMessage = {this.handleOnMessageEvent}
                onLoadEnd = {this.handleLoadEnd}
            />
        );
    }
}
