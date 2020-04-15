# ReactNative/WebView Transport for Mole RPC (JSON RPC Library)
<!-- 
[![npm version](https://badge.fury.io/js/mole-rpc-transport-webworker.svg)](https://badge.fury.io/js/mole-rpc-transport-webworker)
[![Build Status](https://travis-ci.org/koorchik/node-mole-rpc-transport-webworker.svg?branch=master)](https://travis-ci.org/koorchik/node-mole-rpc-transport-webworker)
[![Known Vulnerabilities](https://snyk.io/test/github/koorchik/node-mole-rpc-transport-webworker/badge.svg?targetFile=package.json)](https://snyk.io/test/github/koorchik/node-mole-rpc-transport-webworker?targetFile=package.json) -->

**Setup communication between React Native and code inside WebView with just several lines of code.**

[Mole-RPC](https://www.npmjs.com/package/mole-rpc) is a tiny transport agnostic JSON-RPC 2.0 client and server which can work both in NodeJs, Browser, Electron etc.

This is Event Emitter (window) based transport but there are [many more transports](https://www.npmjs.com/search?q=keywords:mole-transport). 


<!-- **What is the reason of using JSON-RPC for WebWorkers?**

People usually send data to WebWorker in a form like `{id, method, params}` in JSON format via postMessage. As a result they expect `{id, result}`. And this is what JSON RPC is. `id` is required when you send several request and need to map results and requests.

So, why to write own solution every time? This transport allows you use JSON RPC for calling methods in WebWorkers. Moreover, it will handle all of edge-cases like errors processing, timeouts, batch calls, bidirectional communication etc.  -->

**Mole-RPC has zero dependencies and is a very small library.**

## Usage example (with simplified API)

**react-native-index.js**

```javascript
import MoleClient from 'mole-rpc/MoleClient';
import Transport  from 'mole-rpc-transport-react-native/Transport';

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
            transport : new Transport({ windowListener: webViewRef })
        });
    }

    render() {
        return (
            <WebView
                ref = {this.webViewRef}
            />
        );
    }
}

```

**webview-index.js**

```javascript
import MoleServer        from 'mole-rpc/MoleServer';
import Transport         from 'mole-rpc-transport-react-native/Transport.js';
import WindowListener    from 'mole-rpc-transport-react-native/WindowListener.js';

const sum = (a, b) => a + b;
const multiply = (a, b) => a * b;

async function main() {
    const server = new MoleServer({
        transports: [
            new Transport({
                windowListener: new WindowListener()
            })
        ]
    });

    server.expose({ sum, multiply });
    await server.run();
}

main().catch(console.error);
```

## More examples 

### Standard API for sending work to your web view from React Native.

See [examples/send-work-to-webview](./examples/send-work-to-webview/)

### Bidirectional connection

Each side works as client and server the same time.

See [examples/bidirectional-calls](./examples/bidirectional-calls/)
