var musica = require('./models/musicas');
var sala = require('./models/salas');
var genero = require('./models/generos');
var usuario = require('./models/usuarios');

module.exports = {
  configure: function(app) {
    
    //musicas
    app.get('/musicas/', function(req, res) {
      musica.get(res);
    });

    app.get('/musicas/:id', function(req, res) {
      musica.getMusicaPorId(req.params.id,res);
    });

    app.get('/musicas/:id/usuario', function(req, res) {
      musica.getMusicasPorUsuario(req.params.id,res);
    });

    app.post('/musicas/', function(req, res) {
      musica.create(req.body, res);
    });

    app.delete('/musicas/:id/', function(req, res) {
      musica.delete(req.params.id, res);
    });

    //salas
    app.get('/salas/', function(req, res) {
      sala.get(res);
    });

    app.get('/salas/:id', function(req, res) {
      sala.getSalaPorId(req.params.id,res);
    });

    app.get('/salas/:id/usuarios', function(req, res) {
      sala.getUsuariosPorSala(req.params.id,res);
    });
    
    app.post('/salas/', function(req, res) {
      sala.create(req.body, res);
    });

    app.delete('/salas/:id/', function(req, res) {
      sala.delete(req.params.id, res);
    });

    //generos
    app.get('/generos/', function(req, res) {
      genero.get(res);
    });

    app.get('/generos/:id', function(req, res) {
      genero.getGeneroPorId(req.params.id,res);
    });
    
    app.post('/generos/', function(req, res) {
      genero.create(req.body, res);
    });

    app.delete('/generos/:id/', function(req, res) {
      genero.delete(req.params.id, res);
    });

    //usuarios
    app.get('/usuarios/', function(req, res) {
      usuario.get(res);
    });

    app.get('/usuarios/:id', function(req, res) {
      usuario.getUsuarioPorId(req.params.id,res);
    });
    
    app.put('/usuarios/:id', function(req, res) {
      usuario.update(req.params.id, req.body, res);
    });

    app.post('/usuarios/', function(req, res) {
      usuario.create(req.body, res);
    });

    app.delete('/usuarios/:id/', function(req, res) {
      usuario.delete(req.params.id, res);
    });


  }
};
