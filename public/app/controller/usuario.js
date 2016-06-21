var app = angular.module('usuarioModule', []);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('%%');
	$interpolateProvider.endSymbol('%%');
});



app.controller('loginController', ['$scope', function($scope) {

	$scope.mostramodalrecuperacuenta = function() {
		$('#modalRecuperaCuenta').modal('show');
	}

}]);

app.controller('crearUsuarioController', ['$scope', function($scope) {

}]);

