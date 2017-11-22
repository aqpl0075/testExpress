var express = require('express');
var bodyParser = require('body-parser');
var path = require('path'); //file path
var { check, validationResult } = require('express-validator/check');
var app = express();

/*
//call the Middleware before getting to home
//middle ware
var logger = function(req, res, next){
    console.log('logging...');
    next();
}
//call middleware
app.use(logger);
*/

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Global vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});
/*
//static resource file
//Set static path -- this overwrite from app
app.use(express.static(path.join(__dirname, 'public')));
*/

//json data for res.json
var people = [
    {
        name: 'Angie',
        age: 30
    },
    {
        name: 'Sara',
        age: 22
    },
    {
        name: 'Bill',
        age: 40
    }
]

var users = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@gmail.com'
    },
    {
        id: 2,
        first_name: 'Amy',
        last_name: 'Smith',
        email: 'amysmith@gmail.com'
    },
    {
        id: 3,
        first_name: 'Jill',
        last_name: 'Jackson',
        email: 'jjackson@gmail.com'
    }
]

//get to home -- render view from server
app.get('/', function(req, res){
    //res.json(people);
    //res.send('Hello World!');

    res.render('index', {
        title: 'Customers',
        users: users
    });
});

/*
app.post('/users/add', function(req, res){
    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }
    console.log(req.body.first_name);
    console.log(newUser);
});
*/

//Use Express validator
app.post('/users/add', [
    check('first_name')
        .isLength({ min: 5 })
        .withMessage('First Name is required'),
    check('last_name')
        .isLength({ min: 5 })
        .withMessage('Last Name is required'),
    check('email')
        .isLength({ min: 5 })
        .withMessage('Email is required')
], (req, res, next) => {
    var theErrors = validationResult(req);
    
    if (!theErrors.isEmpty()) {
        res.render('index', {
            title: 'Customers',
            users: users,
            errors: theErrors.mapped()
        });
        
        // console.log(theErrors.mapped());
        // var aTest = theErrors.mapped();
        // Object.keys(aTest).forEach(function(key,index){
        //     console.log('key is ' + key);
        //     console.log('index is ' + index);
        //     console.log('Level 2 key is ' + aTest[key].msg);
        // });
    }
    else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        console.log(req.body.first_name);
        console.log(newUser);
    }
  });


app.listen(3000, function(){
    console.log('Server started on port 3000...');
});