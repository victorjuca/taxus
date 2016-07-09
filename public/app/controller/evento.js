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


	//adminSocket();
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


		}

	}

	$scope.eliminaEvento = function() {

		alertify.confirm("¿Deseas eliminar el evento?", function(e) {
			if (e) {
				$http({
					method: 'DELETE',
					url: '/evento/' + $scope.evento.id,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-CSRF-TOKEN': $scope.token
					}
				}).success(function(response) {

					mensaje = 'Se elimino el mensaje correctamente.';
					alertify.success(mensaje);
					$scope.evento = '';
					cargaEventos($scope, $http);
				}).error(function(response) {
					mensaje = 'Ocurrio un error al eliminar el mensaje.';
					alertify.error(mensaje);
				});
			}
		});
	}



	$scope.modalCrudMensaje = function(eventoid, opc) {
		$('#modalCrudMensaje').modal('show');

		if (opc === 1) {
			$scope.nombreBotonMensaje = 'Guardar';
		} else if (opc === 2) {
			$scope.nombreBotonMensaje = 'Actualizar';
		}
		$scope.opcMensaje = opc;
		$scope.eventoid = eventoid;
	}


	$scope.eliminaMensaje = function(mensajeCRUD) {

		alertify.confirm("¿Deseas eliminar el mensaje?", function(e) {
			if (e) {
				$http({
					method: 'DELETE',
					url: '/mensaje/' + mensajeCRUD.id,
					//data: $.param($scope.calendario),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-CSRF-TOKEN': $scope.token
					}
				}).success(function(response) {
					mensaje = 'Se elimino correctamente.';
					alertify.success(mensaje);
					cargarMenesajes($scope, $http, mensajeCRUD.eventoid);
				}).error(function(response) {
					mensaje = "Ocurrio un error al tratar de eliminar.";
					alertify.error(mensaje);
				});
			}
		});
	}



	$scope.agregaMensaje = function(descripcion,eventoid, opc) {

		if(!validaVacion(eventoid)) {
			alertify.error("Debes seleccionar un evento.");
			return;

		}
		if (!validaMensaje(descripcion)) {
			return;
		}

		$scope.mensaje = {};


		$scope.mensaje.fecha = getFechaActual();
		$scope.mensaje.hora = getHoraActual();
		$scope.mensaje.eventoid = eventoid;
		$scope.mensaje.descripcion = descripcion;


		$http({
			method: 'post',
			url: '/mensaje',
			data: $.param($scope.mensaje),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'X-CSRF-TOKEN': $scope.token
			}
		}).success(function(response) {

			var retorno =  response.retorno;

			if(retorno.estado == 0){
				alertify.success(retorno.descripcion);			
			}else{
				alertify.error(retorno.descripcion);				
				document.getElementById("mensaje").value = '';
			}

			cargarMenesajes($scope, $http, eventoid);
			$scope.mensaje ='';
		}).error(function(response) {
			alertify.error("Ocurrió un error al agregar el mensaje.");
		})
	}
	var mensajeActualiza;
	$scope.modalActualizaMensaje = function(mensaje) {
		$('#modalCrudMensaje').modal('show');
		document.getElementById("mensajeActualiza").value = mensaje.descripcion;
		mensajeActualiza = mensaje;
	}

	$scope.actualizaMensaje = function() {
		$scope.mensaje = mensajeActualiza;

		var descripcion = document.getElementById("mensajeActualiza").value;

		$scope.mensaje.descripcion = descripcion; 


		if (!validaMensaje(descripcion)) {
			return;
		}

		$http({
			method: 'put',
			url: '/mensaje/' + $scope.mensaje.id,
			data: $.param($scope.mensaje),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'X-CSRF-TOKEN': $scope.token
			}
		}).success(function(response) {
			alertify.success("Se actualizó correctamente el mensaje.");
			$('#modalCrudMensaje').modal('hide');
			cargarMenesajes($scope, $http,  $scope.mensaje.eventoid);
			document.getElementById("mensaje").value ='';
			$scope.mensaje = '';
		}).error(function(response) {
			alertify.error("Ocurrió un error al actualizar el mensaje.");
		})
	}

	$scope.cargaMensajeEvento = function(eventoid) {

		cargarMenesajes($scope, $http, eventoid);

	}

	$scope.reiniciaContMensaje = function(eventoid){
		alertify.confirm("¿Deseas reiniciar los contadores de los mensjes?", function(e) {
			if (e) {
			$http({
				method: 'get',
				url: '/restcontmensaje/' + eventoid,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-CSRF-TOKEN': $scope.token
				}
			}).success(function(response) {
				mensaje = 'Se reiniciarón los contadores correctamente.';
				alertify.success(mensaje);			
				cargarMenesajes($scope, $http, eventoid);
			}).error(function(response) {
				mensaje = 'Ocurrió un error al reiniciar los contadores.';
				alertify.error(mensaje);			
				cargarMenesajes($scope, $http, eventoid);
			});
			}
		});
	}

}]);

function validaMensaje(mensaje) {

	
	if (!validaVacion(mensaje)) {
		alertify.error("El Mensaje se encuentra vacío");
		return false;
	}

	if (mensaje.length < 5) {
		alertify.error("El mensaje debe de tener más de 5 caracteres.");
		return false;
	}

	if (mensaje.length > 200) {
		alertify.error("El mensaje no debe de tener más de 200 caracteres.");
		return false;
	}
	return true;
}

function getFechaActual() {
	var hoy = new Date();
	var dd = hoy.getDate();
	var mm = hoy.getMonth() + 1; //hoy es 0!
	var yyyy = hoy.getFullYear();

	if (dd < 10) {
		dd = '0' + dd
	}

	if (mm < 10) {
		mm = '0' + mm
	}

	hoy = yyyy + '-' + mm + '-' + dd;

	return hoy;
}

function getHoraActual() {
	var d = new Date();

	var hora = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

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
		alertify.error("Ocurrió un error al tratar de cargar los eventos.");
	});
}


function cargarMenesajes(scope, http, eventoid) {
	http({
		method: 'GET',
		url: '/mensaje/' + eventoid,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-CSRF-TOKEN': scope.token
		}
	}).success(function(response) {
		scope.lmensaje = response;
		//alertify.success('Se cargaron correctamente los mensajes del evento.');
	}).error(function(response) {
		alertify.error("Ocurrió un error al tratar de cargar los mensajes del evento.");
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

function cierraMensaje(scope) {
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




function adminSocket(){

    var host = 'ws://127.0.0.1:9000';
    try {
        socket = new WebSocket(host);
        
        //Manages the open event within your client code
        socket.onopen = function () {
            console.log('Conección Abierta con ' + host);
            return;
        };
        //Manages the message event within your client code
        socket.onmessage = function (msg) {
            console.log('Mensaje Admin: '+msg.data);
            return;
        };
        //Manages the close event within your client code
        socket.onclose = function () {
            console.log('Conección Cerrada con ' + host);
            return;
        };
    } catch (e) {
        console.log(e);
    }	
}

function cuenta(){ 
      	document.forms[0].caracteres.value=document.forms[0].texto.value.length 
} 