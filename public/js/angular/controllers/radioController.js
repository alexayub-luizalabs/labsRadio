var app = angular.module('app',[]);
app.controller('radioController', function($scope,$http,$rootScope){

    $http.get(BASE_URL + '/musicas').
    success(function(datamusica) {
        
        if(datamusica.length > 0) {
            $scope.musicas = datamusica;        
            $scope.firstToRun = $scope.musicas[0].url;
            $scope.usuario = $scope.musicas[0].nome;
            $scope.sala = $scope.musicas[0].sala;
            $scope.genero = $scope.musicas[0].genero;
            $scope.titulo = $scope.musicas[0].titulo;
        }
        
    });

    $scope.getMusicas = function(){
        console.log("Musica: " + $scope.selecao);
        $http.get(BASE_URL + '/musicas').
            success(function(datamusica){
                $scope.musicas = datamusica;
            })
            .error(function(datamusica){
                alert("Error...");
                console.log(datamusica);
            });
    }

    $scope.apagarMusicaAtual = function(){
        $http.delete(BASE_URL + '/musicas/' + $scope.firstToRun).
        success(function (datamusica) {
            console.log('Apagou');
        });
    }

    $scope.getMusicaPorId = function(selecao){
        console.log("Musica: " + $scope.selecao);
        $rootScope.idMusica = $scope.selecao;
        $http.get(BASE_URL + '/musicas/' + $scope.selecao ).
            success(function(datamusica){
                $scope.musicas = datamusica;
                console.log($scope.musicas);
            })
            .error(function(datamusica){
                alert("Error...");
                console.log(datamusica);
            });
    }
    

});
