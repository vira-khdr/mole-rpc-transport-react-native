import React      from 'react';
import MoleClient from 'mole-rpc/MoleClient';
import WebView    from '../../WebView.js';
import Transport  from '../../Transport.js';

// Here the code of webview side should be placed (in string form)
const JSLib = "";

export default class ReactNativeApp extends React.PureComponent {
    constructor(...params) {
        super(...params);

        this.webViewRef = React.createRef();
    }
    componentDidMount() {
        this.initMoleRPC(this.webViewRef.current);
    }

    async initMoleRPC(webViewRef) {
        const client = new MoleClient({
            requestTimeout : 1000,
            transport : new Transport({
                windowListener: webViewRef
            })
        });

        console.warn(
            'Result from WebView in React Native',
            await client.sum(2, 3)
        );

        console.warn(
            'Result from WebView in React Native',
            await client.multiply(2, 3)
        );
    }

    render() {
        return (
            <WebView
                ref                = {this.webViewRef}
                originWhitelist    = {[ '*' ]}
                injectedJavaScript = {JSLib}
                javaScriptEnabledAndroid
                javaScriptEnabled
                useWebKit
            />
        );
    }
}
