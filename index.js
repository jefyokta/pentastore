const express = require('express');
const app = express();
const fs = require('fs')
const router = require('./routes/routes')
const cors = require('cors');
const path = require('path')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')




const domain = 'penta.store';
const port = 3000;
// const options = {
//   key: fs.readFileSync('./cert/api.penta.store.key'),
//   cert: fs.readFileSync('./cert/api.penta.store.crt')
// }

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const corsOptions = {
  credential: true,
  origin: 'http://localhost:8081',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

};

// app.use(cors(corsOptions));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(morgan('combined', { stream: accessLogStream }));
app.use(router)

// const server =  https.createServer(options,app)

app.listen(port, domain, () => {
  console.log(`Server berjalan di http://${domain}:${port}`);
});

