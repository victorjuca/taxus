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



		var txt = $('#txtlzr'); // The container in which to render the list

		var options = {
			duration: 10000, // Time (ms) each blurb will remain on screen
			rearrangeDuration: 1000, // Time (ms) a character takes to reach its position
			effect: 'random', // Animation effect the characters use to appear
			centered: true // Centers the text relative to its container
		}

		txt.textualizer(ldescripcion, options); // textualize it!
		txt.textualizer('start'); // start
		txt.on('textualizer.changed', function(event, args) {
			// check if it's the last index in the array
			if (args.index === LAST_INDEX) {
				txt.textualizer('pause');
			}
		});
		//alertify.success('Se cargaron correctamente los mensajes del evento.');
	}).error(function(response) {
		alertify.error("Ocurrió un error al tratar de cargar los mensajes del evento.");
	});

}



function siguientex() {
	var txt = $('#txtlzr'); // The container in which to render the list	
	txt.on('textualizer.changed', function(event, args) {
		// check if it's the last index in the array
		if (args.index === LAST_INDEX) {
			txt.textualizer('pause');
		}
	});

	txt.textualizer('start');
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