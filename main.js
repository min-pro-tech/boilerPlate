const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const membersRouter = require('./routers/members.js');

const portNum = 3000;


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/members', membersRouter);

app.listen(portNum, ()=>{
	console.log('server is running..');
})