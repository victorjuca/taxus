var app = angular.module('taxuzModule', []);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('%%');
	$interpolateProvider.endSymbol('%%');
});



app.controller('taxuzController', ['$scope', '$http', function($scope, $http) {


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


		var list = ['first blurb', 'second blurb', 'third blurb']; // list of blurbs

		var txt = $('#txtlzr'); // The container in which to render the list

		var options = {
			duration: 10000, // Time (ms) each blurb will remain on screen
			rearrangeDuration: 1000, // Time (ms) a character takes to reach its position
			effect: 'random', // Animation effect the characters use to appear
			centered: true // Centers the text relative to its container
		}

		txt.textualizer(ldescripcion, options); // textualize it!
		txt.textualizer('start'); // start

		//alertify.success('Se cargaron correctamente los mensajes del evento.');
	}).error(function(response) {
		alertify.error("Ocurrió un error al tratar de cargar los mensajes del evento.");
	});

}