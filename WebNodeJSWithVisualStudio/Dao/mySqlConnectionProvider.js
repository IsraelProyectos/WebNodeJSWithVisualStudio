var mysql = require('mysql');
var mysqlConnectionString = require('./mySqlConnectionString.js');

var mysqlConnectionProvider = {

    getSqlConnection : function () {


        var connection = mysql.createConnection(mysqlConnectionString.mySqlConnectionString.connectionString);
        connection.connect(function (error) {

            if (error) { throw error }
            console.log("Conexion MySQL abierta correctamente!!!");

        });

        return connection;

    },

    closeSqlConnection : function (currentConnection) {

        currentConnection.end(function (error) {

            if (error) { throw error }
            console.log("Conexion MySQL cerrada correctamente!!!");
        });

    }

};

exports.mysqlConnectionProvider = mysqlConnectionProvider;