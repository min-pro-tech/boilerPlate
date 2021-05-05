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
router.post('/register', function(req,res){
	var id = req.body.id;
	var queryData = "SELECT * FROM user_info WHERE userID = ?";
	
	//먼저 아이디가 존재하는지 확인한다.
	db.query(queryData,[id], (err, rows) =>{
		if(err){
			console.log(err);
		}
		else{
			if(rows.length){
				res.send("이미 존재하는 아이디입니다.");
			}
			else{
				//아이디가 존재하지 않는다면 회원가입
				var Body = req.body;
				var name = Body.name||'Stranger';
				var age = Body.age||0;

				var paramData = [Body.id, Body.pw, Body.nickname, Body.email, name, age ];

				var queryData = "INSERT INTO user_info(userID, password, nickname, email, name, age) VALUES(?,?,?,?,?,?)";
				db.query(queryData, paramData,(err, rows)=>{
				if(err){
					console.log(err);
				}
				else{
					res.send("회원가입 성공하셨습니다!");
				}
	})
			}
		}
	} )
	
})

//정보 조회
router.get('/see', (req,res)=>{
	var userID = req.query.id;
	var queryData = "SELECT * FROM user_info WHERE userID = ?";
	db.query(queryData, [userID], (err, rows)=>{
		if(err){
			console.log(err);
		}
		else{
			if(rows.length){
				var User = {
				id : rows[0].userID,
				pw : rows[0].password,
				nickname: rows[0].nickname,
				email: rows[0].email,
				name: rows[0].name,
				age : rows[0].age
				}
				var strUser = JSON.stringify(User);
			
				res.send(strUser);	
			}
			else{
				res.send('아이디를 찾을 수 없습니다.');
			}
		}
		
	})
})

//정보 일부 수정(나중에 구현)

module.exports = router;