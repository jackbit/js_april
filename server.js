var express = require('express.io'),
    Clustrap = require('clustrap'),
    app = express(),
    httpOptions = { 
      workers: 1, 
      port: 3000,
      sock: './tmp/sockets/app.sock'
    },
    environment = process.env.NODE_ENV || 'development';

app.http().io();
app.use(express.compress());
app.use(express.static(__dirname + '/../public/', { maxAge: 2592000000 }));

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ 
    secret: 'lorem ipsum',
    cookie: { maxAge: 36000 }
}));
app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');

app.get('/', function(req, res, next){
  res.send('I am '+environment);
})

var service = new Clustrap(app, httpOptions);
service.listen();

