// Carrega as variaveis de ambiente do arquivo .env
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var app = express();

const dbConnection = require('./config/database');
dbConnection()

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/******************************* ROTAS *********************************************/
const glossary = require('./routes/glossary');
const user = require('./routes/user');
const assessment = require('./routes/assessment');
const question_group = require('./routes/question_group');
const question = require('./routes/question');
const answer = require('./routes/answer');

app.use('/glossary', glossary);
app.use('/user', user);
app.use('/assessment', assessment);
app.use('/question-group', question_group);
app.use('/question', question);
app.use('/answer', answer);





/***********************************************************************************/
module.exports = app;
