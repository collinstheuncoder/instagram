import http from 'http';

import app from './app';
import config from './config';

const port = process.env.PORT || config.port;

http.createServer(app).listen(port, () => {
  console.log(`Server running at ${port}`);
});
