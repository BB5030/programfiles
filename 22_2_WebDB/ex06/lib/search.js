var db = require('./db');
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

module.exports ={
    book_search: function(request, response){
        var body = '';
        var post = qs.parse(body);
        if(post){
            db.query(`SELECT * FROM book where name like ?`, [`%${post.keyword}%`],
                function(error, result) {
                if(error) throw error; 
                var context = {
                    doc: `./search.ejs`,
                    kind: 'Book Search',
                    loggined : authIsOwner(request, response),
                    results: result,
                    id: request.session.loginid,
                    cls : request.session.cls,
                    listyn: 'Y',
                };
                request.app.render('index',context, function(err, html){
                    response.end(html); 
                });
            }); 
        }
        else{
            var context={
                doc: `./search.ejs`,
                    kind: 'Book Search',
                    loggined : authIsOwner(request, response),
                    results: result,
                    id: request.session.loginid,
                    cls : request.session.cls,
                    listyn: 'N',
            }
            request.app.render('index',context, function(err, html){
                response.end(html); 
            });
        }
    },
}