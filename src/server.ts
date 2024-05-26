import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;


async function main() {
    const port = config.port || 8080;
    try {
        await mongoose.connect(config.database_uri as string, {
            dbName: config.database_name,
        });
        console.log(
            '\x1b[36mDatabase Connected Successfully ... \x1b[32m✔\x1b[0m',
        );
        app.listen(port, () => {
            console.log('\x1b[36mServer is Running ... \x1b[32m✔\x1b[0m');
            console.log(`\x1b[35mURL: http://localhost:${port}\x1b[0m`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();
