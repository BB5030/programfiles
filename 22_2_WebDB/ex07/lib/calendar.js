var db = require('./db.js')
var calTemplate = require('./calTemplate.js')
var url = require('url');
var qs = require('querystring');

module.exports = {
    home: (response)=>{
        db.query(`SELECT * FROM calender`, function(error, months){
            var title = '월별 계획';
            var description = '1년 연중 일정 및 계획';
            var list = calTemplate.list(months);
            var html = calTemplate.HTML(title, list,
                `<h2>${title}</h2>${description}`,
                `<a href="/create">create</a>`
                );
            response.writeHead(200);
            response.end(html);
        });
    },
    detail: (request, response) => {
        var _url = request.url;
        var queryData = url.parse(_url, true).query;
        db.query(`SELECT * FROM calender`, function (error, months) {
            if (error)
                throw error;
            db.query(`SELECT * FROM calender LEFT JOIN author ON calender.author_id=author.id WHERE calender.id=?`,
                [queryData.id], function (error2, calender) {
                    if (error2) throw error2;
                    var title = calender[0].title;
                    var description = calender[0].description;
                    var list = calTemplate.list(months);
                    var html = calTemplate.HTML(title, list,
                        `
                    <h2>${title}</h2>${description}
                    <p>by ${calender[0].name}</p>
                    `,
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
    },
    create: (request, response) => {
        db.query(`SELECT * FROM calender`, function(error, months){ //select 결과가 months에 저장
            db.query(`SELECT * FROM author`, function(error2, authors){
              var title = 'Create';
              var list = calTemplate.list(months); //form 태그 작성 시 action과 method 반드시 있어야한다
              var html = calTemplate.HTML(title, list, `
                <form action="/create_process" method="post"> 
                  <p><input type="text" name="title" placeholder="title"></p>
                  <p>
                    <textarea name="description" placeholder="description"></textarea>
                  </p>
                  <p>
                    ${calTemplate.authorSelect(authors)}
                  </p>
                  <p><input type="submit"></p>
                </form>
                `, 
                '<a href="/create">create</a>'
              );
            response.writeHead(200);
            response.end(html);
            });
          });
    },
    create_process(request, response){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            db.query(` 
                INSERT INTO calender(title, description, created, author_id)
                    VALUES(?, ?, NOW(), ?)`, 
                [post.title, post.description, post.author], function(error,result){
                if(error){
                    throw error;
                }
                response.writeHead(302, {Location: `/?id=${result.insertId}`}); 
                response.end();
                }
            );
        });
    },
    update: (request, response) => {
        var _url = request.url;
        var queryData = url.parse(_url, true).query;
        db.query(`SELECT * FROM calender`, function(error, months){
            if(error) throw error;
            db.query(`SELECT * FROM calender WHERE id=?`, [queryData.id], function(error2, calender){
              if(error2) throw error2;
              db.query(`SELECT * FROM author`, function(error3, authors){
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
                      ${calTemplate.authorSelect(authors, calender[0].author_id)}
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
                })
            });
        });
    },
    update_process : function(request, response) {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            db.query('UPDATE calender SET title=?, description=?, WHERE id=?',
                [post.title, post.description, post.id],function(error, result) {
                response.writeHead(302, {Location: `/page/${post.id}`});
            response.end(); 
            });
        }); 
    },
    delete_process: (request, response)=>{
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
    }
}