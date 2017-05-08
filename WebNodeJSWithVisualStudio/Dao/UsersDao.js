
var connectionProvider = require('./mySqlConnectionProvider.js');
var UsersDao = {

    getAllUsers : function (callback) {

        var connection = connectionProvider.mysqlConnectionProvider.getSqlConnection();
        
        var myUsers = [];
        var sqlStatement = "SELECT * FROM personaje";

        if (connection) {

            connection.query(sqlStatement, function (err, rows, fieds) {

                rows.forEach(function (row) {

                    myUsers.push(row);
                });

                callback(myUsers);
            });

        }

        connectionProvider.mysqlConnectionProvider.closeSqlConnection(connection);

    },

    insertUsers : function (name, apellido1, apellido2) {
        

        var connection = connectionProvider.mysqlConnectionProvider.getSqlConnection();

        var sqlStatement = "INSERT INTO personaje (nombre, apellido1, apellido2) VALUES ('" + name + "' , '" + apellido1 + "' , '" + apellido2 + "')";

        if (connection) {

            connection.query(sqlStatement, function (err, result) { 
                        
                if (err) {
                    throw err;
                } else {
                    console.log(result);
                }    
            });

        }

        connectionProvider.mysqlConnectionProvider.closeSqlConnection(connection);
    }


};

exports.UsersDao = UsersDao;