app.controller('NewCardController', function($scope, $http, FlashCardsFactory) {
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
});