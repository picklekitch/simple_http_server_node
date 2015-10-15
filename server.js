var http = require('http');
var fs = require('fs'); //damn you fs

//In case it isn't clear, I tried this a few different ways but for some reason I can't get this to deploy right... the server runs and receives requests when I try to load the localhost page but does not run the index.html file correctly... instead it prints out the index.html code... very strange

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
  fs.readFile('./index.html', function(err, data){ //this line has caused me the most trouble
    if(!err && request.url == '/' || request.url == './index.html'){ //if I remove the ! from in front of err in this line then the 404 response is sent everytime... why won't index.html display?
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

http.createServer(onRequest).listen(8888); //listen at localhost:8888
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
