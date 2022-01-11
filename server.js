require('dotenv').config()

// REST APP & WEBSOCKET
var { app, socketListener } = require('./controller/app.js');

var port = process.env.PORT || 3000
// var domain = isDevelopment ? ("localhost:"+port) : process.env.DOMAIN_NAME;
    
const server = app.listen(port, hostname, () => {
    console.log(`Server is listening on ${hostname}:${port}` );
});

socketListener(server);