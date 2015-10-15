var http = require('http');
var fs = require('fs');

// http.createServer(function(request, response){
//   console.log("A user has made a request " + request.url);
//   var filename = './index.html' + request.url;
//   var readStream = fs.createReadStream('filename');
//   readStream.on('open', function(){
//     readStream.pipe(response);
//   });
//   readStream.on('error', function(err){
//     response.writeHead(404, {'Content-Type': 'text/plain'});
//     response.write("Error 404: Page not found.")
//     response.end(err);
//   })
// }).listen(8888);
// console.log("You done built a server!");

function onRequest(request, response){
  console.log("A user has made a request " + request.url);
  fs.readFile('./index.html', function(err, data){
    if(!err && request.url == '/' || request.url == './index.html'){
      response.writeHead(200, {'Content-Type': 'text/plain'});
      fs.createReadStream('./index.html').pipe(response);
      response.end(data);
    } else {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write("Error 404: Page not Found!");
      response.end();
    }
  });
}

http.createServer(onRequest).listen(8888);
console.log("You done built yourself a server!")

// function trigger404Error(response){
//   response.writeHead(404, {'Content-Type': 'text/plain'});
//   response.write("Error 404: Page not found!");
//   response.end();
// }

// function onRequest(request, response){
//   console.log("A user has made a request" + request.url);
//   if(request.method == 'GET' && request.url == '/' || request.url == './index.html'){
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     fs.createReadStream('i./ndex.html').pipe(request);
//   } else {
//     trigger404Error(response);
//   }
// }

// http.createServer(onRequest).listen(8888);
// console.log("You done built yourself a server!")
