var app = angular.module('mensajeModule', []);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('%%');
	$interpolateProvider.endSymbol('%%');
});

app.controller('mensajeController', ['$scope', '$http', function($scope, $http) {


}]);

