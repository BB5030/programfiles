var db = require('./db.js')
var template = require('./template.js')
var url = require('url');
var qs = require('querystring');

module.exports = {
    home: (request, response)=>{
      db.query(`SELECT * FROM topic`, function(error, topics){
        var titleoftopic = 'Welcome';
        var description = 'Hello, Node.js';
        var context = {
          title: titleoftopic,
          list: topics,
          control: `<a href="/create">create</a>`,
          body: `<h2>${titleoftopic}</h2>${description}`
        };
        request.app.render('home', context, function(err, html){
          response.end(html);
        });
      });
    },
    page: (request, response) => {
        var _url = request.url;
        var id = request.params.pageId;
        db.query(`SELECT * FROM topic`, function (error, topics) {
          if (error) throw error;
          db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,
            [id], function (error2, topic) {
            if (error2) throw error2;
            var titleoftopic = topic[0].title;
            var descriptionoftopic = topic[0].description;
            var context = {
              title: titleoftopic,
              list: topics,
              control: `<a href="/create">create</a>
                        <a href="/update/${id}">update</a>
                        <form action="/delete_process" method="post">
                          <input type="hidden" name="id" value="${id}">
                          <input type="submit" value="delete">
                        </form>`,
              body: `<h2>${titleoftopic}</h2>${descriptionoftopic}<p>by ${topic[0].name}</p>`

            }
            request.app.render('home', context, function(err, html){
              response.end(html);
            });
          });
      });
    },
    create: (request, response) => {
      db.query(`SELECT * FROM topic`, function(error, topics){ //select 결과가 topics에 저장
        db.query(`SELECT * FROM author`, function(error2, authors){
          var titleofcreate = 'Create';
          var context = {
            title: titleofcreate,
            list: topics,
            control: `<a href="/create">create</a>`,
            body: `<form action="/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p><textarea name="description" placehodler="description"></textarea></p>
                    <p>${template.authorSelect(authors)}</p>
                    <p><input type="submit"></p>
                  </form>`
          };
          request.app.render('home', context, function(err, html){
            response.end(html);
          });
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
                INSERT INTO topic(title, description, created, author_id)
                    VALUES(?, ?, NOW(), ?)`, // 첫번째 문장이 insert일 경우 callback함수의 2번째 파라미터에
                                             // 입력된 튜플의 id값이 insertId로 저장됨
                [post.title, post.description, post.author], function(error,result){
                if(error){
                    throw error;
                }
                response.writeHead(302, {Location: `/page/${result.insertId}`}); 
                response.end();
                }
            );
        });
    },
    update: (request, response) => {
      var _url = request.url;
      id = request.params.pageId;
      db.query(`SELECT * FROM topic`, function(error, topics){
        if(error) throw error;
        db.query(`SELECT * FROM topic WHERE id=?`, [id], function(error2, topic){
          if(error2) throw error2;
          db.query(`SELECT * FROM author`, function(error3, authors){
            var context = {
              title: topic[0].title,
              list: topics,
              control: `<a href="/create">create</a> <a href="/update/${topic[0].id}">update</a>`,
              body: 
                `
                <form action="/update_process" method="post">
                  <input type="hidden" name="id" value="${topic[0].id}">
                  <p><input type="text" placeholder="title" value="${topic[0].title}"</p>
                  <p><textarea name="description" placeholder="description">${topic[0].description}</textarea></p>
                  <p>${template.authorSelect(authors, topic[0].author_id)}</p>
                  <p><input type="submit"></p>
                </form>
                `
            };
            request.app.render('home', context, function(err, html){
              response.end(html);
            });
          })
        });
      });
    },
    update_process: (request, response)=>{
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`,
            [post.title, post.description, post.author, post.id], 
            function(error, result){
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
            db.query(`DELETE FROM topic WHERE id=?`, [post.id], function(error, result){
                if(error) throw error;
                response.writeHead(302, {Location:`/`});
                response.end();
            });
        });
    }
}