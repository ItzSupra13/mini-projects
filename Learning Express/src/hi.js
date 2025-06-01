const http = require('http');
const path = require("path");
const fs = require("fs");
const port = 3500;
const hostname = "127.0.0.1";


const server = http.createServer((request, result)=>{
	const filepath = path.join(__dirname, request.url === "/" ? "hi.html" : request.url);
    console.log(filepath, request.url);
    const extention = String(path.extname(filepath)).toLowerCase();
    const mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
    };
    const contentType = mimeTypes[extention] || "application/octet-stream";

    fs.readFile(filepath, (error, data)=>{
        if (error) {
            result.writeHead(404, { "Content-Type": "text/html" });
            result.end("<h1>404 Not Found</h1>");
        } else {
            result.writeHead(200, { "Content-Type": mimeTypes[extention] });
            result.end(data, "utf-8");
        }
    })
}); //complex server

const server2 = http.createServer((request, result)=>{
    if(request.url === "/"){
        result.statusCode = 200;
        result.setHeader("Content-Type", "text/plain");
        result.end("Hello World");
    }
    else if(request.url === "/hi"){
        result.statusCode = 200;
        result.setHeader("Content-Type", "text/html");
        result.end("<h1>Hi</h1>");
    }
    else{
        result.statusCode = 404;
        result.setHeader("Content-Type", "text/plain");
        result.end("404 Not Found");
    }
    
});//simple server - but routing issues that's why we use express

//server.listen(3500);
server2.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});