var connection = require('../connection');

function Genero() {
  
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select idgenero, descricao from generos', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getGeneroPorId = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select idgenero, descricao from generos where idgenero = ?',[id], function(err, result) {
        con.release();
        if(err) {
          res.send({status: 1, message: 'Genero não encontrada.'});
        } else {
          if(result.length > 0) {
            res.send(result);
          } else {
            res.send({status: 1, message: 'Genero não encontrada.'});
          }          
        }
      });
    });
  };

  this.create = function(genero, res) {
    connection.acquire(function(err, con) {
      con.query('insert into generos values (0,?)', [genero.descricao], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Genero creation failed.' + err.message});
        } else {
          res.send({status: 0, message: 'Genero created successfully'});
        }
      });
    });
  };
  
  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('delete from generos where idgenero = ?', [id], function(err, result) {
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

module.exports = new Genero();
