import React      from 'react';
import MoleClient from 'mole-rpc/MoleClient';
import MoleServer from 'mole-rpc/MoleServer';
import WebView    from '../../WebView.js';
import Transport  from '../../Transport.js';

import { divide, substract } from '../utils.js';

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
        const transport = new new Transport({
            windowListener: webViewRef
        });

        const client = new MoleClient({
            transport
        });

        const server = new MoleServer({
            transports: [
                transport
            ]
        });
    
        server.expose({ divide, substract });
        await server.run();

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
