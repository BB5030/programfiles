var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var calTemplate = require('./calTemplate.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database: 'opentutorials'
});

db.connect();

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        db.query(`SELECT * FROM calender`, function(error, months){
            var title = "월별 계획";
            var description = '월을 클릭해주세요!!';
            var list = calTemplate.list(months);
            var html = calTemplate.HTML(title, list,
                `<h2>${title}</h2>${description}`,
                `<a href="/create">create</a>`
                );
            response.writeHead(200);
            response.end(html);
        });
        } else {
            db.query(`SELECT * FROM calender`, function(error, months){
                if(error){
                    throw error;
                }
                db.query(`SELECT * FROM calender WHERE id=?`, [queryData.id], function(error2, calender){
                    if(error2){
                        throw error2;
                    }
                    var title = calender[0].title;
                    var description = calender[0].description;
                    var list = calTemplate.list(months);
                    var html = calTemplate.HTML(title, list,
                        `<h2>${title}</h2>${description}`,
                        `
                        <a href="/create">create</a>
                        <a href="/update?id=${queryData.id}">update</a>
                        <form action="delete_process" method="post">
                          <input type="hidden" name="id" value="${queryData.id}">
                          <input type="submit" value="delete">
                        </form>
                        `
                    );
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    } else if(pathname === '/create'){
      db.query(`SELECT * FROM calender`, function(error, months){ 
        var title = 'Create';
        var list = calTemplate.list(months); 
        var html = calTemplate.HTML(title, list, `
          <form action="/create_process" method="post"> 
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `, 
          '<a href="/create">create</a>'
        );
        response.writeHead(200);
        response.end(html);
      });
    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query(` 
            INSERT INTO calender(title, description, created, month_id)
                VALUES(?, ?, NOW(), ?)`, // 첫번째 문장에 insert일 경우 callback함수의 2번째 파라미터에
                                        //입력된 튜플의 id값이 insertId로 저장됨
            [post.title, post.description, 1], function(error,result){
              if(error){
                throw error;
              }
              response.writeHead(302, {Location: `/?id=${result.insertId}`}); 
              response.end();
            }
          );
      });
    } else if(pathname === '/update'){
      db.query(`SELECT * FROM calender`, function(error, months){
        if(error) throw error;
        db.query(`SELECT * FROM calender WHERE id=?`, [queryData.id], function(error2, calender){
          if(error2) throw error2;
          var list = calTemplate.list(months);
          var html = calTemplate.HTML(calender[0].title, list,
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${calender[0].id}">
              <p><input type="text" name="title" placeholder="title" value="${calender[0].title}"></p>
              <p>
                <textarea name="description" placeholder="description">${calender[0].description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${calender[0].id}">update</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        db.query(`UPDATE calender SET title=?, description=?, month_id=1 WHERE id=?`,
          [post.title, post.description, post.id], function(error, result){
          response.writeHead(302, {Location: `/?id=${post.id}`});
          response.end();
        });   
      });
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query(`DELETE FROM calender WHERE id=?`, [post.id], function(error, result){
            if(error) throw error;
            response.writeHead(302, {Location:`/`});
            response.end();
          });
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);