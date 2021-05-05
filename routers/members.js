const express = require('express');
const mysql = require('mysql');
const pw = require('../secret/passwords.js');

const router = express.Router();

const db = mysql.createConnection({
	host: 'localhost',
	user:'root',
	password: pw.databasePassword,
	database: 'mydb'
});

//register form
router.get('/', function(req,res){
	res.send('test');
})

//register
router.post('/', function(req,res){
	
	var name = req.name||'Stranger';
	var age = req.age||0;
	
	var params = [req.body.id, req.body.pw, req.body.nickname, req.body.email, name, age ];
	
	var queryData = "INSERT INTO user_info(userID, password, nickname, email, name, age) VALUES(?,?,?,?,?,?)";
	db.query(queryData, params, function(err, rows){
		if(err){
			console.log(err);
		}
		else{
			//아이디가 중복되는지 체크하기
		}
	})
})




module.exports = router;