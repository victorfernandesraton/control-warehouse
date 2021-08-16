import App from 'express';
import { createServer } from 'http';

const Server = createServer(App);

Server.listen(8000);
