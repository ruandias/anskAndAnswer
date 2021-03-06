const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/Question");
const Answer = require("./database/Answer");


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
  Question.findAll({ raw: true, order:[
    ['id','DESC']
  ]}).then(questions => {
    res.render('index', {
      questions: questions
    });
  });

});

app.get("/ask", (req, res) => {
  res.render('ask');
});

app.get("/ask/:id", (req, res) => {
  const id = req.params.id;
  Question.findOne({
    where: {id: id}
  }).then(question => {
    if(question != undefined){

      Answer.findAll({
        where: {questionId: question.id},
        order: [
          ['id', 'DESC']
        ]
      }).then(answers => {
        res.render("question", {
          question: question,
          answers: answers
        });
      });
    } else {
      res.redirect("/");
    }
  });
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

app.post("/answer", (req,res) => {
  const answerBody = req.body.answerBody;
  const questionId = req.body.question;
  Answer.create({
    answerBody: answerBody,
    questionId: questionId
  }).then(() => {
    res.redirect(`/ask/${questionId}`);
  });
});

app.listen(8080, () => {
   console.log("App rodando!"); 
});