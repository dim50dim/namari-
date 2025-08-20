const http = require('http');
const path = require('path');
const {mimeTypes} = require('./utilities/mime');
const {staticFile} = require('./utilities/static_file');
// const PORT = process.env.PORT
const PORT = 3500;
const HOSTNAME = "0.0.0.0"

http.createServer(function(req, res){
    const url = req.url;

    switch (url) {
        case '/':
            staticFile(res, '/html/main_page.html', '.html');
            break;
        default:
            const extname = String(path.extname(url)).toLocaleLowerCase();
            if(extname in mimeTypes) staticFile(res, url, extname);
            else {
                res.statusCode = 404;
                res.end();
            }
    }

}).listen(PORT,HOSTNAME);