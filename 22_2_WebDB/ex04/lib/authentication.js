var db = require('./db');
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
    login: function(request, response){
        var subdoc;
        if (authIsOwner(request, response) === true){
            subdoc = 'book.ejs';
        }
        else {
            subdoc = 'login.ejs';
        }
        var context = {
            doc : subdoc,
            loggined : authIsOwner(request, response),
            loginid : request.session.loginid,
            cls : request.session.cls
        };
        request.app.render('index',context, function(err, html){
            response.end(html); 
        })
    },
    login_process: function(request, response){
        var body = '';
        request.on('data', function(data) { 
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`SELECT loginid, password, cls FROM person WHERE loginid = ? and password = ?` ,
                [post.id, post.pw], function(error, result) {
                if(error) throw error; 
                if(result[0] === undefined) response.end('Who ?');
                else{
                    request.session.loggined = true; 
                    request.session.loginid = result[0].loginid; 
                    request.session.cls = result[0].cls; 
                    response.redirect('/'); 
                    response.end('Welcome !!!');
                } 
            }); 
        });
    },
    logout: function(request, response){
        request.session.destroy(function(error){
            response.redirect('/');
        });
    }
}