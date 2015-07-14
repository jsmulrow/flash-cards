app.directive('creationForm', function(FlashCardsFactory, $http) {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/creationForm/creationForm.html',
		scope: {
			editing: '=',
			oldCard: '=card'
		},
		link: function(scope, elem, attrs) {
			scope.newCard = {
				question: null,
				category: null,
				answers: [
					{text: null, correct: false},
					{text: null, correct: false},
					{text: null, correct: false}
				]
			};

			// scope.isSubmitting = true;
			// scope.isEditing = false;

			scope.cancelEdit = function() {
				scope.editing = false;
			};

			scope.submitCard = function(card) {
				// submission script
				$http.post('/cards', card)
				.success(function(resCard) {
					console.log(resCard);
					scope.newCard = {
						question: null,
						category: null,
						answers: [
							{text: null, correct: false},
							{text: null, correct: false},
							{text: null, correct: false}
						]
					};
					console.log(FlashCardsFactory);
					if (FlashCardsFactory.activeCat === resCard.category || !FlashCardsFactory.activeCat) {
						console.log('pushed the card');
						FlashCardsFactory.flashCards.push(resCard);
					}
				});
			};
			scope.updateCard = function(card) {
				// update script
				$http.put('/cards/' + card._id, card)
					.success(function(card) {
						console.log('new card', card);
					});

				// leave the editing state
				scope.editing = false;
			};
		}
	};
});