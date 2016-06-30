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
		cierraMensaje($scope);		
	}

	$scope.modalActualizaEvento = function(evento) {
		$scope.evento = evento;
		$scope.nombreboton = 'Actualizar';
		$('#myModal').modal('show');
		tipoCrud = 2;
		cierraMensaje($scope);
	}

	$scope.modalEliminaEvento = function(evento) {
		$scope.evento = evento;
		$scope.nombreboton = 'Eliminar';
		$('#myModal').modal('show');
		tipoCrud = 3;
		cierraMensaje($scope);
	}

	$scope.modalCrudMensaje = function(opc) {
		$('#modalCrudMensaje').modal('show');

		if(opc === 1){
			$scope.nombreBotonMensaje = 'Guardar';
		}else if(opc === 2){
			$scope.nombreBotonMensaje = 'Actualizar';
		}
		$scope.opcMensaje = opc;
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
				defineMensajeEvento(mensaje, true, $scope);
				$scope.evento = '';
				cargaEventos($scope, $http);
			}).error(function(response) {
				mensaje = "Ocurrio un error al tratar de guardar.";
				defineMensajeEvento(mensaje, false, $scope);
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
				defineMensajeEvento(mensaje, true, $scope);
				cargaEventos($scope, $http);
			}).error(function(response) {
				mensaje = 'Ocurrio un error al actualizar.';
				defineMensajeEvento(mensaje, false, $scope);
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

					mensaje = 'Se elimino el mensaje correctamente.';
					defineMensajeEvento(mensaje, true, $scope);
					$scope.evento = '';
					cargaEventos($scope, $http);
				}).error(function(response) {
					mensaje = 'Ocurrio un error al eliminar el mensaje.';
					defineMensajeEvento(mensaje, false, $scope);
				});
			}

		}

	}

	$scope.crudMensaje = function(opc) {
		if (opc === 1) {

			$scope.mensaje.fecha = getFechaActual();
			$scope.mensaje.hora = getHoraActual();
			console.log($scope.mensaje);
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
		} else if(opc === 2) {

			$http({
				method: 'put',
				url: '/mensaje/' + mensajeObj.id,
				data: $.param(mensaje),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-CSRF-TOKEN': $scope.token
				}
			}).success(function(response) {
				alert('Se actualiz el mensaje.');
			}).error(function(response) {
				alert('Error al actualizar.');
			});
		}else if(opc === 3){
			var isConfirmDelete = confirm('¿Estas seguro de eliminar el evento?');

			if (isConfirmDelete) {


				$http({
					method: 'DELETE',
					url: '/evento/' + mensajeObj.id,
					//data: $.param($scope.calendario),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-CSRF-TOKEN': $scope.token
					}
				}).success(function(response) {
					mensaje = 'Se elimino correctamente.';
					defineMensajeEvento(mensaje, false, $scope);
					cargaEventos($scope, $http);
					cierraMensaje($scope);
				}).error(function(response) {
					mensaje = "Ocurrio un error al tratar de eliminar.";
					defineMensajeEvento(mensaje, false, $scope);
				});
			}
		}
	}

}]);

function getFechaActual(){
	var hoy = new Date();
	var dd = hoy.getDate();
	var mm = hoy.getMonth()+1; //hoy es 0!
	var yyyy = hoy.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	hoy = yyyy+'-'+mm+'-'+dd;

	return hoy;	
}

function getHoraActual(){
	var d = new Date(); 

	var hora = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();

	return hora;
}
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

function defineMensajeEvento(mensaje, tipo, scope) {

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


function defineMensajeMensaje(mensaje, tipo, scope) {

	if (tipo) {
		scope.estiloMensaje = 'alert alert-success fade in';
		scope.estadoMensaje = 'Exito!! ';
	} else {
		scope.estadoMensaje = 'Error!! ';
		scope.estiloMensaje = 'alert alert-danger fade in';
	}

	scope.mensajes = mensaje;
	scope.showmensaje = true;
}