var connection = require('../connection');

function Usuario() {
  
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select u.idusuario, u.nome, s.descricao as sala, u.ativo from usuarios u, salas s where u.idsala = s.idsala', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getUsuarioPorId = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select u.idusuario, u.nome, s.descricao as sala, u.ativo from usuarios u, salas s where u.idsala = s.idsala and u.idusuario = ?',[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Usuario não encontrada.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Usuario não encontrada.'});
          }          
        }
      });
    });
  };

  this.create = function(usuario, res) {
    connection.acquire(function(err, con) {
      con.query('insert into usuarios values (0,?,?,?)', [usuario.nome, usuario.idsala, usuario.ativo], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Usuario creation failed.' + err.message});
        } else {
          res.send({status: 0, message: 'Usuario created successfully'});
        }
      });
    });
  };

  this.update = function(id, usuario, res) {
    connection.acquire(function(err, con) {
      con.query('update usuarios set nome = ?, idsala = ?, ativo = ? where idusuario = ?', [usuario.nome, usuario.idsala, usuario.ativo, id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Usuario update failed'});
        } else {
          res.send({status: 0, message: 'Usuario updated successfully'});
        }
      });
    });
  };
  
  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('delete from usuarios where idusuario = ?', [id], function(err, result) {
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

module.exports = new Usuario();
