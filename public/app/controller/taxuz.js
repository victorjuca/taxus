var app = angular.module('taxuzModule', []);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('%%');
	$interpolateProvider.endSymbol('%%');
});



app.controller('taxuzController', ['$scope', '$http', function($scope, $http) {

	//socket();

	var eventoid = document.getElementById("eventoid").value;

	cargarMenesajes($scope, $http, eventoid);

}]);

var arreglo;

		var options = {
			duration: 250, // Time (ms) each blurb will remain on screen
			rearrangeDuration: 250, // Time (ms) a character takes to reach its position
			effect: 'random', // Animation effect the characters use to appear
			centered: true // Centers the text relative to its container
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

		var lmensaje = response;
		var ldescripcion = [];

		for (x = 0; x < lmensaje.length; x++) {
			var mensaje = lmensaje[x];
			ldescripcion.push(mensaje.descripcion);
		}


		reiniciaMensaje(ldescripcion,scope, http)
		//alertify.success('Se cargaron correctamente los mensajes del evento.');
	}).error(function(response) {
		alertify.error("Ocurrió un error al tratar de cargar los mensajes del evento.");
	});

}


function reiniciaMensaje(ldescripcion,scope, http){
		var noMensajes = 1; // Numero de mensajes que se ejecutaran antes de traer mas
		var contRepr = 1; // Contador de repeticiones.
		var lmensajes = new Array(); // Lista de mensajes guardados.

		var txt = $('#txtlzr'); // The container in which to render the list
		txt.textualizer(ldescripcion, options); // textualize it!
		txt.textualizer('start'); // start
		txt.on('textualizer.changed', function(event, args) {

			lmensajes.push(ldescripcion[args.index]);

			if(noMensajes == contRepr){

				/**
				 * Envia los mensajes para ponerle el contador de visto.
				*/
				scope.contmensaje = {};

				scope.contmensaje.lmensaje = lmensajes;
				scope.contmensaje.eventoid = eventoid;
				scope.contmensaje.fecha = getFechaActual();
				scope.contmensaje.hora = getHoraActual();

				http({
					method: 'put',
					url: '/cuentamensaje',
					data: $.param(scope.contmensaje),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-CSRF-TOKEN': scope.token
					}
				}).success(function(response) {


					/**
					 Recarga los mensajes ordenados.
					*/
					var lmensajer = response;

					var ldescr = {}; 

					for (x = 0; x < lmensaje.length; x++) {
						var mensaje = lmensaje[x];
						ldescr.push(mensaje.descripcion);
					}					
					reiniciaMensaje(ldescr,scope, http);
				});
				contRepr = 0;
				lmensajes = new Array();


			}

			contRepr++;

		});
}

function socket() {
	var host = 'ws://127.0.0.1:9000';
	var socket = null;
	try {
		socket = new WebSocket(host);

		//Manages the open event within your client code
		socket.onopen = function() {
			console.log('Conección Abierta con ' + host);
			return;
		};
		//Manages the message event within your client code
		socket.onmessage = function(msg) {
			console.log('Mensaje Taxuz: ' + msg.data);
			return;
		};
		//Manages the close event within your client code
		socket.onclose = function() {
			console.log('Conección Cerrada con ' + host);
			return;
		};
	} catch (e) {
		console.log(e);
	}
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