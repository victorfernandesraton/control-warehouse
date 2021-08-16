import App from '../http/Express/App';
import { createServer } from 'http';

const Server = createServer(App);

Server.listen(8000);
