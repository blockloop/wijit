doApp.controller('TodoCtrl',

	function($scope, storageService) {
		var brain = storageService.getBrain();
		var _ = require('underscore');
		var $ = require('jquery');
		$scope.data = brain;

		$scope.todos = [];
		$scope.archive = [];
		$scope.categories = [];
		$.extend($scope, brain); // load from memory

		if ($scope.categories[0] != 'All') { $scope.categories.splice(1,0,'All'); }
		$scope.selectedCategory = $scope.categories[0];
		$scope.title = $scope.selectedCategory;
		$scope.showNew = false;

		$scope.addTodo = function(todo,category) {
			$scope.todos.push({
				created: new Date().getTime(),
				text: todo.text, 
				category: category,
				done: false});

			todo.text = "";
			$scope.showNew = false;
		};

		$scope.remaining = function() {
			return _.filter($scope.todos, function(todo) { return !todo.done; }).length;
		};

		$scope.doArchive = function() {
			$scope.archive = _.filter($scope.todos, function(todo) { return todo.done; });
			$scope.todos = _.filter($scope.todos, function(todo) { return !todo.done; });
		};

		$scope.toggleNew = function() {
			$scope.showNew = !$scope.showNew;
		};

		$scope.setFilterCategory = function (category) {
			alert('Setting category filter to ' + category.toString());
			$scope.selectedCategory = category;
		};

		angular.forEach(['todos','archive','categories'], function (prop) { 
			$scope.$watch(prop, function(newValue) {
				brain[prop] = newValue;
				storageService.saveBrain(brain);
			}, true);
		});
	}
);

