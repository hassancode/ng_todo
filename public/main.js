var module = angular.module('todoApp', []);

module.controller('mainController', function($scope, $http, todoService) {

	$scope.formData = {};
	$scope.todos = {};

	// $http.get('/api/todos').success(function(data) {
	// 	$scope.todos = data;
	// }).error(function(error) {
	// 	console.log(error);
	// });
	

	$scope.getTodo = function(){
		$http.get('/api/todos').success(function(data){
			$scope.todos = data;
		})
		.error(function(error){
			console.log(error);
		});
	}
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.todos = data;
				console.log(data);
			})
			.error(function(error) {
				console.log(error);
			});
	};
	$scope.deleteTodo = function(id) {
		
			todoService.deleteTodo(id)
				.success(function(data) {
					$scope.todos = data;
				})
				.error(function(error) {
					console.log(error);
				});
	};

	$scope.getTodo();

});

module.factory('todoService', function($http) {
	var factoryObj = {};

	factoryObj.deleteTodo = function(id) {
		return $http.delete('/api/todos/' + id);
	}

	return factoryObj;
})


// 
// module.factory('mySampleFactory', function() {
// 	var factoryObj = {};

// 	factoryObj.factoryData = [1,2,3,4,5,6];
// 	factoryObj.alertMessage = function() {
// 		alert('HEY!!!');
// 	}

// 	return factoryObj;
// });

// module.service('mySampleService', function() {
// 	this.serviceData = [6,7,8,9];
// });