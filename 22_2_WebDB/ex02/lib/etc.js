var db = require('./db.js')
var url = require('url');
var qs = require('querystring');

module.exports = {
    home: (request, response)=>{
        db.query(`SELECT * FROM book`, function(error, result){
            var context = {
                doc: `./book.ejs`,
                results: result,
                cls: ' ',
                loggined: ' ',
            };
            request.app.render('index', context, function(err, html){
                response.end(html);
            });
        });
    },
    calendarHome: (request, response)=>{
      db.query(`SELECT * FROM calender`, function(error, result){
       if(error) throw error;
        tmplogin = 'Y';
        var context = {
            doc: `./calendar/calendar.ejs`,
            loggined: tmplogin,
            id: 'admin',
            results: result
        };
        request.app.render('index', context, function(err, html){
            response.end(html);
        });
      });
    }, calendarCreate: (request, response)=>{
        var titleofcreate = 'Create';
        var context = {doc : `./calendar/calendarCreate.ejs`,
                       title : '',
                       description : '',
                       kindOfDoc : 'C',
                       loggined : 'Y',
                       id : 'admin'
        };
        request.app.render('index',context, function(err, html){ 
            response.end(html);
        });
    }, calendarCreate_process: (request, response) => {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var cal = qs.parse(body); db.query(`
                INSERT INTO calender (title, description, created, author_id) VALUES(?, ?, NOW(), 2)`,
                [cal.title, cal.description], function(error, result) { 
                    if(error) throw error;
                    response.writeHead(302, {Location: `/calendar`});
                    response.end();
            }); 
        });
    }, calendarList: function(request, response){
        var titleofcreate = 'Create';
        db.query(`SELECT * FROM calender`,
            function(error, result){
                if(error) throw error;
                tmplogin = 'Y';
                var context = {
                    doc: `./calendar/calendarList.ejs`,
                    loggined: 'Y',
                    id: 'admin',
                    results: result
                };
                request.app.render('index', context, function(error, html){
                    response.end(html);
                });
            }
        );
    }, calendarUpdate: function(request, response){
        var titleofcreate = 'Update';
        var planId = request.params.planId;
        db.query(`SELECT * FROM calender where id = ${planId} `,
            function(error, result) {
            if(error) throw error; 
                var context = {doc : `./calendar/calendarCreate.ejs`,
                            title : result[0].title,
                            description : result[0].description,
                            pId : planId,
                            kindOfDoc : 'U',
                            loggined : 'Y',
                            id : 'admin'
                };
                request.app.render('index',context, function(err, html){
                response.end(html); 
            });
        }); 
    }, calendarUpdate_process: function(request, response){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var plan = qs.parse(body);
            var planId = request.params.planId;
            db.query('UPDATE calender SET title=?, description=?, WHERE id=?',
                [plan.title, plan.description, planId], function(error, result){
                    response.writeHead(302, {Location: `/calendar`});
                    response.end();
                }
            );
        });
    }, calendarDelete_process: function(request, response){
        var planId = request.params.planId;
        db.query('DELETE FROM calender WHERE id=?', [planId], function(error, result){
            if(error) throw error;
            response.writeHead(302, {Location: `/calendar`});
            response.end();
        });
    }, namecardHome: (request, response)=>{
        db.query(`SELECT * FROM namecard`, function(error, result){
         if(error) throw error;
          tmplogin = 'Y';
          var context = {
              doc: `./namecard/namecard.ejs`,
              loggined: tmplogin,
              id: 'admin',
              results: result
          };
          request.app.render('index', context, function(err, html){
              response.end(html);
          });
        });
    }, namecardCreate: (request, response)=>{
        var titleofcreate = 'Create';
        var context = {doc : `./namecard/namecardCreate.ejs`,
                        name : '',
                        description : '',
                        kindOfDoc : 'C',
                        loggined : 'Y',
                        id : 'admin'};
        request.app.render('index',context, function(err, html){ 
            response.end(html);
        });
    }, namecardCreate_process: (request, response) => {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var nc = qs.parse(body); db.query(`
                INSERT INTO namecard (name, description) VALUES(?, ?)`,
                [nc.name, nc.description], function(error, result) { 
                    if(error) throw error;
                    response.writeHead(302, {Location: `/namecard`});
                    response.end();
            }); 
        });
    }, namecardList: function(request, response){
        var titleofcreate = 'Create';
        db.query(`SELECT * FROM namecard`,
            function(error, result){
                if(error) throw error;
                tmplogin = 'Y';
                var context = {
                    doc: `./namecard/namecardList.ejs`,
                    loggined: 'Y',
                    id: 'admin',
                    results: result
                };
                request.app.render('index', context, function(error, html){
                    response.end(html);
                });
            }
        );
    }, namecardUpdate: function(request, response){
        var titleofcreate = 'Update';
        var planId = request.params.planId;
        db.query(`SELECT * FROM namecard where id = ${planId} `,
            function(error, result) {
                if(error) throw error;
                var context = {doc : `./namecard/namecardCreate.ejs`,
                            name : result[0].name,
                            description : result[0].description,
                            pId : planId,
                            kindOfDoc : 'U',
                            loggined : 'Y',
                            id : 'admin'
                };
                request.app.render('index',context, function(err, html){
                response.end(html); 
            });
        }); 
    }, namecardUpdate_process: function(request, response){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var namecard = qs.parse(body);
            nId = request.params.nId;
            db.query('UPDATE namecard SET name=?, description=? WHERE id=?',
                [namecard.name, namecard.description, nId], function(error, result){
                    response.writeHead(302, {Location: `/namecard`});
                    response.end();
                }
            );
        });
    }, namecardDelete_process: function(request, response){
        var nId = request.params.nId;
        db.query('DELETE FROM namecard WHERE id=?', [nId], function(error, result){
            if(error) throw error;
            response.writeHead(302, {Location: `/namecard`});
            response.end();
        });
    }, userHome: (request, response)=>{
        db.query(`SELECT * FROM person`, function(error, result){
         if(error) throw error;
          tmplogin = 'Y';
          var context = {
              doc: `./user/user.ejs`,
              loggined: tmplogin,
              id: 'admin',
              results: result
          };
          request.app.render('index', context, function(err, html){
              response.end(html);
          });
        });
    }, userCreate: (request, response)=>{
        var titleofcreate = 'Create';
        var context = {doc : `./user/userCreate.ejs`,
                        loginid : '',
                        password : '',
                        name: '',
                        cls: '',
                        grade: '',
                        kindOfDoc : 'C',
                        loggined : 'Y',
                        id : 'admin'};
        request.app.render('index',context, function(err, html){ 
            response.end(html);
        });
    }, userCreate_process: (request, response) => {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var user = qs.parse(body); db.query(`
                INSERT INTO person (loginid, password, name, cls, grade) VALUES(?, ?, ?, ?, ?)`,
                [user.loginid, user.password, user.name, user.cls, user.grade], function(error, result) { 
                    if(error) throw error;
                    response.writeHead(302, {Location: `/user`});
                    response.end();
            }); 
        });
    }, userList: function(request, response){
        var titleofcreate = 'Create';
        db.query(`SELECT * FROM person`,
            function(error, result){
                if(error) throw error;
                tmplogin = 'Y';
                var context = {
                    doc: `./user/userList.ejs`,
                    loggined: 'Y',
                    id: 'admin',
                    results: result
                };
                request.app.render('index', context, function(error, html){
                    response.end(html);
                });
            }
        );
    }, userUpdate: function(request, response){
        var titleofcreate = 'Update';
        var planId = request.params.planId;
        db.query(`SELECT * FROM person where id = ${planId} `,
            function(error, result) {
                if(error) throw error;
                var context = {doc : `./user/userCreate.ejs`,
                            loginid : result[0].loginid,
                            password : result[0].password,
                            name : result[0].name,
                            cls : result[0].cls,
                            grade : result[0].grade,
                            pId : planId,
                            kindOfDoc : 'U',
                            loggined : 'Y',
                            id : 'admin'
                };
                request.app.render('index',context, function(err, html){
                response.end(html); 
            });
        }); 
    }, userUpdate_process: function(request, response){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var user = qs.parse(body);
            nId = request.params.nId;
            db.query('UPDATE person SET loginid=?, password=?, name=?, cls=?, grade=? WHERE id=?',
                [user.loginid, user.password, user.name, user.cls, user.grade, nId], function(error, result){
                    response.writeHead(302, {Location: `/user`});
                    response.end();
                }
            );
        });
    }, userDelete_process: function(request, response){
        var nId = request.params.nId;
        var loginid = request.params.loginid;
        db.query('DELETE FROM person WHERE id=?', [nId], function(error, result){
            if(error) throw error;
            response.writeHead(302, {Location: `/user`});
            response.end();
        });
    }
}