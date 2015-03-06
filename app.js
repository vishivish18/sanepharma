var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

/////configure app


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

//////use middleware
app.use(bodyParser());
app.use(express.static(path.join(__dirname,'bower_components')));

////// define routes

var todoItems = [
            {id : 1, dsec: 'foo'},
            {id : 2, dsec: 'bar'},
            {id : 3, dsec: 'baz'}
            
        ];


app.get('/', function(req,res){
res.render('index',{

        title : 'My App Testing',
        items : todoItems

    });

});


app.get('/home', function(req,res){
res.render('home');

});

app.post('/add',function(req,res){
    var newItem = req.body.newItem;
    todoItems.push({
     id: todoItems.length +1,
     dsec : newItem
    });
    
    res.redirect('/');
});


app.listen(1337,function(){
    console.log('ready on 1337');

})
