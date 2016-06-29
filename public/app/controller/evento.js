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

app.controller('eventoAdmonController', ['$scope', '$http', function($scope, $http) {

	var tipoCrud = 0;
	cargaEventos($scope, $http);
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

	$scope.guardarEvento = function() {

		if (!valida($scope)) {
			return;
		}

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
			$scope.evento = '';
		}).error(function(response) {
			mensaje = "Ocurrio un error al tratar de guardar.";
			defineMensaje(mensaje, false, $scope);
		});
	}
}]);

function cargaEventos(scope, http) {
	http({
		method: 'GET',
		url: '/getallevento',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-CSRF-TOKEN': scope.token
		}
	}).success(function(response) {
		scope.levento = response;
	}).error(function(response) {

	});
}

function valida(scope) {

	scope.estado = 'Error';
	scope.estilo = 'alert alert-danger fade in';
	scope.showmensaje = true;

	var nombre = document.getElementById("nombre").value;
	var clave = document.getElementById("clave").value;

	if (!validaVacion(clave)) {
		nombreCampo = 'Clave';
		scope.mensajes = 'El campo ' + nombreCampo + ', es necesario';
		return false;
	}

	if (!validaVacion(nombre)) {
		nombreCampo = 'Nombre';
		scope.mensajes = 'El campo ' + nombreCampo + ', es necesario';
		return false;
	}

	return true;
}

function validaVacion(valor) {
	if (valor == '' || typeof valor == "undefined") {
		return false;
	}
	return true;
}

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