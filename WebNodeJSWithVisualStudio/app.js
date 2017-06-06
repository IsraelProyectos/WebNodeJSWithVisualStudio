
/**
 * Module dependencies.
 */

var express = require('express');
var expressValidator = require('express-validator');
var assert_request = require('assert-request');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var userDao = require('./Dao/UsersDao.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator);
app.use(assert_request);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.get('/', routes.UsersList);
//app.get('/about', routes.about);
//app.get('/contact', routes.contact);
app.get('/UsersList', routes.UsersList);
app.get('/InsertUser', routes.InsertUser);

app.get('/InsertUser', function (req, res) {
    res.render('InsertUser', {
        title: 'Ejemplo de validación de formulario',
        message: '',
        errors: {}
    });
});

app.post('/signup', function (req, res) {
    
    
    
    //req.assert('name', 'El campo nombre es requerido').notEmpty();
    //req.assert('apellido1', 'El campo email es requerido').notEmpty();
    //req.assert('apellido2', 'El campo email es requerido').notEmpty();

    var name = req.body.name;
    var apellido1 = req.body.apellido1;
    var apellido2 = req.body.apellido2;
    
    if ((name === '') && (apellido1 === '') && (apellido2 === '')) {
        
        //body.nombreSpan.contentText = 'faltan campos';
        //res.body.nombreSpan.send('faltan campos');
        //console.log('faltan campos');
        //res.name.send('hola');
        res.render('InsertUser', {
            messageNombreNull: "",
            msgNombre: ' El campo Nombre no puede estar vacio', 
            msgApellido1: ' El campo Primer Apellido no puede estar vacio', 
            msgApellido2: ' El campo Segundo Apellido no puede estar vacio',
            year: new Date().getFullYear(), message: 'Introduce un nuevo usuario'
        });
    }else if ((apellido1 === '') && (name === '')) {
        
        res.render('InsertUser', {
            msgNombre: ' El campo Nombre no puede estar vacio', 
            msgApellido1: ' El campo Primer Apellido no puede estar vacio', 
            //msgApellido2: ' El campo Segundo Apellido no puede estar vacio',
            year: new Date().getFullYear(), message: 'Introduce un nuevo usuario'
        });
    }else if ((apellido2 === '') && (name === '')) {
        
        res.render('InsertUser', {
            messageNombreNull: "",
            msgNombre: ' El campo Nombre no puede estar vacio', 
            //msgApellido1: ' El campo Primer Apellido no puede estar vacio', 
            msgApellido2: ' El campo Segundo Apellido no puede estar vacio',
            year: new Date().getFullYear(), message: 'Introduce un nuevo usuario'
        });
    }else if ((apellido2 === '') && (apellido1 === '')) {
        
        res.render('InsertUser', {
            messageNombreNull: name, 
            msgApellido1: ' El campo Primer Apellido no puede estar vacio', 
            msgApellido2: ' El campo Segundo Apellido no puede estar vacio',
            year: new Date().getFullYear(), message: 'Introduce un nuevo usuario'
        });
    }else if ((apellido2 === '')) {
        
        res.render('InsertUser', {
            //msgNombre: ' El campo Nombre no puede estar vacio', 
            //msgApellido1: ' El campo Primer Apellido no puede estar vacio', 
            msgApellido2: ' El campo Segundo Apellido no puede estar vacio',
            year: new Date().getFullYear(), message: 'Introduce un nuevo usuario'
        });
    
    } else if ((name === '')) {
        
        res.render('InsertUser', {
            msgNombre: ' El campo Nombre no puede estar vacio', 
            //msgApellido1: ' El campo Primer Apellido no puede estar vacio', 
            //msgApellido2: ' El campo Segundo Apellido no puede estar vacio',
            year: new Date().getFullYear(), message: 'Introduce un nuevo usuario'
        });
    
    } else if ((apellido1 === '')) {
        
        res.render('InsertUser', {
            //msgNombre: ' El campo Nombre no puede estar vacio', 
            msgApellido1: ' El campo Primer Apellido no puede estar vacio', 
            //msgApellido2: ' El campo Segundo Apellido no puede estar vacio',
            year: new Date().getFullYear(), message: 'Introduce un nuevo usuario'
        });         
    } else {

       userDao.UsersDao.insertUsers(name, apellido1, apellido2);
    }

    //var errors = req.validationErrors();
    //if (!errors) {
    //    res.render('InsertUser', {
    //        title: 'Validacion de Formulario',
    //        message: '',
    //        errors: {}
    //    });
        
    res.render('InsertUser', { year: new Date().getFullYear(), message: 'Introduce un nuevo usuario', messageNombreNull: "" });
    
       
    //}
    //else {
    //    res.render('InsertUser', {
    //        title: 'Validacion de formulario con error',
    //        message: 'No se han rellenado los campos requeridos',
    //        errors: errors
    //    });
    //}

    
    //res.render('UsersList', { year: new Date().getFullYear(), message: 'Lista de usuarios'});
         
});



//app.post('/InsertUser', function (req, res) {

//    req.assert('name', 'El campo nombre es requerido').notEmpty();    
//    req.assert('apellido1', 'El campo email es requerido').notEmpty();
//    req.assert('apellido2', 'El campo email es requerido').notEmpty();
//    var errors = req.validationErrors();
//    if (!errors) { 
//        res.render('InsertUser', {
//            title: 'Validacion de Formulario',
//            message: '',
//            errors: {}
//        });
       
//    }
//    else {  
//        res.render('InsertUser', {
//            title: 'Validacion de formulario con error',
//            message: 'No se han rellenado los campos requeridos',
//            errors: errors
//        });
//    }
//});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
