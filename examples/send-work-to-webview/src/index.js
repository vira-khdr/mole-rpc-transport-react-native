import MoleServer        from 'mole-rpc/MoleServer';
import Transport         from '../../../Transport.js';
import WindowListener    from '../../../WindowListener.js';
import { sum, multiply } from '../../utils.js';

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