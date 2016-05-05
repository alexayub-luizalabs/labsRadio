var connection = require('../connection');

function Sala() {
  
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select idsala, descricao from salas', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getSalaPorId = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select idsala, descricao from salas where idsala = ?',[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Sala não encontrada.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Sala não encontrada.'});
          }          
        }
      });
    });
  };

  this.getUsuariosPorSala = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select u.*, s.descricao from usuarios u, salas s where u.idsala = s.idsala and s.idsala = ?',[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Usuarios não encontradas.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Usuarios não encontradas.'});
          }          
        }
      });
    });
  };

  this.create = function(sala, res) {
    connection.acquire(function(err, con) {
      con.query('insert into salas values (0,?)', [sala.descricao], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Sala creation failed.' + err.message});
        } else {
          res.send({status: 0, message: 'Sala created successfully'});
        }
      });
    });
  };
  
  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('delete from salas where idsala = ?', [id], function(err, result) {
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

module.exports = new Sala();
