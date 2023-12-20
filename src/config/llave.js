import dotenv from 'dotenv'
dotenv.config();

console.log(process.env.HOST, process.env.USER1, process.env.PORTDB, process.env.PASS, process.env.DATABASE)
   const database = {
       host: process.env.HOST || 'localhost',
       user: process.env.USER1 || 'gustavo',
    //    port: process.env.PORTDB || 3306,
       password: process.env.PASS || '1234',
       database: process.env.DATABASE || 'dataImagenes'
    }

export default database