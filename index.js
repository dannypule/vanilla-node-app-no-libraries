var http = require("http");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;

var server = http.createServer(function(req, res) {
  var parsedUrl = url.parse(req.url, true);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");
  var queryStringObject = parsedUrl.query;
  var method = req.method.toLowerCase();
  var headers = req.headers;
  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", function(data) {
    buffer += decoder.write(data);
  });
  req.on("end", function() {
    buffer += decoder.end();
    console.log(buffer);
    res.end(JSON.stringify(buffer));
  });
  // res.end(`
  //   Request is received on path: ${trimmedPath}\n
  //   with method: ${method}\n
  //   with query: ${queryStringObject.foo}
  // `);
});

server.listen(3000, function() {
  console.log("the server is listening on port 3000");
});
