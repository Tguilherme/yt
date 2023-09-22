const express = require('express');

const {
  ytDonlodMp3,
  ytDonlodMp4
} = require("./yts");

const PORT = process.env.PORT || 2727;//8080 || 5000 || 3000;

let app = express();

 app.set("json spaces", 2);


app.get('/ytmp3', async(req, res, next) => {
  const url = req.query.url;
  if(!url) return res.send("Falta o link")
  ytDonlodMp3(url)
    .then((result) => {
      res.json({
        result
      })
    })
    .catch((error) => {
      console.log(error)
      res.send("sla deu erro")
    });
});

app.get('/ytmp4', async(req, res, next) => {
  const url = req.query.url;
  if(!url) return res.send("Falta o link")
  ytDonlodMp4(url)
    .then((result) => {
      res.json({
        result
      })
    })
          .catch(e => {
               res.send("sla deu erro")
});
});


 app.listen(PORT, (err) => {
   if (err) {
    console.log("Erro no servidor: " + PORT + "\n" + err);
   } else {
    console.log("Servidor rodando na porta: " + PORT);
   };
 });



