const express = require("express");
const app = express();



app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render('index');
});

app.get("/ask", (req, res) => {
  res.render('ask');
});

app.post("/savequestion", (req,res) => {
  res.send("Received form");
})

app.listen(8080, () => {
   console.log("App rodando!"); 
});