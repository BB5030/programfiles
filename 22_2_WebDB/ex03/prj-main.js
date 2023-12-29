const express = require('express');
const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var db = require('./lib/db.js');
var etc = require('./lib/etc.js');
var auth = require('./lib/authentication');
var session = require('express-session');
var MySqlStore = require('express-mysql-session')(session);

var options = {
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database: 'webdb2022'
}
var sessionStore = new MySqlStore(options);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

app.get('/login', function(request, response){
    auth.login(request, response);
});
app.post('/login_process', function(request, response){
    auth.login_process(request, response);
});
app.get('/logout', function(request, response){
    auth.logout(request, response);
});
app.get('/register', function(request, response){
    etc.register(request, response);
});
app.post('/register_process', function(request, response){
    etc.register_process(request, response);
})
app.get('/pwchange', function(request, response){
    etc.pwchange(request, response);
})
app.post('/change_process', function(request, response){
    etc.change_process(request, response);
})
app.get('/', function(request, response){
    etc.home(request, response);
});
app.get('/book', function(request, response){
    etc.bookHome(request, response);
});
app.get('/book/list', function(request, response){
    etc.bookList(request, response);
});
app.get('/bookdetail/:bookId', function(request, response){
    etc.bookdetail(request, response);
});
app.get('/book/create', function(request, response){
    etc.bookCreate(request, response);
});
app.post('/book/create_process', function(request, response){
    etc.bookCreate_process(request, response);
});
app.get('/book/update/:bookId', function(request, response){
    etc.bookUpdate(request, response);
});
app.post('/book/update_process/:bookId', function(request, response){
    etc.bookUpdate_process(request, response);
});
app.get('/book/delete_process/:bookId', function(request, response){
    etc.bookDelete_process(request, response);
});
app.get('/calendar', function(request, response){
    etc.calendarHome(request, response);
});
app.get('/calendar/create', function(request, response){
    etc.calendarCreate(request, response);
});
app.post('/calendar/create_process', function(request, response){
    etc.calendarCreate_process(request, response);
});
app.get('/calendar/list', function(request, response){
    etc.calendarList(request, response);
});
app.get('/calendar/update/:planId', function(request, response){
    etc.calendarUpdate(request, response);
});
app.post('/calendar/update_process/:planId', function(request, response){
    etc.calendarUpdate_process(request, response);
});
app.get('/calendar/delete_process/:planId', function(request, response){
    etc.calendarDelete_process(request, response);
});
app.get('/namecard', function(request, response){
    etc.namecardHome(request, response);
});
app.get('/namecard/create', function(request, response){
    etc.namecardCreate(request, response);
});
app.post('/namecard/create_process', function(request, response){
    etc.namecardCreate_process(request, response);
});
app.get('/namecard/list', function(request, response){
    etc.namecardList(request, response);
});
app.get('/namecard/update/:planId', function(request, response){
    etc.namecardUpdate(request, response);
});
app.post('/namecard/update_process/:planId', function(request, response){
    etc.namecardUpdate_process(request, response);
});
app.get('/namecard/delete_process/:planId', function(request, response){
    etc.namecardDelete_process(request, response);
});
app.get('/user', function(request, response){
    etc.userHome(request, response);
});
app.get('/user/create', function(request, response){
    etc.userCreate(request, response);
});
app.post('/user/create_process', function(request, response){
    etc.userCreate_process(request, response);
});
app.get('/user/list', function(request, response){
    etc.userList(request, response);
});
app.get('/user/update/:planId', function(request, response){
    etc.userUpdate(request, response);
});
app.post('/user/update_process/:planId', function(request, response){
    etc.userUpdate_process(request, response);
});
app.get('/user/delete_process/:planId', function(request, response){
    etc.userDelete_process(request, response);
});
app.use(express.static('public'));
app.listen(3000, ()=> console.log('example'))