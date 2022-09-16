const express = require('express');
//nos dara todas las funcionalidades
const router = express.Router();
//requerimos tweetBank
const tweetBank = require("../tweetBank"); //usamos dos puntos porque estamos en la carpeta routes, y queremos subir a la carpeta


//usamos el middleware express.json para parsear lo que nos llega al post como un objeto de JS
//CAMBIOS TODAS LAS APP.GET POR ROUTER.GET ETC

router.use(express.json());
router.use(morgan('combined', { stream: accessLogStream }))

//usamos la version tiny de morgan, nos menciona mensajes basicos de metodos y rutas, etc
//cada vez que requesteamos al local host 8080, se va a ejecutar el middleware morgan y mostrar en consola el mensaje
router.use(morgan("tiny"));

//OMITIMOS EL / DE LAS RUTAS, YA QUE LO AGREGAMOS EN EL APP.JS
//como devolvemos un valor, usamos metodo get, generamos la ruta y luego el callback
//nos devuelve la lista de tweets como response
router.get('/tweets', (req, res) => {
    res.send(tweetBank.list())
})

//cuando cliquemos sobre el nombre del usuario, nos va a devolver el usuario y sus tweets
router.get('/users/:name', (req, res) => {
  //traemos el nombre del usuario desde el req.params, pero como ya viene en formato string, no hace falta parsearlo
  //req.params solo nos devuelve toda la ruta, por eso indicamos que queremos el nombre
   const name = tweetBank.findAllMatch({name: req.params.name})
    res.send(name)
  });

//generamos la ruta para que cuando cliquemos un tweet, nos devuelva el tweet con el id que le pasamos por ruta
router.get('/tweets/:id', (req, res) => {
    //habia que parsearlo number para que lo pase
    //el req.params es un objeto que tiene todos los parametros que le pasamos por ruta, en este caso el id
    //debemos parsearlo a number porque lo que nos llega es un string
    const tw = tweetBank.findOne(Number(req.params.id));
    res.send(tw);
});  
//creamos una ruta para crear un tweet, usamos el metodo post
//sabemos que la info nos va a estar llegando en el req (request), mas especificamente en el metodo body de req
//esto que nos llega hay que convertirlo en un objeto de javascript, para eso usamos el metodo json de express
router.post('/tweets', (req, res) => {
  //como el objeto viene parseado gracias a express.json, podemos acceder a sus propiedades (name, content,img)
    //const name = req.body.name;
    //const content = req.body.content;
    //const imgURL = req.body.imgURL;
    //desestructuramos el objeto que nos llega
    //es menos codigo y mas prolijo, tendremos las variables name, content y imgURL de req.body en el scope
    const {name, content, imgURL} = req.body;
    const tweet = tweetBank.add(name, content, imgURL);
    //por convencion deberiamos devolver un 201(created) en vez de un 200(ok)
    res.status(201).send(tweet);
  });


  router.delete('/tweets/:id', (req, res) => {
    //guardamos el id
    const id = Number(req.params.id);
    //buscamos el tweet con el id que nos llega, remove recibe un objeto tweet
    const tweet = tweetBank.findOne(id);
     //si existe, lo borramos y lo guardamos en del, posteriormente devolvemos el response
     const del = tweetBank.remove(tweet);
    res.status(202).send(del);
    });

    //exportamos el router
    module.exports = router;