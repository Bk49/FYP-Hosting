require('dotenv').config()

// REST APP & WEBSOCKET
var { app, socketListener } = require('./controller/app.js');

// const isDevelopment = process.env.NODE_ENV === 'development';

var port = process.env.PORT || 3000;
// var domain = isDevelopment ? ("localhost:"+port) : process.env.DOMAIN_NAME;
    
const server = app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

socketListener(server);