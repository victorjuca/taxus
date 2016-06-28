var app = angular.module('eventoModule', []);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('%%');
	$interpolateProvider.endSymbol('%%');
});



app.controller('eventoCRUDController', ['$scope', '$http', function($scope, $http) {

	$scope.lanzamodal = function() {
		console.log('Ejecuta Modal');
		$('#myModal').modal('show');
	}

}]);

app.controller('eventoAdmonController', ['$scope', '$http', function($scope, $http)  {

	var tipoCrud = 0;

	$scope.lanzamodal = function() {
		$scope.nombreboton = 'Guardar';
		$('#myModal').modal('show');
	}
	$scope.modalActualizaEvento = function() {
		$scope.nombreboton = 'Actualizar';
		$('#myModal').modal('show');
	}	
	$scope.modalActualizaMensaje = function() {
		$('#modalActualizaMensaje').modal('show');
	}
	$scope.modalEliminarMensaje = function() {
		$('#modalEliminarMensaje').modal('show');
	}	

	$scope.guardarEvento = function(){
			$http({
				method: 'post',
				url: '/evento',
				data: $.param($scope.evento),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-CSRF-TOKEN': $scope.token
				}
			}).success(function(response) {
				mensaje = 'Se guardo correctamente.';
				defineMensaje(mensaje, true, $scope);
			}).error(function(response) {
				mensaje = "Ocurrio un error al tratar de guardar.";
				defineMensaje(mensaje, false, $scope);
			}); 	
	}
}]);

function defineMensaje(mensaje, tipo, scope) {

	if (tipo) {
		scope.estilo = 'alert alert-success fade in';
		scope.estado = 'Exito!! ';
	} else {
		scope.estado = 'Error!! ';
		scope.estilo = 'alert alert-danger fade in';
	}

	scope.mensajes = mensaje;
	scope.showmensaje = true;
}