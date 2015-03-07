var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

/////configure app


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

//////use middleware
app.use(bodyParser());
app.use(express.static(path.join(__dirname,'bower_components')));




////// define routes

app.get('/', function(req,res){
res.render('index',{

        title : 'My App Testing',
        items : todoItems

    });

});


app.get('/login', function(req,res){
res.render('login');

});

app.get('/home', function(req,res){
res.render('home');

});


app.get('/add-product', function(req,res){
res.render('add_product');

});

app.get('/search-product', function(req,res){
res.render('search_product');

});


app.get('/add-manufacturer', function(req,res){
res.render('add_manufacturer');

});



app.post('/add',function(req,res){
    var newItem = req.body.newItem;
    todoItems.push({
     id: todoItems.length +1,
     dsec : newItem
    });
    
    res.redirect('/');
});

mongoose.connect("mongodb://localhost:27017/sanetestdb", function(err, db) {
      if(!err) {
        console.log("We are connected");
        
        
      }
    });

var Schema = mongoose.Schema;
var productSchema = new Schema({
pcode : String,
pname : String,
ppacking : String,
pcompany : String,
psalestax : String,
pdiscount : String,   
pboxsize : String,    
ppurchase : String, 
pmrp : String
    
});

var products = mongoose.model('products', productSchema);



app.post('/addproducts',function(req,res,next){
    var pcodevar = req.body.pcode;
    var pnamevar = req.body.pname;
    var ppackingvar = req.body.ppacking;
    var pcompanyvar = req.body.pcompany;
    var psalestaxvar = req.body.psalestax;
    var pdiscountvar = req.body.pdiscount;
    var pboxsizevar = req.body.pboxsize;
    var ppurchasevar = req.body.ppurchase;
    var pmrpvar = req.body.pmrp;
    
    var savedproduct = new products({
        pcode : pcodevar,
        pname : pnamevar,
        ppacking : ppackingvar,
        pcompany : pcompanyvar,
        psalestax : psalestaxvar,
        pdiscount : pdiscountvar,   
        pboxsize : pboxsizevar,    
        ppurchase : ppurchasevar, 
        pmrp : pmrpvar
    

        });

        savedproduct.save(function (err, data) {
        if (err) console.log(err);
        else console.log('Saved : ', data );
        res.redirect('/add-product');
        });

        
        
});






app.listen(1337,function(){
    console.log('ready on 1337');

})
