var app = angular.module('app',[]);
app.controller('radioController', function($scope,$http,$rootScope){
		
	$http.get('http://localhost:8080/musicas').
    success(function(datamusica) {
        $scope.musicas = datamusica;
        $scope.firstToRun = $scope.musicas[0].url;
        
        var playList = '';
        for (var i = 1; i < $scope.musicas.length; i++) {
			playList += ',' + $scope.musicas[i].url;
        };
    
        $scope.lista = playList;
    
    });

	$scope.getMusicas = function(){ 
		console.log("Musica: " + $scope.selecao);		
		$http.get('http://localhost:8080/musicas').
			success(function(datamusica){
        		$scope.musicas = datamusica;
			})
			.error(function(datamusica){
				alert("Error...");
				console.log(datamusica);
			});
	}

	$scope.getMusicaPorId = function(selecao){ 
		console.log("Musica: " + $scope.selecao);
		$rootScope.idMusica = $scope.selecao;
		$http.get('http://localhost:8080/musicas/' + $scope.selecao ).
			success(function(datamusica){
        		$scope.musicas = datamusica;
        		console.log($scope.musicas);
			})
			.error(function(datamusica){
				alert("Error...");
				console.log(datamusica);
			}); 
	}

	$scope.trazRespostasPorQuestao = function(idQuestao){ 
		console.log("Questao: " + $rootScope.idQuestao);
		$http.get('http://localhost:8080/questoes/' + idQuestao + '/respostas').
			success(function(dataresp){
        		$scope.respostas = dataresp;
        		console.log($scope.respostas);
			})
			.error(function(dataresp){
				alert("Error...");
				console.log(dataresp);
			}); 
	}

	$scope.responder = function(usuario, idquestao, idresposta){ 
		console.log("Questao: " + $scope.idquestao);
		$http.post('http://localhost:8080/respusers/').
			success(function(dataresp){
        		$scope.respostas = dataresp;
        		console.log($scope.respostas);
			})
			.error(function(dataresp){
				alert("Error...");
				console.log(dataresp);
			}); 
	}

}); 