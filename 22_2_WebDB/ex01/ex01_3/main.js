var http = require('http');
var url = require('url');
const calender = require('./calander.js');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        calender.home(response);
        } else {
            calender.detail(request, response);
        }
    } else if(pathname === '/create'){
        calender.create(request, response);
    } else if(pathname === '/create_process'){
        calender.create_process(request, response);
    } else if(pathname === '/update'){
        calender.update(request, response);
    } else if(pathname === '/update_process'){
        calender.update_process(request, response);
    } else if(pathname === '/delete_process'){
        calender.delete_process(request, response);
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);