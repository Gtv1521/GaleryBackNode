import dotenv from 'dotenv'
dotenv.config();
   const database = {
        host: process.env.HOST, // || 'localhost',
       user: process.env.USER, // || 'root',
        password: process.env.PASS,//|| '1234',
        database: process.env.DATABASE //|| 'local'
    }

export default database