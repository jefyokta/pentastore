const express = require('express');
const app = express();
const fs = require('fs')
const https = require('https')
const router = require('./routes/routes')
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');




const domain = 'api.penta.store';
const port = 80;
const options = {
  key: fs.readFileSync('./cert/api.penta.store.key'),
  cert: fs.readFileSync('./cert/api.penta.store.crt')
}

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());
app.use(router)

const server =  https.createServer(options,app)

app.listen(port, () => {
  console.log(`Server berjalan di https://${domain}:${port}`);
});

