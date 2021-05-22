require('dotenv').config();

module.exports = {
	"development" : {
    username: "root",
    password: "111111",
    database: "mydb",
    host: "127.0.0.1",
    dialect: "mysql"
  },
 	"production" : {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
	host: process.env.DATABASE_HOST,
    dialect: "mysql"
  }


}
 