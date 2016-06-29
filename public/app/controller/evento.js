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
		tipoCrud = 1;
	}

	$scope.modalActualizaEvento = function(evento) {
		$scope.evento = evento;
		$scope.nombreboton = 'Actualizar';
		$('#myModal').modal('show');
		tipoCrud = 2;
	}

	$scope.modalEliminaEvento = function(evento) {
		$scope.evento = evento;
		$scope.nombreboton = 'Eliminar';
		$('#myModal').modal('show');
		tipoCrud = 3;
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
		if (tipoCrud === 1) {

			//Guardar

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
				cargaEventos($scope, $http);
				cierraMensaje($scope);
			}).error(function(response) {
				mensaje = "Ocurrio un error al tratar de guardar.";
				defineMensaje(mensaje, false, $scope);
			});
		} else if (tipoCrud === 2) {
			//Actualizar

			$http({
				method: 'put',
				url: '/evento/' + $scope.evento.id,
				data: $.param($scope.evento),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-CSRF-TOKEN': $scope.token
				}
			}).success(function(response) {
				mensaje = 'Se actualizo correctamente el evento.';
				defineMensaje(mensaje, true, $scope);
				cargaEventos($scope, $http);
				cierraMensaje($scope);
			}).error(function(response) {
				mensaje = 'Ocurrio un error al actualizar.';
				defineMensaje(mensaje, false, $scope);
			});
		} else if (tipoCrud === 3) {

			var isConfirmDelete = confirm('¿Estas seguro de eliminar el mensaje?');

			if (isConfirmDelete) {
				$http({
					method: 'DELETE',
					url: '/evento/' + $scope.evento.id,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-CSRF-TOKEN': $scope.token
					}
				}).success(function(response) {

					mensaje = 'Se eliminoo el mensaje correctamente.';
					defineMensaje(mensaje, true, $scope);
					$scope.evento = '';
					cargaEventos($scope, $http);
					cierraMensaje($scope);
				}).error(function(response) {
					mensaje = 'Ocurrio un error al eliminar el mensaje.';
					defineMensaje(mensaje, false, $scope);
				});
			}

		}

	}

	$scope.crudMensaje = function() {
		if (tipoCrud === 1) {
			$http({
				method: 'post',
				url: '/mensaje',
				data: $.param($scope.mensaje),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-CSRF-TOKEN': $scope.token
				}
			}).success(function(response) {
				alert('Se guardo el mensaje.');
			}).error(function(response) {
				alert('Error al guardar.');
			});
		} else {

			var mensajeid = $scope.mensajeid;
			$http({
				method: 'put',
				url: '/mensaje/' + mensajeid,
				data: $.param($scope.mensaje),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-CSRF-TOKEN': $scope.token
				}
			}).success(function(response) {
				alert('Se actualiz el mensaje.');
			}).error(function(response) {
				alert('Error al actualizar.');
			});
		}
	}


	$scope.eliminar = function() {

		var eventoid = $scope.eventoid;
		if (typeof eventoid == "undefined") {
			alert('Seleccione un evento.');
			return;
		}

		var isConfirmDelete = confirm('¿Estas seguro de eliminar el evento?');

		if (isConfirmDelete) {


			$http({
				method: 'DELETE',
				url: '/evento/' + eventoid,
				//data: $.param($scope.calendario),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-CSRF-TOKEN': $scope.token
				}
			}).success(function(response) {
				mensaje = 'Se elimino correctamente.';
				defineMensaje(mensaje, false, $scope);
				cargaEventos($scope, $http);
				cierraMensaje($scope);
			}).error(function(response) {
				mensaje = "Ocurrio un error al tratar de eliminar.";
				defineMensaje(mensaje, false, $scope);
			});
		}
	};

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
function cierraMensaje(scope){
	scope.mensajes = '';
	scope.showmensaje = false;
}