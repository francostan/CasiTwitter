const express = require('express');
const app = express(); 
//morgan es un middleware que nos permite ver las peticiones que se hacen al servidor
const morgan = require('morgan'); 
//------------------RUTAS------------------
const fs = require('fs')
const path = require('path')
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// para que persista el log en el archivo
//-----------------------------------------
//aqui ruteamos y desp consologueamos en app.listen list.list() para que nos devuelva el array de tweets
const tweetBank = require("./tweetBank");
app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream }))


app.use(morgan("tiny"));
app.get('/api/tweets', (req, res) => {
    res.send(tweetBank.list())
})
app.get('/api/users/:name', (req, res) => {
   const name = tweetBank.findAllMatch({name: req.params.name})
    res.send(name)
  });

app.get('/api/tweets/:id', (req, res) => {
    //habia que parsearlo number para que lo pase
    const tw = tweetBank.findOne(Number(req.params.id));
    res.send(tw);
});  
app.post('/api/tweets', (req, res) => {
    const name = req.body.name;
    const content = req.body.content;
    const imgURL = req.body.imgURL;
    const tweet = tweetBank.add(name, content, imgURL);
    res.send(tweet);
  });
  app.delete('/api/tweets/:id', (req, res) => {
    const del = tweetBank.remove(Number(req.params.id));
    res.send(del);
    });

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});