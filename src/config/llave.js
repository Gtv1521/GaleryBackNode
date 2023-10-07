import dotenv from 'dotenv'
dotenv.config();
   const database = {
       host: process.env.HOST || 'localhost',
       port: process.env.PORTDB || 3306,
       user: process.env.USER || 'gustavo',
       password: process.env.PASS || '1234',
       database: process.env.DATABASE || 'dataImagenes'
    }

export default database