var db = require('./db.js');
var url = require('url');
var qs = require('querystring');

function authIsOwner(request, response){
    if(request.session.loggined){
        return true;
    }
    else{
        return false;
    }
}

module.exports = {
    home: (request, response)=>{
        db.query(`SELECT * FROM book`, function(error, result){
            var context = {
                doc: `./book/book.ejs`,
                results: result,
                loggined : authIsOwner(request, response),
                id: request.session.loginid,
                cls : request.session.cls,
                img: result[0].img,
                name : result[0].name,
                author : result[0].author,
                price : result[0].price,
            };
            request.app.render('index', context, function(err, html){
                response.end(html);
            });
        });
    },
    bookdetail: (request, response)=>{
        var bookId = request.params.bookId;
        db.query(`SELECT * FROM book where id=${bookId}`, function(error, result){
            var context = {
                doc: `./book/bookdetail.ejs`,
                loggined : authIsOwner(request, response),
                id: request.session.loginid,
                cls : request.session.cls,
                bId: bookId,
                img: result[0].img,
                name : result[0].name,
                author : result[0].author,
                price : result[0].price,
            };
            request.app.render('index', context, function(err, html){
                response.end(html);
            });
        });
    }, bookHome: function(request, response){
        db.query(`SELECT * FROM book`,
            function(error, result){
                if(error) throw error;
                var context = {
                    doc: `./book/bookList.ejs`,
                    loggined: authIsOwner(request, response),
                    id: request.session.loginid,
                    cls : request.session.cls,
                    results: result,
                    kindOfDoc : 'H',
                };
                request.app.render('index', context, function(error, html){
                    response.end(html);
                });
            }
        );
    }, bookList: function(request, response){
        db.query(`SELECT * FROM book`,
            function(error, result){
                if(error) throw error;
                var context = {
                    doc: `./book/bookList.ejs`,
                    loggined: authIsOwner(request, response),
                    id: request.session.loginid,
                    cls : request.session.cls,
                    results: result,
                    kindOfDoc : 'L',
                };
                request.app.render('index', context, function(error, html){
                    response.end(html);
                });
            }
        );
    }, bookCreate: (request, response)=>{
        var titleofcreate = 'Create';
        var context = {
            doc : `./book/bookCreate.ejs`,
            img: ' ',
            name : ' ',
            author : ' ',
            price : ' ',
            e_book: ' ',
            kindOfDoc : 'C',
            loggined: authIsOwner(request, response),
            id: request.session.loginid,
            cls : request.session.cls,
        };
        request.app.render('index',context, function(err, html){ 
            response.end(html);
        });
    }, bookCreate_process: (request, response) => {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var book = qs.parse(body); db.query(`
                INSERT INTO book (name, img, author, price, e_book) VALUES(?, ?, ?, ?, ?)`,
                [book.name, book.img, book.author, book.price, book.e_book], function(error, result) { 
                    if(error) throw error;
                    response.writeHead(302, {Location: `/`});
                    response.end();
            }); 
        });
    }, bookUpdate: function(request, response){
        var bookId = request.params.bookId;
        db.query(`SELECT * FROM book where id = ${bookId} `,
            function(error, result) {
            if(error) throw error; 
                var context = {
                    doc : `./book/bookCreate.ejs`,
                    name : result[0].name,
                    img : result[0].img,
                    author : result[0].author,
                    price : result[0].price,
                    e_book: result[0].e_book,
                    bId : bookId,
                    kindOfDoc : 'U',
                    loggined: authIsOwner(request, response),
                    id: request.session.loginid,
                    cls : request.session.cls,
                };
                request.app.render('index',context, function(err, html){
                response.end(html); 
            });
        }); 
    }, bookUpdate_process: function(request, response){
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var book = qs.parse(body);
            bookId = request.params.bookId;
            db.query('UPDATE book SET name=?, img=?, author=?, price=?, e_book=?, nation=? WHERE id=?',
                [book.name, book.img, book.author, book.price, book.e_book, 2, bookId], function(error, result) {
                response.writeHead(302, {Location: `/book`});
                response.end();
            }); 
        });
    }, bookDelete_process: function(request, response){
        var bookId = request.params.bookId;
        db.query('DELETE FROM book WHERE id=?', [bookId], function(error, result){
            if(error) throw error;
            response.writeHead(302, {Location: `/book`});
            response.end();
        });
    }, calendarHome: (request, response)=>{
        db.query(`SELECT * FROM calender`, function(error, result){
        if(error) throw error;
            var context = {
                doc: `./calendar/calendar.ejs`,
                loggined: authIsOwner(request, response),
                id: request.session.loginid,
                cls : request.session.cls,
                results: result
            };
            request.app.render('index', context, function(err, html){
                response.end(html);
            });
        });
    }, calendarCreate: (request, response)=>{
        var titleofcreate = 'Create';
        var context = {
            doc : `./calendar/calendarCreate.ejs`,
            title : '',
            description : '',
            kindOfDoc : 'C',
            loggined: authIsOwner(request, response),
            id: request.session.loginid,
            cls : request.session.cls,
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
                var context = {
                    doc: `./calendar/calendarList.ejs`,
                    loggined: authIsOwner(request, response),
                    id: request.session.loginid,
                    cls : request.session.cls,
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
                var context = {
                    doc : `./calendar/calendarCreate.ejs`,
                    title : result[0].title,
                    description : result[0].description,
                    pId : planId,
                    kindOfDoc : 'U',
                    loggined: authIsOwner(request, response),
                    id: request.session.loginid,
                    cls : request.session.cls,
                };
                request.app.render('index',context, function(err, html){
                response.end(html); 
            });
        }); 
    }, calendarUpdate_process: function(request, response){
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var plan = qs.parse(body);
            planId = request.params.planId;
            db.query('UPDATE calender SET title=?, description=?, author_id=? WHERE id=?',
                [plan.title, plan.description, 2, planId], function(error, result) {
                response.writeHead(302, {Location: `/calendar`});
                response.end();
            }); 
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
          var context = {
                doc: `./namecard/namecard.ejs`,
                loggined: authIsOwner(request, response),
                id: request.session.loginid,
                cls : request.session.cls,
                results: result
          };
          request.app.render('index', context, function(err, html){
              response.end(html);
          });
        });
    }, namecardCreate: (request, response)=>{
        var titleofcreate = 'Create';
        var context = {
            doc : `./namecard/namecardCreate.ejs`,
            name : '',
            description : '',
            kindOfDoc : 'C',
            loggined: authIsOwner(request, response),
            id: request.session.loginid,
            cls : request.session.cls,
        };
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
                var context = {
                    doc: `./namecard/namecardList.ejs`,
                    loggined: authIsOwner(request, response),
                    id: request.session.loginid,
                    cls : request.session.cls,
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
                var context = {
                    doc : `./namecard/namecardCreate.ejs`,
                    name : result[0].name,
                    description : result[0].description,
                    pId : planId,
                    kindOfDoc : 'U',
                    loggined: authIsOwner(request, response),
                    id: request.session.loginid,
                    cls : request.session.cls,
                };
                request.app.render('index',context, function(err, html){
                response.end(html); 
            });
        }); 
    }, namecardUpdate_process: function(request, response){
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var namecard = qs.parse(body);
            nameId = request.params.nameId;
            db.query('UPDATE namecard SET name=?, description=?, updateid=? WHERE id=?',
                [namecard.name, namecard.description, 2, nameId], function(error, result) {
                response.writeHead(302, {Location: `/namecard`});
                response.end();
            }); 
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
          var context = {
                doc: `./user/user.ejs`,
                loggined: authIsOwner(request, response),
                id: request.session.loginid,
                cls : request.session.cls,
                results: result
          };
          request.app.render('index', context, function(err, html){
              response.end(html);
          });
        });
    }, userCreate: (request, response)=>{
        var titleofcreate = 'Create';
        var context = {
            doc : `./user/userCreate.ejs`,
            loginid : '',
            password : '',
            name: '',
            cls: '',
            grade: '',
            kindOfDoc : 'C',
            loggined: authIsOwner(request, response),
            id: request.session.loginid,
            cls : request.session.cls,
        };
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
                    loggined: authIsOwner(request, response),
                    id: request.session.loginid,
                    cls : request.session.cls,
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
                var context = {
                    doc : `./user/userCreate.ejs`,
                    loginid : result[0].loginid,
                    password : result[0].password,
                    name : result[0].name,
                    cls : result[0].cls,
                    grade : result[0].grade,
                    pId : planId,
                    kindOfDoc : 'U',
                    loggined: authIsOwner(request, response),
                    id: request.session.loginid,
                    cls : request.session.cls,
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
    }, register: function(request, response){
        db.query(`SELECT * FROM person`, function(error, result){
            if(error) throw error;
             var context = {
                    doc: `./register.ejs`,
                    loggined: authIsOwner(request, response),
                    id: request.session.loginid,
                    cls : request.session.cls,
                    loginid : '',
                    password : '',
                    name: '',
                    address: '',
                    tel: '',
                    birth: '',
                    results: result,
             };
             request.app.render('index', context, function(err, html){
                 response.end(html);
             });
           });
    }, register_process: function(request, response){
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var user = qs.parse(body); db.query(`
                INSERT INTO person (loginid, password, name, address, tel, birth) VALUES(?, ?, ?, ?, ?, ?)`,
                [user.loginid, user.password, user.name, user.address, user.tel, user.birth], function(error, result) { 
                    if(error) throw error;
                    response.writeHead(302, {Location: `/login`});
                    response.end();
            }); 
        });
    }, pwchange: function(request, response){
        db.query(`SELECT * FROM person`,
            function(error, result){
                if(error) throw error;
                var context = {
                    doc: `./pwChange.ejs`,
                    loggined: authIsOwner(request, response),
                    id: request.session.loginid,
                    cls : request.session.cls,
                    password : '',
                    results: result,
                };
                request.app.render('index', context, function(error, html){
                    response.end(html);
                });
            }
        );
    }, change_process: function(request, response){
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var person = qs.parse(body);
            id = request.session.loginid
            db.query('UPDATE person SET password=?, grade=? WHERE loginid=?',
                [person.password, 5, id], function(error, result) {
                response.writeHead(302, {Location: `/calendar`});
                response.end();
            }); 
        });
    },
}