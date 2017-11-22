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
        .withMessage('First Name is required')
], (req, res, next) => {
    var errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
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