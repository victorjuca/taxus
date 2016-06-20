var app = angular.module('eventoModule', []);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('%%');
	$interpolateProvider.endSymbol('%%');
});



app.controller('eventoCRUDController', ['$scope', function($scope) {

	$scope.lanzamodal = function() {
		console.log('Ejecuta Modal');
		$('#myModal').modal('show');
	}

}]);

app.controller('eventoAdmonController', ['$scope', function($scope) {

	$scope.lanzamodal = function() {
		$('#myModal').modal('show');
	}
	$scope.modalActualizaMensaje = function() {
		$('#modalMensaje').modal('show');
	}
}]);