var connection = require('../connection');

function Musica() {
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select m.titulo, g.descricao as genero, m.url, u.nome from musicas m, usuarios u, generos g where m.idusuario = u.idusuario and g.idgenero = m.idgenero', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getMusicaPorId = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select m.titulo, g.descricao as genero, m.url, u.nome from musicas m, usuarios u, generos g where m.idusuario = u.idusuario and g.idgenero = m.idgenero and m.idmusica = ?',[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Musica não encontrada.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Musica não encontrada.'});
          }          
        }
      });
    });
  };

  this.getMusicasPorUsuario = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select m.titulo, g.descricao as genero, m.url, u.nome from musicas m, usuarios u, generos g where m.idusuario = u.idusuario and g.idgenero = m.idgenero and u.idusuario = ?',[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Musicas não encontradas.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Musicas não encontradas.'});
          }          
        }
      });
    });
  };

  this.create = function(musica, res) {
    connection.acquire(function(err, con) {
      con.query('insert into musicas values (0,?,?,?,?,?)', [musica.idsala,musica.idusuario,musica.titulo, musica.idgenero, musica.url], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Musica creation failed.' + err.message});
        } else {
          res.send({status: 0, message: 'Musica created successfully'});
        }
      });
    });
  };
  
  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('delete from musicas where idmusica = ?', [id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Failed to delete'});
        } else {
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
  };
}

module.exports = new Musica();
