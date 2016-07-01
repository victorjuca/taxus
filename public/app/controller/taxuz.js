var app = angular.module('taxuzModule', []);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('%%');
	$interpolateProvider.endSymbol('%%');
});



app.controller('taxuzController', ['$scope', '$http', function($scope, $http) {

		

}]);



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