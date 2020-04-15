import MoleClient        from 'mole-rpc/MoleClient';
import MoleServer        from 'mole-rpc/MoleServer';
import Transport         from '../../../Transport.js';
import WindowListener    from '../../../WindowListener.js';
import { sum, multiply } from '../../utils.js';

async function main() {
    const transport = new Transport({
        windowListener: new WindowListener()
    });

    const server = new MoleServer({
        transports: [
            transport
        ]
    });

    server.expose({ sum, multiply });
    await server.run();

    const client = new MoleClient({
        requestTimeout: 1000,
        transport
    });

    console.log(
        'Result from React Native in WebView',
        await client.divide(2, 3)
    );

    console.log(
        'Result from React Native in WebView',
        await client.substract(2, 3)
    );
}

main().catch(console.error);