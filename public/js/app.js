var app = angular.module('FlashCards', ['ui.router']);

app.config(function($stateProvider) {
	$stateProvider
		.state('CardView', {
			url: '/',
			templateUrl: 'views/view.view.html',
			controller: 'CardViewCtrl'
		})
		.state('Stats', {
			url: '/stats',
			templateUrl: 'views/stats.view.html',
			controller: 'StatsCtrl'
		})
		.state('CardForm', {
			url: '/form',
			templateUrl: 'views/form.view.html',
			controller: 'CardFormCtrl'
		})
		.state('manageCard', {
			url: '/manageCard/:cardId',
			templateUrl: 'views/manageCard.view.html',
			controller: 'ManageCtrl'
		})
		.state('manageCard.edit', {
			url: '/edit',
			templateUrl: 'views/edit.view.html',
			controller: 'EditCtrl'
		})
		.state('manageCard.delete', {
			url: '/delete',
			templateUrl: 'views/delete.view.html',
			controller: 'DeleteCtrl'
		});
});

// controller definitions
app
	.controller('StatsCtrl', function($scope, ScoreFactory) {
		console.log('ran stats ctrl');

		// $scope.statistics = '../statistics.html';
		$scope.scores = ScoreFactory;

	})
	.controller('CardFormCtrl', function($scope, $http, FlashCardsFactory) {
		console.log('ran form ctrl');

		$scope.newCard = {
			question: null,
			category: null,
			answers: [
				{text: null, correct: false},
				{text: null, correct: false},
				{text: null, correct: false}
			]
		};
		$scope.submitCard = function(card) {
			$http.post('/cards', card)
			.success(function(resCard) {
				console.log(resCard);
				$scope.newCard = {
					question: null,
					category: null,
					answers: [
						{text: null, correct: false},
						{text: null, correct: false},
						{text: null, correct: false}
					]
				};
				if (FlashCardsFactory.activeCat === resCard.category) {
					FlashCardsFactory.flashCards.push(resCard);
				}
			});
		};
	})

	.controller('CardViewCtrl', function($scope, FlashCardsFactory, ScoreFactory) {
		console.log('ran view ctrl');

		$scope.loading = true;

	    $scope.flashCardsContainer = FlashCardsFactory;

	    FlashCardsFactory.getFlashCards()
	    .then(function(data){
	        $scope.loading = false;
	        FlashCardsFactory.flashCards = data;
	    });
	    
	    $scope.categories = [
	        "MongoDB",
	        "Express",
	        "Angular",
	        "Node"
	    ];

	    $scope.getCategoryCards = function(category){
	    	FlashCardsFactory.activeCat = category;
	        $scope.loading = true;
	        FlashCardsFactory.getFlashCards(category).then(function(data){
	    		$scope.loading = false;
	            FlashCardsFactory.flashCards = data;
	    	});
	    };

	})

	.controller('ManageCtrl', function($scope, $stateParams, $state) {
		$scope.cardId = $stateParams.cardId;
		$scope.returnToView = function() {
			$state.go('CardView');
		};
	})

	.controller('DeleteCtrl', function($scope, FlashCardsFactory) {
		$scope.deleteCard = function(id) {
			console.log('the passed id', id);
			FlashCardsFactory.deleteFlashCard(id)
				.then(function() {
					$scope.returnToView();
				});
		};
	})

	.controller('EditCtrl', function($scope, FlashCardsFactory) {
		console.log('inside edit ctrl');
		$scope.oldCard = {};
		populateData = function(cardId) {
			FlashCardsFactory.getFlashCard(cardId)
				.success(function(data) {
					console.log(data);
					$scope.oldCard = data;
				});
		};

		$scope.updateCard = function(card) {
			console.log('the card', card);
			FlashCardsFactory.updateFlashCard(card);
			$scope.returnToView();
		};


		populateData($scope.cardId);
	});
