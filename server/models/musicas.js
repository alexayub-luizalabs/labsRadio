var connection = require('../connection');

function Musica() {
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query("select m.idmusica, m.titulo, g.descricao as genero, m.url, u.nome, s.descricao as sala, m.data from musicas m, usuarios u, generos g, salas s where m.idusuario = u.idusuario and g.idgenero = m.idgenero and u.idsala = s.idsala and date_format(m.data,'%d/%m/%Y') = date_format(sysdate(),'%d/%m/%Y')", function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getMusicaPorId = function(id, res) {
    connection.acquire(function(err, con) {
      con.query("select m.idmusica, m.titulo, g.descricao as genero, m.url, u.nome, s.descricao as sala, m.data from musicas m, usuarios u, generos g, salas s where m.idusuario = u.idusuario and g.idgenero = m.idgenero and u.idsala = s.idsala and date_format(m.data,'%d/%m/%Y') = date_format(sysdate(),'%d/%m/%Y') and m.idmusica = ?",[id], function(err, result) {
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
      con.query("select m.idmusica, m.titulo, g.descricao as genero, m.url, u.nome, s.descricao as sala, m.data from musicas m, usuarios u, generos g, salas s where m.idusuario = u.idusuario and g.idgenero = m.idgenero and u.idsala = s.idsala and date_format(m.data,'%d/%m/%Y') = date_format(sysdate(),'%d/%m/%Y') and u.idusuario = ?",[id], function(err, result) {
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

  this.getMusicasPorSala = function(id, res) {
    connection.acquire(function(err, con) {
      con.query("select m.idmusica, m.titulo, g.descricao as genero, m.url, u.nome, s.descricao as sala, m.data from musicas m, usuarios u, generos g, salas s where m.idusuario = u.idusuario and g.idgenero = m.idgenero and u.idsala = s.idsala and date_format(m.data,'%d/%m/%Y') = date_format(sysdate(),'%d/%m/%Y') and s.idsala = ?",[id], function(err, result) {
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
      con.query('insert into musicas values (0,?,?,?,?,?,sysdate())', [musica.idsala,musica.idusuario,musica.idgenero,musica.titulo,musica.url], function(err, result) {
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
      con.query('delete from musicas where url = ?', [id], function(err, result) {
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
