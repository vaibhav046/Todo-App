
// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const config = require('./config/keys');
// const cookieSessionModule = require('cookie-session');
// const passport = require('passport');
const app = express();
var cors = require('cors')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/bucketRoutes')(app);
require('./routes/todoListRoutes')(app);


const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err)
        console.error(err);
    else
        console.info('server running');
});


module.exports = app;
