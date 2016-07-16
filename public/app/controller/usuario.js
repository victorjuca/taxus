var app = angular.module('usuarioModule', []);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('%%');
	$interpolateProvider.endSymbol('%%');
});



app.controller('loginController', ['$scope', '$http', function($scope, $http) {

	$scope.mostramodalrecuperacuenta = function() {
		$('#modalRecuperaCuenta').modal('show');
	}

}]);

app.controller('crearUsuarioController', ['$scope', '$http', function($scope, $http) {

	

}]);

