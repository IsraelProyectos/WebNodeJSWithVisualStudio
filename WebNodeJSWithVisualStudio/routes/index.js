
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Express', year: new Date().getFullYear() });
};

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Contacto' });
};

exports.UsersList = function (req, res) {
    
    var usersDao = require('../Dao/UsersDao.js');

    usersDao.UsersDao.getAllUsers(function (myUsers) {
        
        console.log(myUsers);
        res.render('UsersList', {
        
          myUsers : myUsers
         
        });
    
    });
    
};

exports.InsertUser = function (req, res) {

    res.render('InsertUser', { year: new Date().getFullYear(), message: 'INTRODUCE UN NUEVO USUARIO' , messageNombreNull: '', messageApellido1Null: '', messageApellido2Null: ''});
    
   
};
