const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/Question");

connection
  .authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((errMsg) => {
    console.log(errMsg);
  })


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render('index');
});

app.get("/ask", (req, res) => {
  res.render('ask');
});

app.post("/savequestion", (req,res) => {
  const question = {
    title: req.body.title,
    describe: req.body.describe
  };

  Question.create({
    title: question.title,
    describe: question.describe
  }).then(() => {
    res.redirect("/");
  });
  
});

app.listen(8080, () => {
   console.log("App rodando!"); 
});