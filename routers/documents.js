const express = require('express');
const mysql = require('mysql');
const pw = require('../config/passwords.js');



const router = express.Router();

const db = mysql.createConnection({
	host: 'localhost',
	user:'root',
	password: pw.databasePassword,
	database: 'mydb'
});

//글 작성
router.post('/',(req, res)=>{
	if(true){
		var doc = {
		title : req.body.title,
		desc : req.body.desc, //description
		writer: req.body.writer
	}
	var queryData = "INSERT INTO doc_info(title, userID, description, datetime) VALUES (?,?,?,NOW())";
	db.query(queryData, [doc.title, doc.writer, doc.writer],
		(err, rows)=>{
			if(err){
				console.log(err);
			}
			else{
				res.sendStatus(200);
			}
		
	})
	}
	else{
		res.sendStatus(404);
	}
	
	
})

//글 목록보기(query에서 page를 받아서 한페이지당 5개씩 글을 보여줌)
router.get('/lists',(req,res)=>{
	var page = parseInt(String(req.query.page).trim());
	var forPaging = (page-1)*5; //데이터베이스에서 몇번째 부터 가져올건지 정하는 변수
	
	queryData = "SELECT title, userID, datetime FROM doc_info LIMIT 5 OFFSET " + String(forPaging);
	db.query(queryData, (err, rows)=>{
		if(err){
			console.log(err);
		}
		else{
			res.send(rows);
		}
	})
})


//글 삭제(나중에 회원이 맞을때만 글 삭제 요청하는거 구현)
router.delete('/deletedoc', (req,res)=>{
	var docId = req.body.docID;
	var queryData = "DELETE FROM doc_info WHERE docID=?";
	
	db.query(queryData, [docId], (err, rows)=>{
		if(err){
			console.log(err);
		}
		else{
			res.sendStatus(200);
		}
	})
	
})

//글 수정(나중에 회원이 맞을때만 글 수정 가능하게 구현)
router.put('/revicedoc', (req,res)=>{
	var queryData = "SELECT title, description FROM doc_info WHERE docID=?";
	var docID = req.body.docID;
	db.query(queryData, [docID], (err, rows)=>{
		if(err){
			console.log(err);
		}
		else{
			if(rows.length){
				var docu = {
					title : req.body.title||rows[0].title,
					description: req.body.desc||rows[0].description
				}
				queryData = "UPDATE doc_info SET title=?, description=?, datetime=NOW() WHERE docID=?";
				db.query(queryData, [docu.title, docu.description, docID], (err, rows)=>{
					if(err){
						console.log(err);
					}
					else{
						res.sendStatus(200);
					}
					
				})
				
			}
			else{
				res.sendStatus(404);
			}
			
		}
	})
})

module.exports = router;