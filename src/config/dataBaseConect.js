// importamos las librerias de uso para la app 
import mysql from 'mysql2'
import { promisify } from 'util'

// hacemos llamado a los datos de llave de la base 
import  database  from './llave.js'

const pool = mysql.createPool(database)
// creamos la conexion a la base
pool.getConnection((err, connection) => {
    if (err) {
        // si nos da error que lo espesifique
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('DATABASE CONNECTION WAS CLOSED');
        }

        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        }

        if (err.code === 'ECONNREFUSED') {
            console.log('DATABASE CONNECTIONS WAS REFUSED');
        }
    }
    // conexion exitosa con la base de datos
    if (connection){
        connection.release();
    } 
    console.log('Database is connected');
    return;
});

pool.query = promisify(pool.query);

export default pool; 